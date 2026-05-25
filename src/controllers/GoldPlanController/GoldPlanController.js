const GoldPlan = require('../../models/GoldPlan/GoldPlanModel');

// ── Helper ────────────────────────────────────────────────────────────────────
const calcMaturity = (planType, duration, startDate, monthlyContribution, investmentAmount) => {
  const start    = new Date(startDate);
  const maturity = new Date(start);
  maturity.setMonth(maturity.getMonth() + parseInt(duration));

  if (planType === 'JSAP') {
    const mc      = parseFloat(monthlyContribution) || 1000;
    const total   = mc * parseInt(duration);
    const benefit = mc * 0.5;
    return {
      maturityDate:    maturity,
      totalPaid:       0,        // starts at 0; incremented per payment
      maturityBenefit: benefit,
    };
  } else {
    const inv       = parseFloat(investmentAmount) || 100000;
    const discount  = parseInt(duration) === 12 ? 50 : 25;
    return {
      maturityDate:    maturity,
      totalPaid:       inv,
      discountOnVA:    discount,
    };
  }
};

// ── CREATE ────────────────────────────────────────────────────────────────────
exports.createGoldPlan = async (req, res) => {
  try {
    const {
      planType, customerFirstName, customerLastName, email, phone,
      monthlyContribution, investmentAmount, duration, startDate, status, notes,
    } = req.body;

    const maturity = calcMaturity(planType, duration, startDate, monthlyContribution, investmentAmount);

    const plan = await GoldPlan.create({
      planType, customerFirstName, customerLastName, email, phone,
      monthlyContribution: planType === 'JSAP' ? parseFloat(monthlyContribution) : undefined,
      investmentAmount:    planType === 'PIP'  ? parseFloat(investmentAmount)    : undefined,
      installmentsPaid:    planType === 'JSAP' ? 0 : undefined,
      duration:            parseInt(duration),
      startDate:           new Date(startDate),
      status:              status || 'Active',
      notes,
      ...maturity,
    });

    res.status(200).json({ success: true, plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── GET ALL ───────────────────────────────────────────────────────────────────
exports.getGoldPlans = async (req, res) => {
  try {
    const plans = await GoldPlan.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── GET SINGLE ────────────────────────────────────────────────────────────────
exports.getGoldPlanById = async (req, res) => {
  try {
    const plan = await GoldPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── UPDATE (edit fields / status change / record-payment / redeem) ────────────
exports.updateGoldPlan = async (req, res) => {
  try {
    const plan = await GoldPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const fields = [
      'planType','customerFirstName','customerLastName','email','phone',
      'monthlyContribution','investmentAmount','duration','startDate',
      'status','notes','installmentsPaid','totalPaid','maturityBenefit',
      'discountOnVA','maturityDate','redemptionDate','redemptionAmount',
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) plan[f] = req.body[f];
    });

    // If core plan config changed, recalculate maturity
    if (req.body.startDate || req.body.duration || req.body.monthlyContribution || req.body.investmentAmount) {
      const updated = calcMaturity(
        plan.planType,
        plan.duration,
        plan.startDate,
        plan.monthlyContribution,
        plan.investmentAmount,
      );
      plan.maturityDate    = updated.maturityDate;
      plan.maturityBenefit = updated.maturityBenefit ?? plan.maturityBenefit;
      plan.discountOnVA    = updated.discountOnVA    ?? plan.discountOnVA;
    }

    const saved = await plan.save();
    res.status(200).json({ success: true, plan: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
exports.deleteGoldPlan = async (req, res) => {
  try {
    const plan = await GoldPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    await GoldPlan.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: 'Gold plan deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

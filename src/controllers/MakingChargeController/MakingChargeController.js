const MakingCharge = require('../../models/MakingChargeModel/MakingChargeModel');

// ── GET all making charge rules ───────────────────────────────────────────────
exports.getMakingCharges = async (req, res) => {
  try {
    const charges = await MakingCharge.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, charges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET single rule by ID ──────────────────────────────────────────────────────
exports.getMakingChargeById = async (req, res) => {
  try {
    const charge = await MakingCharge.findById(req.params.id);
    if (!charge) return res.status(404).json({ success: false, message: 'Charge rule not found' });
    res.status(200).json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET rules by category name ────────────────────────────────────────────────
exports.getMakingChargeByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const charges = await MakingCharge.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
      isActive: true,
    });
    res.status(200).json({ success: true, charges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── CREATE a new making charge rule ───────────────────────────────────────────
exports.createMakingCharge = async (req, res) => {
  try {
    const {
      category, chargeType, chargeValue,
      stoneCharges, gstPercent, minCharge, maxCharge,
      isActive, notes,
    } = req.body;

    if (!category) return res.status(400).json({ success: false, message: 'Category is required' });
    if (!chargeType) return res.status(400).json({ success: false, message: 'Charge type is required' });
    if (chargeValue == null) return res.status(400).json({ success: false, message: 'Charge value is required' });

    const charge = new MakingCharge({
      category,
      chargeType,
      chargeValue:  Number(chargeValue)  || 0,
      stoneCharges: Number(stoneCharges) || 0,
      gstPercent:   Number(gstPercent)   || 3,
      minCharge:    Number(minCharge)    || 0,
      maxCharge:    Number(maxCharge)    || 0,
      isActive:     isActive !== undefined ? Boolean(isActive) : true,
      notes:        notes || '',
    });

    await charge.save();
    res.status(201).json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── UPDATE a making charge rule ────────────────────────────────────────────────
exports.updateMakingCharge = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Coerce numeric fields
    if (updates.chargeValue  != null) updates.chargeValue  = Number(updates.chargeValue)  || 0;
    if (updates.stoneCharges != null) updates.stoneCharges = Number(updates.stoneCharges) || 0;
    if (updates.gstPercent   != null) updates.gstPercent   = Number(updates.gstPercent)   || 0;
    if (updates.minCharge    != null) updates.minCharge    = Number(updates.minCharge)    || 0;
    if (updates.maxCharge    != null) updates.maxCharge    = Number(updates.maxCharge)    || 0;

    const charge = await MakingCharge.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!charge) return res.status(404).json({ success: false, message: 'Charge rule not found' });
    res.status(200).json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── DELETE a making charge rule ────────────────────────────────────────────────
exports.deleteMakingCharge = async (req, res) => {
  try {
    const charge = await MakingCharge.findByIdAndDelete(req.params.id);
    if (!charge) return res.status(404).json({ success: false, message: 'Charge rule not found' });
    res.status(200).json({ success: true, message: 'Making charge rule deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

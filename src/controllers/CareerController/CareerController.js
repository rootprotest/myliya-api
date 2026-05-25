const Career      = require('../../models/Career/CareerModel');
const Application = require('../../models/Career/ApplicationModel');

// ── Job Postings ──────────────────────────────────────────────────

exports.createJob = async (req, res) => {
  try {
    const { title, department, location, job_type, description, requirements, responsibilities, isActive, createdBy } = req.body;
    const job = await Career.create({
      title, department, location, job_type, description,
      requirements:     Array.isArray(requirements)     ? requirements     : (requirements     ? String(requirements).split('\n').filter(Boolean)     : []),
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').filter(Boolean) : []),
      isActive: isActive !== undefined ? isActive : true,
      createdBy,
    });
    res.status(200).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Career.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getActiveJobs = async (req, res) => {
  try {
    const jobs = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.updateJobById = async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const { title, department, location, job_type, description, requirements, responsibilities, isActive, createdBy } = req.body;

    if (title       !== undefined) job.title       = title;
    if (department  !== undefined) job.department  = department;
    if (location    !== undefined) job.location    = location;
    if (job_type    !== undefined) job.job_type    = job_type;
    if (description !== undefined) job.description = description;
    if (isActive    !== undefined) job.isActive    = isActive;
    if (createdBy   !== undefined) job.createdBy   = createdBy;

    if (requirements !== undefined) {
      job.requirements = Array.isArray(requirements) ? requirements : String(requirements).split('\n').filter(Boolean);
    }
    if (responsibilities !== undefined) {
      job.responsibilities = Array.isArray(responsibilities) ? responsibilities : String(responsibilities).split('\n').filter(Boolean);
    }

    const updated = await job.save();
    res.status(200).json({ success: true, job: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.deleteJobById = async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    await Career.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ── Applications ─────────────────────────────────────────────────

exports.createApplication = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, experience, branch, notes } = req.body;
    const resumeUrl = req.fileUrls?.['resumeFile']?.[0] ?? null;
    const app = await Application.create({ firstName, lastName, email, phone, position, experience, branch, notes, resumeUrl });
    res.status(200).json({ success: true, application: app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find().sort({ appliedDate: -1 });
    res.status(200).json({ success: true, applications: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    if (req.body.status !== undefined) app.status = req.body.status;
    if (req.body.notes  !== undefined) app.notes  = req.body.notes;
    const updated = await app.save();
    res.status(200).json({ success: true, application: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    await Application.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const express    = require('express');
const router     = express.Router();
const { uploadHandler } = require('../../Image/multerSetup');
const C = require('../../controllers/CareerController/CareerController');

// ── Job Postings ──────────────────────────────────────────────────
router.post('/jobs',              C.createJob);
router.get('/jobs',               C.getAllJobs);
router.get('/jobs/active',        C.getActiveJobs);
router.get('/jobs/:id',           C.getJobById);
router.put('/jobs/:id',           C.updateJobById);
router.delete('/jobs/:id',        C.deleteJobById);

// ── Applications ─────────────────────────────────────────────────
router.post('/applications',           uploadHandler, C.createApplication);
router.get('/applications',            C.getAllApplications);
router.put('/applications/:id',        C.updateApplicationStatus);
router.delete('/applications/:id',     C.deleteApplication);

module.exports = router;

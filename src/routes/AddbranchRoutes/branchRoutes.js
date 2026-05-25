const express = require('express');
const router = express.Router();
const { uploadHandler } = require('../../Image/multerSetup');
const BranchController = require('../../controllers/BranchController/branchController');


router.post('/createBranch', uploadHandler, BranchController.createBranch);
router.get('/getBranches', BranchController.getAllBranches);
router.get('/getBranchById/:id', BranchController.getBranchById);
router.put('/updateBranch/:id', uploadHandler, BranchController.updateBranchById);
router.delete('/deleteBranch/:id', BranchController.deleteBranchById);

module.exports = router;
const express = require('express');
const router = express.Router();
const BranchController = require('../../controllers/BranchController/branchController');


router.post('/createBranch', BranchController.createBranch);
router.get('/getBranches', BranchController.getAllBranches);
router.get('/getBranchById/:id', BranchController.getBranchById);
router.put('/updateBranch/:id', BranchController.updateBranchById);
router.delete('/deleteBranch/:id', BranchController.deleteBranchById);

module.exports = router;
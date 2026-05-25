const express = require('express');
const router  = express.Router();
const C       = require('../../controllers/MakingChargeController/MakingChargeController');

router.get('/getMakingCharges',             C.getMakingCharges);
router.get('/getMakingCharge/:id',          C.getMakingChargeById);
router.get('/getByCategory/:category',      C.getMakingChargeByCategory);
router.post('/createMakingCharge',          C.createMakingCharge);
router.put('/updateMakingCharge/:id',       C.updateMakingCharge);
router.delete('/deleteMakingCharge/:id',    C.deleteMakingCharge);

module.exports = router;

const express    = require('express');
const router     = express.Router();
const C          = require('../../controllers/GoldPlanController/GoldPlanController');

router.post('/createGoldPlan',       C.createGoldPlan);
router.get('/getGoldPlans',          C.getGoldPlans);
router.get('/getGoldPlan/:id',       C.getGoldPlanById);
router.put('/updateGoldPlan/:id',    C.updateGoldPlan);
router.delete('/deleteGoldPlan/:id', C.deleteGoldPlan);

module.exports = router;

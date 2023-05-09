const planTrip = require("../../controllers/plan-trip/plan-trip");
const { userAuth, checkRole } = require("../../middlewares");

const router = require("express").Router();

router.post('/plan-trip' , userAuth , checkRole(["User"]) , async(req,res)=>{
    await planTrip(req,res)
})

module.exports = router;
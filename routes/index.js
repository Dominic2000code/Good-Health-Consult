const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/authenticate");

const Patient = require("../models/Patient");

//Landing Page
router.get("/", (req, res) => {
    res.render("home");
});



//DashBoard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
	const patients = await  Patient.find()
	res.render("dashboard", {
		UserName: req.user.name,
		patients: patients
	});
});

router.get('/patients',ensureAuthenticated,async (req,res)=>{
	const patients = await  Patient.find().sort({ paymentDate: 'desc' })
    res.render('patients',{patients: patients})
});



module.exports = router;
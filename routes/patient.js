const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Patient model
const Patient = require("../models/Patient");

//Payment model
const Payment = require("../models/Payment");

router.get("/addPatient", (req, res) => {
	res.render("addPatient");
});
router.get("/payment", (req, res) => {
	res.render("payment");
});

mongoose
	.connect("mongodb://localhost/goodhealthDb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch((error) => {
		console.log(error);
	});

router.post("/addPatient", (req, res) => {
	const {
		patientID,
		FName,
		LName,
		phoneNumber,
		emergencyContact,
		residentialAddress,
		dob,
	} = req.body;

	if (
		!patientID ||
		!FName ||
		!LName ||
		!phoneNumber ||
		!emergencyContact ||
		!residentialAddress ||
		!dob
	) {
		
		res.send("input all fields");
	} else {
		Patient.findOne({ patientID: patientID }).then((result) => {
			if (result) {
				
				res.send("patient already exist");
			} else {
				const newPatient = new Patient({
					patientID,
					FName,
					LName,
					phoneNumber,
					emergencyContact,
					residentialAddress,
					dob,
				});

				newPatient
					.save()
					.then((result) => {
						
						res.redirect("/dashboard");
					})
					.catch((error) => console.log(error));
			}
		});
	}
});

router.post("/payment", (req, res) => {
	const {
		patientID,
		FName,
		paymentDate,
		amountPaid,
		ballanceAmount,
	} = req.body;

	if (
		!patientID ||
		!FName ||
		!paymentDate ||
		!amountPaid ||
		!ballanceAmount
	) {
		
		res.send("input all fields");
	} else {
		const newPayment = new Payment({
			patientID,
			FName,
			paymentDate,
			amountPaid,
			ballanceAmount
		});

		newPayment
			.save()
			.then((result) => {
				
				res.redirect("/dashboard");
			})
			.catch((error) => console.log(error));
	}
});



module.exports = router;

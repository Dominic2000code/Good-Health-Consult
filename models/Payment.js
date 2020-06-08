const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
	patientID: {
		type: String,
		required: true,
	},
	FName: {
		type: String,
		required: true,
	},
	paymentDate: {
		type: Date,
		default: Date.now,
	},
	amountPaid: {
		type: Number,
		required: true,
	},
	ballanceAmount: {
		type: Number,
		required: true,
	}
});

const Payment = mongoose.model("payment", PatientSchema);

module.exports = Payment;

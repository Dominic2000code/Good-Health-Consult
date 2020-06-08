const express = require("express");
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const assert = require("assert");

const url = "mongodb://localhost:27017/goodhealthDb";

/* GET home page. */
router.get("/webapi", function (req, res, next) {
	res.render("webApi");
});

router.get("/get-data", function (req, res, next) {
	const resultArray = [];
	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
        const cursor = db.collection("material").find();
		cursor.forEach(
			function (doc, err) {
				assert.equal(null, err);
				resultArray.push(doc);
			},
			function () {
				db.close();
				res.render("webApi", {resultArray });
			}
		);
	});
});


router.post("/add", function (req, res, next) {
	const item = {
		code: req.body.code,
		name: req.body.name,
		unitPrice: req.body.unitPrice,
		stockLevel: req.body.stockLevel,
	};

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
        db.collection("material").insertOne(item, function (err, result) {
			assert.equal(null, err);
			console.log("Item inserted");
			db.close();
		});
	});

	res.redirect("/material/webapi");
});

router.post("/update", function (req, res, next) {
	const item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
	};
	const id = req.body.id;

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
        db.collection("material").updateOne(
			{ _id: objectId(id) },
			{ $set: item },
			function (err, result) {
				assert.equal(null, err);
				console.log("Item updated");
				db.close();
			}
		);
	});
});

router.post("/delete", function (req, res, next) {
	const id = req.body.id;

	mongo.connect(url, function (err, db) {
		assert.equal(null, err);
        db.collection("material").deleteOne({ _id: objectId(id) }, function (
			err,
			result
		) {
			assert.equal(null, err);
			console.log("Item deleted");
			db.close();
		});
	});
});

module.exports = router;

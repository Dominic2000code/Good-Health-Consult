const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

//Passport config
require("./config/passport")(passport);

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//EJS middleware
app.set("view engine", "ejs"); 



app.use(express.static(__dirname + "/public"));


//Express session middleware
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});


//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/patients", require("./routes/patient"));
app.use("/material", require("./routes/api"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

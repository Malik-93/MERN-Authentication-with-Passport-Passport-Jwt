const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const usersRoutes = require('./API/routes/users')
const productRoutes = require('./API/routes/products')
const app = express();
const path = require('path')
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// DB Config
const db = require("./API/config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./API/config/passport")(passport);
// Routes
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes )
app.use('/uploads', express.static('uploads'))
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
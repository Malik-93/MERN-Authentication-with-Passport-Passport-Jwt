const express = require("express");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const usersRoutes = require('./API/routes/users');
const productRoutes = require('./API/routes/products');
const adminRoutes = require('./API/routes/admin');
const paymentRoutes = require('./API/routes/payments');
const anotherApiRoutes = require('./API/routes/another-api');
const messageBirdRoutes = require('./API/routes/messageBirdOtp')
const app = express();
// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Express Session
app.use(expressSession({
    secret: 'hashingString',
    saveUninitialized: true,
    resave: false,
    cookie : {
        secure: true
    }
}));

//Cookie parser
app.use( cookieParser() )

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        return res.status(200).json({})
    }
    next()
})
// DB Config
const db = require("./API/config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
// Passport config
require("./API/config/passport")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/payments', paymentRoutes)
app.use('/api/another', anotherApiRoutes)
app.use('/api/verification', messageBirdRoutes)

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`);
}) 
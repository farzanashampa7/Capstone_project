const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

// //MALCOLM IN THE MIDDLEWARES
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());


//PORT SETUP
require("dotenv").config();
const port = process.env.PORT || 8080;
const inputRoutes = require("./routes/inputRoutes");

app.use("/input", inputRoutes);

const initializePassport = require('./passport-config')

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const readUsers = () => {
    const users = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(users);
    return parsedData;
};

const users = readUsers();

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post("/signup", async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // const todayDate = new Date();
        // const year = todayDate.getFullYear();
        // const month = todayDate.getMonth() + 1;
        const newUser = {
            id: uuidv4(),
            userName: userName,
            email: email,
            password: hashedPassword,
            expenditure: {}
        };

        // check if same email exist
        let filteredUserData = users.filter(userData => userData.email == email);

        if (filteredUserData.length > 0) {
            res.send('duplicate_email')
        } else {
            users.push(newUser);
            fs.writeFileSync("./data/users.json", JSON.stringify(users));
            res.status(201).json(newUser);
            // console.log(users)
        }
        return;
    }
    catch {
        console.log('Catching error')
    }
});

// app.post('/login', passport.authenticate('local',
//     {
//         successRedirect: '/input/',
//         failureRedirect: '/login',
//         failureFlash: true
//     }));

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.status(200).json(JSON.stringify(req.user));
    });

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}

app.get('/input', checkAuthenticated, (req, res) => {
    if (req.user === undefined) return res.status(401).send('Unauthorized');
    res.status(200).json(req.user);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use((req, _res, next) => {
    console.log('Middleware from input router and user', req.user);
    next();
})

const readUsers = () => {
    const userData = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(userData);
    return parsedData;
};

router.get("/:userId/addexpense", (req, res) => {
    currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth() + 1
    const userId = req.params.userId;
    const userData = readUsers();
    const user = userData.find(user => user.id === userId);
    const userExpense = user.expenditure[currentYear][currentMonth].expense;
    res.status(200).json(userExpense);
});

router.get('/:userId/addincome', (req, res) => {
    currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth() + 1
    const userId = req.params.userId;
    // console.log(userId);
    const userData = readUsers();
    const user = userData.find(user => user.id === userId);
    const userIncome = user.expenditure[currentYear][currentMonth].income;
    res.status(200).json(userIncome);
});

router.post('/:userId/addincome', (req, res) => {
    const userId = req.params.userId;
    currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth() + 1
    const { income } = req.body;

    const newIncome = {
        income: income
    };
    const users = readUsers();
    const user = users.find(user => user.id === userId);
    if (!user.expenditure[currentYear]) {
        user.expenditure[currentYear] = {}
    }

    if (!user.expenditure[currentYear][currentMonth]) {
        user.expenditure[currentYear][currentMonth] = {}
    }

    if (!user.expenditure[currentYear][currentMonth].income) {
        user.expenditure[currentYear][currentMonth].income = []
    }

    user.expenditure[currentYear][currentMonth].income.push(newIncome)
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(201).json(users);
});

router.post('/:userId/addexpense', (req, res) => {
    const userId = req.params.userId;
    currentYear = new Date().getFullYear(),
        currentMonth = new Date().getMonth() + 1
    const { category, amount } = req.body;

    const newExpense = {
        category: category,
        amount: amount
    };

    const users = readUsers();
    const user = users.find(user => user.id === userId);
    if (!user.expenditure[currentYear]) {
        user.expenditure[currentYear] = {}
    }

    if (!user.expenditure[currentYear][currentMonth]) {
        user.expenditure[currentYear][currentMonth] = {}
    }

    if (!user.expenditure[currentYear][currentMonth].expense) {
        user.expenditure[currentYear][currentMonth].expense = []
    }
    user.expenditure[currentYear][currentMonth].expense.push(newExpense)
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.status(201).json(users);

});

module.exports = router;
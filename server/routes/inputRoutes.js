const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use((_req, _res, next) => {
    console.log('Middleware from video router');
    next();
})


const readInputs = () => {
    const inputData = fs.readFileSync("./data/inputs.json");
    const parsedData = JSON.parse(inputData);
    return parsedData;
};

router.get("/", (req, res) => {
    const inputs = readInputs();
    const newInputs = inputs.map(input => {
        return {
            amount: input.amount
        }
    });
    res.status(200).json(newInputs);
});

router.post("/add", (req, res) => {
    console.log(req);
    const { category, amount } = req.body;

    const newInput = {
        id: uuidv4(),
        category: category,
        amount: amount
    };

    console.log(newInput);
    const inputs = readInputs();
    inputs.push(newInput);
    fs.writeFileSync("./data/inputs.json", JSON.stringify(inputs));
    res.status(201).json(newInput);

});

module.exports = router;
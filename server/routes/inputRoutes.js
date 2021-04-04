const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use((_req, _res, next) => {
    console.log('Middleware from input router and user', _req.user);
    next();
})


const readInputs = () => {
    const inputData = fs.readFileSync("./data/inputs.json");
    const parsedData = JSON.parse(inputData);
    return parsedData;
};


const readData = () => {
    const data = fs.readFileSync("./data/datas.json");
    const parsedData = JSON.parse(data);
    return parsedData;
};

// const readData = () => {

//     const data = fs.readFileSync("./data/farzana.json");
//     const month = new Date().toLocaleString('en-us', { month: 'long' });
//     const parsedData = JSON.parse(data);
//     // return parsedData[0][month];
//     return parsedData;
// };

router.get("/addexpense", (req, res) => {
    // const month = new Date().toLocaleString('en-us', { month: 'long' });
    const inputs = readInputs();
    const newInputs = inputs.map(input => {
        return {
            amount: input.amount
        }
    });
    res.status(200).json(newInputs);
});

// router.get("/addexpense", (req, res) => {
//     const month = new Date().toLocaleString('en-us', { month: 'long' });
//     const inputs = readInputs()[0][month][expense];
//     const newInputs = inputs.map(input => {
//         return {
//             amount: input.amount
//         }
//     });
//     res.status(200).json(newInputs);
// });

// router.get("/addincome", (req, res) => {
//     const month = new Date().toLocaleString('en-us', { month: 'long' });
//     const income = readData()[0][month];
//     const newData = income.map(income => {
//         return {
//             income: income.income
//         }
//     });
//     res.status(200).json(newData);
// });

router.get('/addincome', (req, res) => {
    const income = readData();
    const newData = income.map(income => {
        return {
            income: income.income
        }
    });
    res.status(200).json(newData);
});

router.post('/addincome', (req, res) => {
    console.log(req);
    const { income } = req.body;

    const newIncome = {
        id: uuidv4(),
        income: income
    };

    console.log(newIncome);
    const data = readData();
    data.push(newIncome);
    fs.writeFileSync("./data/datas.json", JSON.stringify(data));
    res.status(201).json(data);

});

router.post('/addexpense', (req, res) => {
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




// router.post("/addincome", (req, res) => {
//     console.log(req);
//     const { income } = req.body;

//     const newIncome = {
//         // id: uuidv4(),
//         income: income
//     };

//     console.log(newIncome);
//     const data = readData();
//     console.log(data);
//     console.log(data[0].userName)
//     const month = new Date().toLocaleString('en-us', { month: 'long' });
//     if (data[0][month] === undefined) {
//         data[0][month] = []
//     }
//     data[0][month].push(newIncome);
//     console.log(data);
//     // fs.writeFileSync("./data/farzana.json", JSON.stringify(data[0][month]));
//     fs.writeFileSync("./data/farzana.json", JSON.stringify(data));
//     res.status(201).json(data);

// });

// router.post("/addexpense", (req, res) => {
//     console.log(req);
//     const { category, amount } = req.body;

//     const newInput = {
//         // id: uuidv4(),
//         // expense: [
//         //     { category: category },
//         //     { amount: amount }
//         // ],
//         category: category,
//         amount: amount
//     };

//     console.log(newInput);
//     const inputs = readInputs();
//     const month = new Date().toLocaleString('en-us', { month: 'long' });
//     console.log(inputs[0][month])
//     // if (inputs[0][month][expense] === undefined) {
//     //     inputs[0][month][expense] = []
//     // }
//     // inputs[0][month][expense].push(newInput);
//     inputs[0][month].push(newInput);
//     console.log(inputs[0][month])
//     console.log(inputs[0])
//     fs.writeFileSync("./data/farzana.json", JSON.stringify(inputs));
//     // res.status(201).json(newInput);
//     res.status(201).json(inputs);

// });

module.exports = router;
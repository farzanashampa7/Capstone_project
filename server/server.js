// const express = require("express");
// const app = express();
// const cors = require("cors");
// const port = 8080;

// //MALCOLM IN THE MIDDLEWARES
// app.use(cors());
// app.use(express.json());

// // //PORT SETUP
// // require("dotenv").config();
// // const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const app = express();
const cors = require("cors");
//MALCOLM IN THE MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static("files"));

//PORT SETUP
require("dotenv").config();
const port = process.env.PORT || 8080;

const inputRoutes = require("./routes/inputRoutes");


app.use("/input", inputRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
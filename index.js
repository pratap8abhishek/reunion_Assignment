const express = require('express');
require("dotenv").config();
require("./config/database");
const router = require("./routers/api");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
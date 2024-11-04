const express = require("express");
const cors = require("cors");
const registerRouter = require("./router/register.js");
const connectToDB = require("./utils/dbConnection.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(registerRouter);

connectToDB().then((resolve)=>{
    app.listen(PORT, ()=>{
        console.log("Listenting on port", PORT);
    })
})
.catch((error)=>{
    console.log("Cannot connect to db", error);
})



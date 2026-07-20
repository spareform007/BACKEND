const mongoose= require('mongoose');
require ('dotenv').config();

const express = require("express");
const cors = require("cors");

const app= express();
app.use(cors());
app.use(express.json());



mongoose
.connect(process.env.MONGO_URI)

.then(()=>{
    console.log("CONNECTED TO MONGO DB");
})

.catch((error)=>{
    console.error("ERROR CONNECTING TO MONGO DB",error)
}) 
    
app.use("/api/users",require("./Routers/userrouter"));




 /*   const mongoose = require('mongoose');
require('dotenv').config();

// Safety check for the connection string
if (!process.env.MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in your .env file!");
  process.exit(1); 
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED TO MONGO DB");
  })
  .catch((error) => {
    connsole.error("ERROR CONNECTING TO MONGO DB:", error.message);
  });*/
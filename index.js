const express = require("express");
const mongoose = require("mongoose");
const employee = require("./employee");

const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://vijay:vijay123@cluster0.eba6osr.mongodb.net/Tutorials")
.then(() => {
    console.log("Mongodb connect successfully")
}).catch((error) => {
    console.log("error" + error)
})

const port = 5000

app.get("/items", (req, res) => {
    res.status(200).json({
        message: "status 200 is running"
    })
})


app.post("/isEven", (req, res) => {
    const {value} = req.body;
    if(typeof value !== "number"){
        return res.status(400).json({
            message: "Value should be always a number"
        })
    }
    if(value % 2 == 0){
        return res.status(200).json({
            message: "Even"
        })
    }else{
        res.status(200).json({
            message: "Odd"
        })
    }

})

app.post("/employee", async(req, res) => {
    try{
        const {name, email, password, city} = req.body;
        const newEmployee = new employee({
            name,
            email,
            password,
            city
        })
        await newEmployee.save() 
        res.status(201).json({
            message: "data added successfully"
        })
    }catch(err){
        res.status(401).json({
            message: "data not found"
        })
    }

})

app.delete("/employees", async(req, res) => {
    try{
        const user = await employee.find()
        res.status(200).json(user)
    }catch{
        res.status(500).json({
            message: "server error"
        })
    }
})

app.get("/employees", async(req, res) => {
    try{
        const user = await employee.find()
        res.status(200).json(user)
    }catch{
        res.status(500).json({
            message: "server error"
        })
    }
})


app.listen(port, () => {
    console.log("server running in index.js")
})
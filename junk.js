let express = require('express');
let mongoose = require('mongoose');

const Users = new mongoose.model("User", userSchema)

const Q_A = new mongoose.Schema({question:String,answer:[String]});
const userSchema001 = new mongoose.Schema({
    theft_or_robbery_faqs:[Q_A],
});

const Criminal = new mongoose.model("criminal", userSchema001)
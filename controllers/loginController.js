const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const moment = require("moment")
const userModel = require("../models").users
const productModel = require("../models").Product
const eventModel = require("../models").events
const clientModel = require("../models").client


const login = asyncHandler (async (req, res) =>{
    res.render("login")
})


module.exports = {
    login
}
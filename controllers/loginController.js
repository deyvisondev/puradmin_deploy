const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const moment = require("moment")
const userModel = require("../models").users
const productModel = require("../models").Product
const eventModel = require("../models").events
const clientModel = require("../models").client
const tokenModel = require("../models").tokens


const login = asyncHandler (async (req, res) =>{
    res.render("login")
})


const underConstruction = asyncHandler (async (req, res) =>{
    res.render("under-construction")
})





const forgotPassowrd = asyncHandler (async (req, res) => {
    const  { email } = req.body
    const user = await userModel.findOne({email})

    if (!user) {
        res.status(404)
        throw new Error("Usuário informado não existe.")
    }

    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id
    console.log(resetToken)
    res.send("Forgot Password")

})


module.exports = {
    login,
    forgotPassowrd,
    underConstruction
}
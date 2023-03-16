const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const productModel = require("../models").Product
const moment = require("moment")





////////////  RENDERIZAR PÁGINA PARA CADASTRAR PRODUTOS ////////////
const netflix = asyncHandler (async(req, res) => {
    res.render("admin/netflix", {
        title: "Netflix - Frutadmin"
    })
})



////////////  BUSCAR TODOS OS PRODUTOS ////////////







module.exports = {
    netflix

}
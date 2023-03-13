const asyncHandler = require("express-async-handler")
const userModel = require("../models").users
const Sequelize = require("sequelize")
const op = Sequelize.Op
 
 
 
const administrador = asyncHandler (async(req, res)=>{
  if (req.session.userType !== '1') {
    return res.render('unauthorized', {
      title: "Frutadmin"
    });
  }
})

module.exports = {
  administrador
}
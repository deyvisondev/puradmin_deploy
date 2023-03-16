const asyncHandler = require("express-async-handler")
const userModel = require("../models").users
const Sequelize = require("sequelize")
const op = Sequelize.Op
 
 
 
const administrador = asyncHandler(async (req, res, next) => {
  if (![4, 5].includes(parseInt(req.session.userType))) {
    return res.render('unauthorized', {
      title: "Frutadmin"
    });
  }
  // Se a condição for satisfeita, chame a função next para continuar o fluxo do código
  next();
});


const pickingDashboardAutorization = asyncHandler(async (req, res, next) => {
  console.log(req.session.userType)
  if (![2, 4, 5].includes(parseInt(req.session.userType))) {
    return res.render('unauthorized', {
      title: "Frutadmin"
    });
  }
  // ...
  // Se a condição for satisfeita, chame a função next para continuar o fluxo do código
  next();
});



module.exports = {
  administrador,
  pickingDashboardAutorization
}
const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")
const dailyBillingModel = require("../models").daily_billing



const getPage = asyncHandler (async(req, res)=>{

    res.render("admin/teste-req", {
        title: "Teste de Data - Frutadmin"
    })
})







const getDailyBilling = asyncHandler(async (req, res) => {
    const date = req.query.date_billing;
    console.log(date)
    const getDataBilling = await dailyBillingModel.findAll({
      where: {
        date_billing: moment(date, 'DD/MM/YYYY').toDate()
      },
      order: [['date_billing', 'DESC']]
    });
    console.log(getDataBilling)
    res.render('admin/teste-res', { valores: getDataBilling });
  });


module.exports = {
    getPage,
    getDailyBilling
}
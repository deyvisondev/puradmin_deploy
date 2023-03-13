const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")
const dailyBillingModel = require("../models").daily_billing
const eventModel = require("../models").events
const clientModel = require("../models").client
const productModel = require("../models").Product
const eventIssueModel = require("../models").event_issue
const sectionModel = require("../models").sections
const userModel = require("../models").users







const teste = asyncHandler(async (req, res) => {
  const date = req.query.date_billing;
  console.log(date)
  const events = await eventModel.count({
    where: {
      date: moment(date, 'DD/MM/YYYY').toDate()
    }
  });
  console.log(events)



  const getDataBilling = await dailyBillingModel.findAll({
    where: {
      date_billing: moment(date, 'DD/MM/YYYY').toDate()
    },
    order: [['date_billing', 'DESC']]
  });
  console.log(getDataBilling)


  const percentDailyLost = getDataBilling.map((billing) => {
    const percentLost = (billing.daily_lost / billing.effective_billing) * 100;
    const percentCreditNote = (billing.credit_note / billing.effective_billing) * 100;
    return {
      ...billing,
      percent_daily_lost: percentLost,
      percent_credit_note: percentCreditNote
    };
  });

  const percentLost = percentDailyLost[0].percent_daily_lost;
  const percentCreditNote = percentDailyLost[0].percent_credit_note;


  const getEvents = await eventModel.findAll({
    where: {
      date: moment(date, 'DD/MM/YYYY').toDate()
    },
    include: [{
        model: productModel,
        attributes: ["name"]
    }, {
        model: clientModel,
        attributes: ["name"]
    }, {
        model: userModel,
        attributes: ["name"]
    }, {
        model: eventIssueModel,
        attributes: ["name"]
    }, {
        model: sectionModel,
        attributes: ["name"]
    }]
}).then(count => {
  console.log(count);
});


  console.log(percentDailyLost);



  res.render('admin/dashboard-billing-date', {
    valores: getDataBilling,
    ocorrencias: events,
    title: "Frutadmin",
    daily_lost: getDataBilling[0].daily_lost,
    expected_billing: getDataBilling[0].expected_billing,
    effective_billing: getDataBilling[0].effective_billing,
    credit_note: getDataBilling[0].credit_note,
    percent_daily_lost: percentLost,
    percent_credit_note: percentCreditNote,
    date: date,
    ocorrencias: getEvents
  });
});


module.exports = {
  teste
}
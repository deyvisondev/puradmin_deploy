const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")
const dailyBillingModel = require("../models").daily_billing
const { sequelize } = require("../models")



////////////// CARDS //////////////
const dashboard = asyncHandler(async (req, res) => {


        const date = moment().subtract(7, 'days').format("YYYY-MM-DD")

        const getDataBilling = await sequelize.query(
            `SELECT * FROM daily_billings ORDER BY date_billing DESC;`,
            { type: QueryTypes.SELECT });




            const percentDailyLost = getDataBilling.map((billing) => {
                const percentLost = (billing.daily_lost / billing.effective_billing) * 100;
                const percentCreditNote = (billing.credit_note / billing.effective_billing) * 100;
                return {
                  ...billing,
                  percent_daily_lost: percentLost,
                  percent_credit_note: percentCreditNote
                };
              });
              
              console.log(percentDailyLost);
 


    res.render("admin/daily-billing-dashboard", {
        
        moment: moment,
        title: "Dashboard da Faturação - Frutadmin",
        testando: date,
        billing_data: percentDailyLost
    })
})






////////////// REGISTAR //////////////

/* const registerAdmin = asyncHandler (async (req, res) => {
    const pasword = bcrypt.hashSync("123456", 10)
    console.log(pasword)
    adminModel.create({
        name: "Deyvison Queiroz",
        email: "deyvisonlqueiroz@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    }).then((data) => {
        if(data) {
            res.json({
                status: 1,
                message: "Administrador criado com sucesso."
            })
        } else {
            res.json({
                status: 0,
                message: "Falha ao criar Administrador."
            })
        }
    })

})

*/

////////////// EFETUAR LOGIN //////////////
const makeLogin = asyncHandler(async (req, res) => {
    userModel.findOne({
        where: {
            email: {
                [op.eq]: req.body.email
            }
        }
    }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (error, result) {
                if (result) {
                    req.session.isLoggedIn = true
                    req.session.userId = user.id
                    console.log(req.session)
                    res.redirect("/admin")
                } else {
                    req.flash("error", "Dados de login inválidos. Por favor tente novamente.")
                    res.redirect("/login")
                }
            })
        } else {
            req.flash("error", "Usuário não encontrado.")
            res.redirect("/login")
        }
    })
})



////////////// EFETUAR LOGOUT //////////////
const userLogout = asyncHandler(async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.redirect("/admin")
        }
        res.redirect("/login")
    })
})

const getDate = asyncHandler (async(req, res) => {
    res.render("admin/date-daily-dashboard", {
        title: "Data - Faturação Diária - Frutadmin"
    })
})

const getDailyBilling = asyncHandler (async(req, res) =>{
    const dailydata = dailyBillingModel.findOne({
        where:{
            date_billing:{
                [op.eq]: req.body.date_billing
            }
        } 
    }).then((data) => {
        console.log(dailydata)
        res.render("admin/edit-product", {
            product: data,
            title: "Editar Produto - Frutadmin"
        })
    })
})


module.exports = {
    dashboard,
    makeLogin,
    userLogout,
    getDate,
    getDailyBilling
}
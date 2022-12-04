const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const moment = require("moment")
const userModel = require("../models").users
const productModel = require("../models").Product
const eventModel = require("../models").events
const clientModel = require("../models").client
const adminModel = require("../models").Admin
const bcrypt = require("bcrypt")
const e = require("express")
const { sequelize } = require("../models")





////////////////////////////////// TESTE DE GRÁFICO ///////////////////////////////






















////////////// CARDS //////////////
const dashboard = asyncHandler(async (req, res) => {
    var totalClient = await clientModel.count({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var totalUsers = await userModel.count({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var totalProduct = await productModel.count({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var totalEvent = await eventModel.count()

    const today = new Date()
    const todayDate = moment(today).format("DD/MM/YY")
    var todayEvents = await eventModel.count({
        where: {
            date: {
                [op.eq]: today
            }
        }
    })
    console.log(todayEvents)

    // SELECT date, COUNT(*) AS quant FROM events GROUP BY date ORDER BY date
    const eventsPerDay = await eventModel.findAll({
        attributes: ['date', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
        group: ['date'],
        order: ['date'],
    })
    

    const uniqueObjects = [...new Set(eventsPerDay.map(item => item.dataValues))]
    


    // SELECT date, COUNT(*) AS quant FROM events GROUP BY date ORDER BY date




    res.render("admin/dashboard", {
        clients: totalClient,
        users: totalUsers,
        products: totalProduct,
        events: totalEvent,
        todayevents: todayEvents,
        eventsPerDay: uniqueObjects,
        moment: moment
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



module.exports = {
    dashboard,
    makeLogin,
    userLogout,
}
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
const sectionModel = require("../models").sections
const bcrypt = require("bcrypt")
const e = require("express")
const { sequelize } = require("../models")




////////////// CARDS //////////////
const dashboard = asyncHandler(async (req, res) => {


        const testando = moment().subtract(7, 'days').format("YYYY-MM-DD")



        // const picagemBrigth = await sequelize.query(
        //     `SELECT date, qt_picagem AS "bright" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '30' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemDaniel = await sequelize.query(
        //     `SELECT date, qt_picagem AS "daniel" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '34' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemDeyvison = await sequelize.query(
        //     `SELECT date, qt_picagem AS "deyvison" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '25' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemEstevao = await sequelize.query(
        //     `SELECT date, qt_picagem AS "estevao" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '20' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemEvandro = await sequelize.query(
        //     `SELECT date, qt_picagem AS "evandro" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '31' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemFabio = await sequelize.query(
        //     `SELECT date, qt_picagem AS "fabio" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '33' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemNelson = await sequelize.query(
        //     `SELECT date, qt_picagem AS "nelson" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '35' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemRafael = await sequelize.query(
        //     `SELECT date, qt_picagem AS "rafael" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '29' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemRicardo = await sequelize.query(
        //     `SELECT date, qt_picagem AS "ricardo" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '28' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        // const picagemWallas = await sequelize.query(
        //     `SELECT date, qt_picagem AS "wallas" FROM "picagens" AS "picagem" WHERE "picagem"."user_id" = '32' GROUP BY "picagem"."date", "picagem"."qt_picagem"`,
        //     { type: QueryTypes.SELECT });
        
        

        // const mapPicagens = new Map();
        // picagemBrigth.forEach(item => mapPicagens.set(item.date, item));
        // picagemDaniel.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemDeyvison.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemEstevao.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemEvandro.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemFabio.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemNelson.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemRafael.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemRicardo.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));
        // picagemWallas.forEach(item => mapPicagens.set(item.date, {...mapPicagens.get(item.date), ...item}));

        // const mergedArrPicagens = Array.from(mapPicagens.values());
        
        // console.log(JSON.stringify(mergedArrPicagens));


        const picagensTotal = await sequelize.query(
            `SELECT 
                date,
                SUM(CASE WHEN user_id = 30 THEN qt_picagem ELSE 0 END) AS "bright",
                SUM(CASE WHEN user_id = 34 THEN qt_picagem ELSE 0 END) AS "daniel",
                SUM(CASE WHEN user_id = 25 THEN qt_picagem ELSE 0 END) AS "deyvison",
                SUM(CASE WHEN user_id = 20 THEN qt_picagem ELSE 0 END) AS "estevao",
                SUM(CASE WHEN user_id = 31 THEN qt_picagem ELSE 0 END) AS "evandro",
                SUM(CASE WHEN user_id = 33 THEN qt_picagem ELSE 0 END) AS "fabio",
                SUM(CASE WHEN user_id = 35 THEN qt_picagem ELSE 0 END) AS "nelson",
                SUM(CASE WHEN user_id = 29 THEN qt_picagem ELSE 0 END) AS "rafael",
                SUM(CASE WHEN user_id = 28 THEN qt_picagem ELSE 0 END) AS "ricardo",
                SUM(CASE WHEN user_id = 32 THEN qt_picagem ELSE 0 END) AS "wallas"
            FROM picagens
            WHERE user_id IN (30, 34, 25, 20, 31, 33, 35, 29, 28, 32)
            GROUP BY date
            ORDER BY date DESC`, // adicionando cláusula ORDER BY
            { type: QueryTypes.SELECT });
        
        console.log(picagensTotal);
            


    


    res.render("admin/dashboard-picking", {
        
        moment: moment,
        title: "Picking Dashboard - Frutadmin",
        testando: testando,
        picagens: picagensTotal
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
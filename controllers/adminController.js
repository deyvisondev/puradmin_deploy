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

    var getSection = await sectionModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    const today = new Date()
    const todayDate = moment(today).format("DD/MM/YY")
    var todayEvents = await eventModel.count({
        where: {
            date: {
                [op.eq]: today
            }
        }
    })

    // SELECT date, COUNT(*) AS quant FROM events GROUP BY date ORDER BY date
    const eventsPerDay = await eventModel.findAll({
        attributes: ['date', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
        group: ['date'],
        order: ['date'],
    })


    const teste = await sequelize.query(
        `SELECT date, user_id, COUNT(*) AS "ocorrencia", "user"."name" AS nome FROM "events" AS "events" LEFT OUTER JOIN "users" AS "user" ON "events"."user_id" = "user"."id" GROUP BY "date", "user"."name", "user_id" ORDER BY date ASC`,
        { type: QueryTypes.SELECT });

    const eventsPerSection = await sequelize.query(
        `SELECT date, section_id, COUNT(*) AS "ocorrencias", "sections"."name" AS departamento FROM "events" AS "events" 
    LEFT OUTER JOIN "sections" AS "sections" ON "events"."section_id" = "sections"."id" 
    GROUP BY "date", "sections"."name", "section_id" ORDER BY date ASC`,
        { type: QueryTypes.SELECT });



    // const arr = eventsPerSection
    //  const transformArray = (arr = []) => {
    //     const res = [];
    //     const map = {};
    //     let i, j, curr;
    //     for (i = 0, j = arr.length; i < j; i++) {
    //        curr = arr[i];
    //        if (!(curr.departamento in map)) {
    //           map[curr.departamento] = {departamento: curr.departamento, dates: []};
    //           res.push(map[curr.departamento]);
    //        };
    //        map[curr.departamento].dates.push(curr.date);
    //     };
    //     return res;
    //  };
    //  console.log(transformArray(arr));

    // const eventsPerUser = await eventModel.findAll({
    //     group: ['date', 'user.name', 'user_id'],
    //     attributes: ['date', 'user_id', [Sequelize.fn('COUNT', '*'), 'count']],
    //     order: [[Sequelize.literal('date'), 'ASC']],
    //     raw: true,
    //     include: [{
    //         model: userModel,
    //         attributes: ["name"]
    //     }]
    // })



    // const groupByKey = (list, key, { omitKey = false }) => list.reduce((hash, { [key]: value, ...rest }) => ({ ...hash, [value]: (hash[value] || []).concat(omitKey ? { ...rest } : { [key]: value, ...rest }) }), {})

    // const grupado = groupByKey(teste, 'date', { omitKey: true })




    const uniqueObjects = [...new Set(eventsPerDay.map(item => item.dataValues))]

    const testando = moment().subtract(7, 'days').format("YYYY-MM-DD")



    // SELECT date, COUNT(*) AS quant FROM events GROUP BY date ORDER BY date

    // const eventsFromPicking = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciaspicking" FROM "events" AS "event" WHERE "event"."section_id" = '1' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });

    // const eventsFromCompras = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrencias" FROM "events" AS "event" WHERE "event"."section_id" = '2' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });

    // const eventsFromAtendimento = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasatendimento" FROM "events" AS "event" WHERE "event"."section_id" = '4' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });

    // const eventsFromDistribuicao = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasdistribuicao" FROM "events" AS "event" WHERE "event"."section_id" = '5' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });

    // const map = new Map();
    // eventsFromPicking.forEach(item => map.set(item.date, item));
    // eventsFromDistribuicao.forEach(item => map.set(item.date, { ...map.get(item.date), ...item }));
    // eventsFromAtendimento.forEach(item => map.set(item.date, { ...map.get(item.date), ...item }));
    // const mergedArr = Array.from(map.values());

    // console.log(JSON.stringify(mergedArr));

    const ocorrenciasBySection = await sequelize.query(
        `SELECT date,
            COUNT(CASE WHEN section_id = '1' THEN 1 END) AS "ocorrenciaspicking",
            COUNT(CASE WHEN section_id = '2' THEN 1 END) AS "ocorrencias",
            COUNT(CASE WHEN section_id = '4' THEN 1 END) AS "ocorrenciasatendimento",
            COUNT(CASE WHEN section_id = '5' THEN 1 END) AS "ocorrenciasdistribuicao"
          FROM "events"
          GROUP BY "events"."date";`,
        { type: QueryTypes.SELECT });


    // const eventsFromDeyvison = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasdeyvison" FROM "events" AS "event" WHERE "event"."user_id" = '25' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromWallas = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciaswallas" FROM "events" AS "event" WHERE "event"."user_id" = '32' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromEstevao = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasestevao" FROM "events" AS "event" WHERE "event"."user_id" = '20' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromRicardo = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasricardo" FROM "events" AS "event" WHERE "event"."user_id" = '28' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromRafael = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasrafael" FROM "events" AS "event" WHERE "event"."user_id" = '29' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromEvandro = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasevandro" FROM "events" AS "event" WHERE "event"."user_id" = '31' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromBright = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasbrigth" FROM "events" AS "event" WHERE "event"."user_id" = '30' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromNelson = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasnelson" FROM "events" AS "event" WHERE "event"."user_id" = '35' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromDaniel = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasdaniel" FROM "events" AS "event" WHERE "event"."user_id" = '34' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });
    // const eventsFromFabio = await sequelize.query(
    //     `SELECT date, COUNT(*) AS "ocorrenciasfabio" FROM "events" AS "event" WHERE "event"."user_id" = '33' GROUP BY "event"."date"`,
    //     { type: QueryTypes.SELECT });

    // const mapPickers = new Map();
    // eventsFromDeyvison.forEach(item => mapPickers.set(item.date, item));
    // eventsFromWallas.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromEstevao.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromRicardo.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromRafael.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromEvandro.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromBright.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromNelson.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromDaniel.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // eventsFromFabio.forEach(item => mapPickers.set(item.date, {...mapPickers.get(item.date), ...item}));
    // const mergedArrPickers = Array.from(mapPickers.values());

    // console.log(JSON.stringify(mergedArrPickers));



    const ocorrenciasTotal = await sequelize.query(
        `SELECT date, 
                COUNT(CASE WHEN user_id = '25' THEN 1 END) AS "ocorrenciasdeyvison",
                COUNT(CASE WHEN user_id = '32' THEN 1 END) AS "ocorrenciaswallas",
                COUNT(CASE WHEN user_id = '20' THEN 1 END) AS "ocorrenciasestevao",
                COUNT(CASE WHEN user_id = '28' THEN 1 END) AS "ocorrenciasricardo",
                COUNT(CASE WHEN user_id = '29' THEN 1 END) AS "ocorrenciasrafael",
                COUNT(CASE WHEN user_id = '31' THEN 1 END) AS "ocorrenciasevandro",
                COUNT(CASE WHEN user_id = '30' THEN 1 END) AS "ocorrenciasbrigth",
                COUNT(CASE WHEN user_id = '35' THEN 1 END) AS "ocorrenciasnelson",
                COUNT(CASE WHEN user_id = '34' THEN 1 END) AS "ocorrenciasdaniel",
                COUNT(CASE WHEN user_id = '33' THEN 1 END) AS "ocorrenciasfabio"
            FROM "events"
            GROUP BY "date"`,
        { type: QueryTypes.SELECT });


    res.render("admin/dashboard", {
        clients: totalClient,
        users: totalUsers,
        products: totalProduct,
        events: totalEvent,
        todayevents: todayEvents,
        eventsPerDay: uniqueObjects,
        eventsPerUser: teste,
        moment: moment,
        title: "Dashboard - Frutadmin",
        nome: req.params.user_id,
        testando: testando,
        eventsPerSection: eventsPerSection,
        section: getSection,
        // eventsFromPicking: eventsFromPicking,
        // eventsFromCompras: eventsFromCompras,
        // eventsFromAtendimento: eventsFromAtendimento,
        // eventsFromDistribuicao: eventsFromDistribuicao,
        allEvents: ocorrenciasBySection,
        allEventsPickers: ocorrenciasTotal
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
                    req.session.userId = user.id,
                        req.session.userType = user.type_user,
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
    userLogout
}
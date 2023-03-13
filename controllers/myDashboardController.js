const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const userModel = require("../models").users
const picagemModel = require("../models").Picagens
const eventModel = require("../models").events
const moment = require("moment")
const bcrypt = require("bcrypt")
const clientModel = require("../models").client
const productModel = require("../models").Product
const eventIssueModel = require("../models").event_issue
const sectionModel = require("../models").sections
const { sequelize } = require("../models")






////////////  RENDERIZAR PÁGINA PARA CADASTRAR PICAGENS ////////////
const myLastPickings = asyncHandler(async (req, res) => {
  const testando = moment().subtract(7, 'days').format("YYYY-MM-DD")
  const userId = req.session.userId;

  const getUserEvents = await eventModel.findAll({
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
    }],
    where: { user_id: req.session.userId },
    order: [['date', 'DESC']],
    limit: 30
  }) // Obter o ID do usuário logado a partir do req.session

  const results = await sequelize.query(`
    SELECT
      "date",
      "user_id",
      SUM("qt_picagem") AS "total_picagens",
      (
        SELECT SUM(qt_picagem)
        FROM picagens AS subquery
        WHERE subquery.date = picagens.date
      ) AS "total_picagens_data"
    FROM
      picagens
    WHERE "user_id" = :userId
    GROUP BY
      "date", "user_id"
    ORDER BY
      "date" DESC, "user_id"
  `, {
    type: QueryTypes.SELECT,
    replacements: { userId },
  });

  const performances = results.map(result => {
    const totalPicagens = parseInt(result.total_picagens);
    const totalPicagensData = parseInt(result.total_picagens_data);
    const performance = totalPicagensData === 0 ? 0 : ((totalPicagens / totalPicagensData) * 100).toFixed(2);

    return {
      ...result,
      performance,
    };
  });

  const allPicagens = await picagemModel.sum('qt_picagem', {
    where: {
      user_id: userId
    }
  });


  const allEvents = await eventModel.count({
    where: {
      user_id: userId
    }
  })

  const mediaPicagens = allPicagens / allEvents
  const mediaArredondada = Math.round(mediaPicagens)

  console.log(mediaArredondada)

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const MounthEvents = await sequelize.query(`
  SELECT COUNT(*) FROM events
  WHERE user_id = :userId
  AND extract(year from date) = :currentYear
  AND extract(month from date) = :currentMonth;
`, {
    type: QueryTypes.SELECT,
    replacements: { userId, currentYear, currentMonth }
  });

  console.log(MounthEvents)

  const count = parseInt(MounthEvents[0].count);
  console.log(count);


  const MounthPickings = await sequelize.query(`
  SELECT SUM(qt_picagem) AS total_picagem
  FROM picagens
  WHERE user_id = :userId
  AND extract(year from date) = :currentYear
  AND extract(month from date) = :currentMonth;
`, {
    type: QueryTypes.SELECT,
    replacements: { userId, currentYear, currentMonth }
  });

  console.log(MounthPickings)

  const totalPicagem = parseInt(MounthPickings[0].total_picagem);
  console.log(totalPicagem);




  res.render("admin/my-dashboard", {
    picagens: performances,
    ocorrencias: getUserEvents,
    title: "Registar Picagens - Frutadmin",
    title: "Picagens - Frutadmin",
    moment: moment,
    testando: testando,
    ocmensal: count,
    media: mediaArredondada,
    pickmensal: totalPicagem
  })
})







module.exports = {
  myLastPickings
}
const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const userModel = require("../models").users
const picagemModel = require("../models").Picagens
const eventModel = require("../models").events
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")
const { sequelize } = require("../models")
const clientModel = require("../models").client
const productModel = require("../models").Product
const eventIssueModel = require("../models").event_issue
const sectionModel = require("../models").sections





////////////  RENDERIZAR PÁGINA PARA CADASTRAR PICAGENS ////////////
const addPicagem = asyncHandler(async (req, res) => {

    const getPicagens = await picagemModel.findAll({
        include: [{
          model: userModel,
          attributes: ["name"]
        }],
        order: [["date", "DESC"]]
      });

    var getPickers = await sequelize.query(
        `SELECT "id", "name", "email", "mobile", "section_id", "image", "date_hired", "status", "password", "created_at" AS "createdAt", "updated_at" AS "updatedAt", "section_id" AS "sectionId" FROM "users" AS "users" WHERE "users"."section_id" = '1' ORDER BY "name"`,
        { type: QueryTypes.SELECT });

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;


    res.render("admin/add-picagem", {
        pickers: getPickers,
        picagens: getPicagens,
        title: "Registar Picagens - Frutadmin",
        today: today,
        title: "Picagens - Frutadmin",
        moment: moment
    })
})







//////////////////////////////////////// CADASTRAR PICAGEM //////////////////////////////////////////////////////////////
const createPicagem = asyncHandler(async (req, res) => {

    var dateString = req.body.picagem_date; // Pegar a data em formato string
    console.log(dateString)
    var dateMomentObject = moment(dateString, "YYYY/MM/DD").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    var dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)


    picagemModel.create({
        date: dateEvent,
        user_id: req.body.picker_id,
        qt_picagem: req.body.number,
        observacoes: req.body.observacoes
    }).then((picagem) => {

        if (picagem) {
            req.flash("success", "Picagem cadastrada com sucesso.");
            res.redirect("/admin/add-picagem")
        } else {
            req.flash("error", "Erro ao cadastrar uma picagem, por favor entre em contato com o administrador do sistema.");
            res.redirect("/admin/add-picagem")
        }
    })
});



////////////  LOCALIZAR UMA PICAGEM PARA EDITAR ////////////

const getPicagem = asyncHandler (async(req, res) =>{
    const users = await userModel.findAll({
        where: {
            section_id: {
                [op.eq]: '1'
            }
        }
    })
    const edit = picagemModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.picagemId
            }
        }
    }).then((data) => {
        console.log(data)
        moment.locale('pt-br')
        res.render("admin/edit-picagem", {
            users: users,
            picagem: data,
            title: "Editar Picagem - Frutadmin",
            moment: moment
        })
    })
})



//////////////////////////////////////////////////////// EDITAR A PICAGEM //////////////////////////////////////////////////////
const editPicagem = asyncHandler (async (req, res) => {

    var dateString = req.body.picagem_date; // Pegar a data em formato string
    console.log(dateString)
    var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    var dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)

    const edit = picagemModel.update({
                date: dateEvent,
                user_id: req.body.picker_id,
                qt_picagem: req.body.number,
                observacoes: req.body.observacoes
            }, {
                where:{
                    id: req.params.picagemId
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Picagem atualizada com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar a picagem. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/edit-picagem/" + req.params.picagemId)
            })
        })


////////////  EXCLUIR UMA PICAGEM ////////////
const deletePicagem = asyncHandler (async (req, res) => {
    picagemModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.picagem_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            picagemModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.picagem_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Picagem excluída com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir a picagem selecionada. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/add-picagem")
            })
        }else{
    
        }
    })
})



//get - picker

const getPicker = asyncHandler (async(req, res) => {
    const users = await userModel.findAll({
        where: {
          section_id: {
            [op.eq]: '1'
          }
        },
        order: [
          ['name', 'ASC']
        ]
      })
            res.render("admin/get-picker", {
            users: users,
            title: "Selecionar Picker - Frutadmin",
            moment: moment
    })
})










//Dashboard por Picker
const PickerPerformance = asyncHandler(async (req, res) => {
    const testando = moment().subtract(7, 'days').format("YYYY-MM-DD")
    const userId = req.query.user
    
      

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
      where: { user_id: userId },
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
  

  
    const count = parseInt(MounthEvents[0].count);
 
  
  
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
   
    const totalPicagem = parseInt(MounthPickings[0].total_picagem);

    const mediaPicagensMensal = totalPicagem / count
    const mediaArredondadaMensal = Math.round(mediaPicagensMensal)
  






 

    const eventYear = await sequelize.query(`
    SELECT COUNT(*) FROM events
    WHERE user_id = :userId
    AND extract(year from date) = :currentYear;
   `, {
      type: QueryTypes.SELECT,
      replacements: { userId, currentYear }
    });
    const countEventYear = parseInt(eventYear[0].count);
   


    const pickingYear = await sequelize.query(`
    SELECT SUM(qt_picagem) AS year_picagem
    FROM picagens
    WHERE user_id = :userId
    AND extract(year from date) = :currentYear;    
  `, {
      type: QueryTypes.SELECT,
      replacements: { userId, currentYear }
    });
  
 
  
    const yearPicagem = parseInt(pickingYear[0].year_picagem);
 

    const name = await userModel.findOne({
      where: {
        id: {
          [op.eq]: userId
        }
      }
    });
    
    console.log(name.dataValues.name);
  
  
  
    res.render("admin/picker-dashboard", {
      picagens: performances,
      ocorrencias: getUserEvents,
      title: "Registar Picagens - Frutadmin",
      title: "Picagens - Frutadmin",
      moment: moment,
      testando: testando,
      ocmensal: count,
      media: mediaArredondada,
      pickmensal: totalPicagem,
      ocanual: countEventYear,
      pickinganual: yearPicagem,
      mediamensal: mediaArredondadaMensal,
      name: name
    })
  })


module.exports = {
    addPicagem,
    createPicagem,
    getPicagem,
    editPicagem,
    deletePicagem,
    getPicker,
    PickerPerformance
}
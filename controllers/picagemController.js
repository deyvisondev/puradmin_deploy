const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const userModel = require("../models").users
const picagemModel = require("../models").Picagens
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")
const { sequelize } = require("../models")





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



module.exports = {
    addPicagem,
    createPicagem,
    getPicagem,
    editPicagem,
    deletePicagem
}
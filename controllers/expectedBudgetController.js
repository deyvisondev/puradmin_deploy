const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const expectedBudgetModel = require("../models").budget_expected
const moment = require("moment")
const bcrypt = require("bcrypt")
const e = require("express")





////////////  RENDERIZAR PÁGINA PARA CADASTRAR ORÇAMENTO PREVISTO ////////////
const addExpectedBudget = asyncHandler (async(req, res) => {

    const allExpectedBudgets = await expectedBudgetModel.findAll({});

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    res.render("admin/add-expected-budget", {
        expecteds: allExpectedBudgets,
        today: today,
        title: "Registar Previsão de Orçamento - Frutadmin",
        moment: moment
    })
    
})

const createExpectedBudget = asyncHandler (async (req, res) => {
    
    const dateString = req.body.expected_date; // Pegar a data em formato string
    console.log(dateString)
    const dateMomentObject = moment(dateString, "YYYY/MM/DD").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    const dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)
    
    const create = expectedBudgetModel.findOne({
        where:{
            date_expected:{
               [op.eq]: req.body.expected_date 
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Já existe um Orçamento Previsto cadastrado para este dia.");
            res.redirect("/admin/add-expected-budget")
        } else {
            // not exists
            expectedBudgetModel.create({
                date_expected: dateEvent,
                expected_budget: req.body.expected_budget
            }).then((budget) => {
                
                if(budget){
                    req.flash("success", "Orçamento Previsto cadastrado com sucesso.");
                    res.redirect("/admin/add-expected-budget")
                }else{
                    req.flash("error", "Erro ao criar uma Previsão de Orçamento, por favor entre em contato com o administrador do sistema.");
                    res.redirect("/admin/add-expected-budget")
                }
        
            })
        }1
    });
})




////////////  RENDERIZAR PÁGINA PARA EDITAR ORÇAMENTO PREVISTO ////////////
const getExpectedBudget = asyncHandler (async(req, res) =>{
    const edit = expectedBudgetModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.budget_expectedsId
            }
        }
    }).then((data) => {
        res.render("admin/edit-expected-budget", {
            expecteds: data,
            title: "Editar Orçamento Previsto - Frutadmin",
            moment: moment
        })
    })
})



////////////  EDITAR UM ORÇAMENTO PREVISTO ////////////
const editExpectedBudget = asyncHandler (async (req, res) => {

    var dateString = req.body.expected_date; // Pegar a data em formato string
    console.log(dateString)
    var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    var dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)

    const edit = expectedBudgetModel.update({
                date_expected: dateEvent,
                expected_budget: req.body.expected_budget
            }, {
                where:{
                    id: req.params.budget_expectedsId
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Orçamento Previsto atualizado com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar o Orçamento Previsto. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/edit-expected-budget/" + req.params.budget_expectedsId)
            })
        }
    )


////////////  EXCLUIR UMA PICAGEM ////////////
const deletePicagem = asyncHandler (async (req, res) => {
    expectedBudgetModel.findOne({
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
    addExpectedBudget,
    createExpectedBudget,
    getExpectedBudget,
    editExpectedBudget
}
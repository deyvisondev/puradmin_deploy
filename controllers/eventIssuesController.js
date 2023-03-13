const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const eventIssueModel = require("../models").event_issue
const moment = require("moment")



///////////  RENDERIZAR PÁGINA PARA CADASTRAR MOTIVO DE OCORRÊNCIA ////////////
const addIssue = asyncHandler (async(req, res) => {
    res.render("admin/eventMotiveCreate", {
        title: "Registar Tipos de Ocorrências - Frutadmin"
    })
    
})



////////////  BUSCAR TODOS OS MOTIVOS DE OCORRÊNCIAS CADASTRADOS ////////////
const allIssueMotive = asyncHandler (async (req, res) => {
        const getIssues = await eventIssueModel.findAll();
        res.render("admin/eventMotiveList", {
        title: "Listar Tipos de Ocorrências - Frutadmin",
        issues: getIssues
    });
})



////////////  CADASTRAR UM MOTIVO DE OCORRÊNCIA ////////////
const createIssue = asyncHandler (async (req, res) => {
    eventIssueModel.findOne({
        where:{
            name:{
               [op.eq]: req.body.name 
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Este motivo já está cadastrado.");
            res.redirect("/admin/event-issue-create")
        } else {
            // not exists
            eventIssueModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((issue) => {
                
                if(issue){
                    req.flash("success", "Motivo de Ocorrência cadastrado com sucesso.");
                    res.redirect("/admin/event-issue-create")
                }else{
                    req.flash("error", "Erro ao criar um Motivo de Ocorrência, por favor entre em contato com o administrador do sistema.");
                    res.redirect("/admin/event-issue-create")
                }
        
            })
        }
    });
})





////////////  EDITAR UM MOTIVO DE OCORRÊNCIA ////////////
const editIssue = asyncHandler (async (req, res) => {
    const edit = eventIssueModel.findOne({
        where:{
            [op.and]:[
                {
                    id:{
                        [op.ne]: req.params.issue_id
                    }
                },
                {
                    name:{
                        [op.eq]: req.body.name
                    }
                }
            ]
        }
    }).then((data)=>{
        if(data){
            //category arlredy exists
            req.flash("error", "Este motivo já está cadastrado. Por favor escolha outra nome.")
            res.redirect("/admin/event-issue-edit/" + req.params.issue_id)

        } else {
            //category doesnot exists
            eventIssueModel.update({
                name: req.body.name,
                status: req.body.status
            }, {
                where:{
                    id: req.params.issue_id
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Motivo de Ocorrência atualizado com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar o motivo de ocorrência. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/event-issue-edit/" + req.params.issue_id)
            })
        }
    })
})







////////////  LOCALIZAR UM DEPARTAMENTO PARA EDITAR ////////////
const getIssue = asyncHandler (async(req, res) =>{
    const edit = eventIssueModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.issue_id
            }
        }
    }).then((data) => {
        res.render("admin/eventMotiveEdit", {
            issue: data
        })
    })
})











////////////  EXCLUIR UM MOTIVO DE OCORRÊNCIA ////////////
const deleteIssue = asyncHandler (async (req, res) => {
    eventIssueModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.issue_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            eventIssueModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.issue_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Motivo de Ocorrência excluído com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir o Motivo de Ocorrência. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/event-issue-list")
            })
        }else{
    
        }
    })
})






module.exports = {
    addIssue,
    allIssueMotive,
    createIssue,
    getIssue,
    editIssue,
    deleteIssue
}
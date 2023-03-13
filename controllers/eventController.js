const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const eventModel = require("../models").events
const clientModel = require("../models").client
const productModel = require("../models").Product
const eventIssueModel = require("../models").event_issue
const sectionModel = require("../models").sections
const userModel = require("../models").users
const moment = require("moment")


////////////  RENDERIZAR PÁGINA PARA CADASTRAR OCORRÊNCIA ////////////
const addEvent = asyncHandler(async (req, res) => {

    var getClient = await clientModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var getProduct = await productModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var getIssue = await eventIssueModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var getSection = await sectionModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    var getUser = await userModel.findAll({
        where: {
            status: {
                [op.eq]: '1'
            }
        }
    })

    res.render("admin/eventCreate", {
        clients: getClient,
        products: getProduct,
        issues: getIssue,
        sections: getSection,
        users: getUser,
        title: "Registar Ocorrências - Frutadmin"
    });
})




////////////  CADASTRAR OCORRÊNCIA ////////////
const createEvent = asyncHandler(async (req, res) => {

    var dateString = req.body.date_event; // Pegar a data em formato string
    var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    var dateEvent = dateMomentObject.toDate();

    eventModel.create({
        product_id: req.body.product,
        client_id: req.body.client,
        event_issue_id: req.body.motive,
        observation: req.body.observation,
        date: dateEvent,
        reposition: req.body.reposition,
        section_id: req.body.section,
        user_id: req.body.user
    }).then((status) => {
        if (status) {
            req.flash("success", "Ocorrência cadastrada com sucesso")
            res.redirect("/admin/event-create")
        } else {
            req.flash("error", "Falha ao criar ocorrência. Por favor, entre em contato com o administrador do sistema.")
            res.redirect("/admin/event-create")
        }
    })
})




////////////  LISTAR OCORRÊNCIAS  ////////////
const allEvents = asyncHandler(async (req, res) => {

    const getEvents = await eventModel.findAll({
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
    })
    res.render("admin/eventList", {
        events: getEvents,
        moment: moment,
        title: "Lista de Ocorrências - Frutadmin"
    })
})





////////////  LOCALIZAR UMA OCORRÊNCIA PARA EDITAR ////////////
const getEvent = asyncHandler(async (req, res) => {

    const sections = await sectionModel.findAll()
    const users = await userModel.findAll()
    const products = await productModel.findAll()
    const event_issues = await eventIssueModel.findAll()
    const clients = await clientModel.findAll()

    const edit = eventModel.findOne({
        where: {
            id: {
                [op.eq]: req.params.event_id
            }
        }
    }).then((data) => {

        moment.locale('pt-br')
        res.render("admin/eventEdit", {
            event: data,
            sections: sections,
            users: users,
            products: products,
            event_issues: event_issues,
            clients: clients,
            moment: moment,
            title: "Editar Ocorrência - Frutadmin"
        })
    })
})




////////////  EDITAR OCORRÊNCIAS  ////////////
const editEvent = asyncHandler(async (req, res) => {
    const edit = await eventModel.findOne({
        where: {
            id: {
                [op.eq]: req.params.event_id
            }
        }
    }).then((data) => {
        if (data) {
            var dateString = req.body.date_event; // Pegar a data em formato string
            var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
            var dateEvent = dateMomentObject.toDate();
            //category arlredy exists
            eventModel.update({
                product_id: req.body.product,
                client_id: req.body.client,
                event_issue_id: req.body.motive,
                observation: req.body.observation,
                date: dateEvent,
                reposition: req.body.reposition,
                section_id: req.body.section,
                user_id: req.body.user
            }, {
                where: {
                    id: req.params.event_id
                }
            }).then((data) => {
                if (data) {
                    req.flash("success", "Ocorrência atualizada com sucesso.")
                } else {
                    req.flash("error", "Erro ao atualizar ocorrência. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/event-edit/" + req.params.event_id)
            })
        }
    })
})




////////////  DELETAR OCORRÊNCIAS  ////////////
const deleteEvent = asyncHandler (async (req, res) => {
    await eventModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.event_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            eventModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.event_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Ocorrência excluída com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir ocorrência. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/event-list")
            })
        }else{
    
        }
    })
})

module.exports = {
    addEvent,
    createEvent,
    allEvents,
    editEvent,
    getEvent,
    deleteEvent
}
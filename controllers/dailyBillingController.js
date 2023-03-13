const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes
const dailyBillingModel = require("../models").daily_billing
const moment = require("moment")
const bcrypt = require("bcrypt")



////////////  RENDERIZAR PÁGINA PARA CADASTRAR FATURAÇÃO ////////////
const addDailyBilling = asyncHandler(async (req, res) => {

    const allDailyBilling = await dailyBillingModel.findAll({
        order: [['date_billing', 'DESC']]
    });

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    res.render("admin/add-daily-billing", {
        billings: allDailyBilling,
        today: today,
        title: "Registar Faturação Diária - Frutadmin",
        moment: moment
    })

})

const createDailyBilling = asyncHandler(async (req, res) => {


    // Salvar o campo DATA corretamente
    const dateString = req.body.date_billing; // Pegar a data em formato string
    console.log(dateString)
    const dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    const dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)


    //Salvar os campos de valores corretamente
    const expected_billing = req.body.expected_billing.replace(/\./g, '').replace(',', '.');
    const effective_billing = req.body.effective_billing.replace(/\./g, '').replace(',', '.');
    const daily_lost = req.body.daily_lost.replace(/\./g, '').replace(',', '.');
    const credit_note = req.body.credit_note.replace(/\./g, '').replace(',', '.');

    const create = dailyBillingModel.findOne({
        where: {
            date_billing: {
                [op.eq]: dateEvent
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Já existe uma Faturação registada para este dia.");
            res.redirect("/admin/add-daily-billing")
        } else {
            // not exists
            dailyBillingModel.create({
                date_billing: dateEvent,
                expected_billing: expected_billing,
                effective_billing: effective_billing,
                daily_lost: daily_lost,
                credit_note: credit_note
            }).then((billing) => {

                if (billing) {
                    req.flash("success", "Faturação Diária registada com sucesso.");
                    res.redirect("/admin/add-daily-billing")
                } else {
                    req.flash("error", "Erro ao criar uma Faturação Diária, por favor entre em contato com o administrador do sistema.");
                    res.redirect("/admin/add-daily-billing")
                }

            })
        }
    })
})

////////////  RENDERIZAR PÁGINA PARA EDITAR FATURAÇÃO CADASTRADA ////////////
const getDailyBilling = asyncHandler(async (req, res) => {

    const edit = dailyBillingModel.findOne({
        where: {
            id: {
                [op.eq]: req.params.daily_billing_id
            }
        }
    }).then((data) => {
        console.log(data)
        moment.locale('pt-br')
        res.render("admin/edit-daily-billing", {
            daily_billings: data,
            title: "Editar Faturação Diária - Frutadmin",
            moment: moment
        })
    })
})

////////////  EDITAR UMA FATURAÇÃO ////////////
const editDailyBilling = asyncHandler(async (req, res) => {

    var dateString = req.body.date_billing; // Pegar a data em formato string
    console.log(dateString)
    var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
    console.log(dateMomentObject)
    var dateEvent = dateMomentObject.toDate();
    console.log(dateEvent)

    const expected_billing = req.body.expected_billing.replace(/\./g, '').replace(',', '.');
    const effective_billing = req.body.effective_billing.replace(/\./g, '').replace(',', '.');
    const daily_lost = req.body.daily_lost.replace(/\./g, '').replace(',', '.');
    const credit_note = req.body.credit_note.replace(/\./g, '').replace(',', '.');

    const edit = dailyBillingModel.update({
        date_billing: dateEvent,
        expected_billing: expected_billing,
        effective_billing: effective_billing,
        daily_lost: daily_lost,
        credit_note: credit_note
    }, {
        where: {
            id: req.params.daily_billing_id
        }
    }).then((data) => {
        if (data) {
            req.flash("success", "Faturação Diária atualizada com sucesso.")
        } else {
            req.flash("error", "Erro ao atualizar a Faturação Diária. Por favor entre em contato com o administrador do sistema.")
        }

        res.redirect("/admin/edit-daily-billing/" + req.params.daily_billing_id)
    })
})

////////////  EXCLUIR UMA FATURAÇÃO ////////////



module.exports = {
    addDailyBilling,
    createDailyBilling,
    getDailyBilling,
    editDailyBilling
}
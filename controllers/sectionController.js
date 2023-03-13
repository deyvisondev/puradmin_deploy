const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const sectionModel = require("../models").sections
const moment = require("moment")



///////////  RENDERIZAR PÁGINA PARA CADASTRAR DEPARTAMENTOS ////////////
const addSection = asyncHandler (async(req, res) => {
    res.render("admin/sectionCreate", {
        title: "Criar Departamento - Frutadmin"
    })
})



////////////  BUSCAR TODOS OS DEPARTAMENTOS ////////////
const allSection = asyncHandler (async (req, res) => {
        const getSection = await sectionModel.findAll();
        res.render("admin/sectionList", {
        sections: getSection,
        moment: moment,
        title: "Lista de Departamentos - Frutadmin"
    });
})



////////////  CADASTRAR UM DEPARTAMENTO ////////////
const createSection = asyncHandler (async (req, res) => {
    sectionModel.findOne({
        where:{
            name:{
               [op.eq]: req.body.name 
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Este departametno já está cadastrado.");
            res.redirect("/admin/section-create")
        } else {
            // not exists
            sectionModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((section) => {
                
                if(section){
                    req.flash("success", "Departamento cadastrado com sucesso.");
                    res.redirect("/admin/section-create")
                }else{
                    req.flash("error", "Erro ao criar um departamento, por favor entre em contato com o administrador do sistema.");
                    res.redirect("/admin/section-create")
                }
        
            })
        }
    });
})





////////////  EDITAR UM DEPARTAMENTO ////////////
const editSection = asyncHandler (async (req, res) => {
    const edit = sectionModel.findOne({
        where:{
            [op.and]:[
                {
                    id:{
                        [op.ne]: req.params.section_id
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
            req.flash("error", "Este departamento já está cadastrado. Por favor escolha outra nome.")
            res.redirect("/admin/section-edit/" + req.params.section_id)

        } else {
            //category doesnot exists
            sectionModel.update({
                name: req.body.name,
                status: req.body.status
            }, {
                where:{
                    id: req.params.section_id
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Departamento atualizado com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar o departamento. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/section-edit/" + req.params.section_id)
            })
        }
    })
})







////////////  LOCALIZAR UM DEPARTAMENTO PARA EDITAR ////////////
const getSection = asyncHandler (async(req, res) =>{
    const edit = sectionModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.section_id
            }
        }
    }).then((data) => {
        res.render("admin/sectionEdit", {
            section: data,
            title: "Editar Departamento - Frutadmin"
        })
    })
})











////////////  EXCLUIR UM DEPARTAMENTO ////////////
const deleteSection = asyncHandler (async (req, res) => {
    sectionModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.section_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            sectionModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.section_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Departamento excluído com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir o departamento. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/section-list")
            })
        }else{
    
        }
    })
})






module.exports = {
    addSection,
    allSection,
    createSection,
    getSection,
    editSection,
    deleteSection
}
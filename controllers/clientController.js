const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const clientModel = require("../models").client


////////////  RENDERIZAR PÁGINA PARA CADASTRAR CLIENTE ////////////
const addClient = asyncHandler (async (req, res) => {
    res.render("admin/clientCreate", {
     
    });
})









////////////  CADASTRAR CLIENTE ////////////


const creatClient = asyncHandler (async (req, res) => {
    clientModel.findOne({
        where:{
            name:{
                [op.eq]: req.body.name
            }
        }
    }).then((data)=> {
        if(data){ //user already exists
            req.flash("error", "Este cliente já existe.")
            res.redirect("/admin/client-create")
        }else{
            if (!req.files){
                clientModel.create({
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    responsable: req.body.responsable,
                    maps: req.body.maps,
                    foto: "/uploads/avatar.png",
                    status: req.body.status
                }).then((status) => {
                    if(status){
                        req.flash("success", "Cliente cadastrado com sucesso")
                        res.redirect("/admin/client-create")
                    }else{
                        req.flash("error", "Falha ao criar cliente. Por favor, entre em contato com o administrador do sistema.")
                        res.redirect("/admin/client-create")
                    }
                })
            } else {
            var image_attr = req.files.image
            var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]
            if (valid_images_extensions.includes(image_attr.mimetype)){
            image_attr.mv("./public/uploads/" + image_attr.name)

            clientModel.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                mobile: req.body.mobile,
                responsable: req.body.responsable,
                maps: req.body.maps,
                foto: "/uploads/" + image_attr.name, 
                status: req.body.status
            }).then((status) => {
                if(status){
                    req.flash("success", "Cliente cadastrado com sucesso")
                    res.redirect("/admin/client-create")
                }else{
                    req.flash("error", "Falha ao criar cliente. Por favor, entre em contato com o administrador do sistema.")
                    res.redirect("/admin/client-create")
                }
            }) 
        }
        }
    }
    })
    
})






////////////  LISTAR CLIENTES  ////////////

const allClient = asyncHandler (async (req, res) => {

    const getClients = await clientModel.findAll({
    })
    res.render("admin/clientList", {
        clients: getClients
    })
})



////////////  EDITAR UM CLIENTE ////////////
const editClient = asyncHandler (async (req, res) => {
    const edit = await clientModel.findOne({
        where:{
            [op.and]:[
                {
                    id:{
                        [op.ne]: req.params.client_id
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
            req.flash("error", "Este cliente já está cadastrado.")
            res.redirect("/admin/client-edit/" + req.params.client_id)

        } else {
            if (!req.files){
                clientModel.update({
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    responsable: req.body.responsable,
                    maps: req.body.maps,
                    status: req.body.status
                }, {
                    where:{
                        id: req.params.client_id
                    }
                }).then((status) => {
                    if(status){
                        req.flash("success", "Cliente atualizado com sucesso")
                        res.redirect("/admin/client-create")
                    }else{
                        req.flash("error", "Falha ao atualizar cliente. Por favor, entre em contato com o administrador do sistema.")
                        res.redirect("/admin/client-create")
                    }
                })
            } else {
                var image_attr = req.files.image
                var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]
                if (valid_images_extensions.includes(image_attr.mimetype)){
                image_attr.mv("./public/uploads/" + image_attr.name)

                clientModel.update({
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    responsable: req.body.responsable,
                    maps: req.body.maps,
                    foto: "/uploads/" + image_attr.name, 
                    status: req.body.status
                }, {
                        where:{
                            id: req.params.client_id
                        }
                }).then((status) => {
                    if(status){
                        req.flash("success", "Cliente atualizado com sucesso")
                        res.redirect("/admin/client-create")
                    }else{
                        req.flash("error", "Falha ao atualizar cliente. Por favor, entre em contato com o administrador do sistema.")
                        res.redirect("/admin/client-create")
                    }
                }) 
            }
        }
            
        }
    })
})







////////////  LOCALIZAR UM CLIENTE PARA EDITAR ////////////
const getClient =  asyncHandler (async(req, res) =>{
    const edit = await clientModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.client_id
            }
        }
    }).then((data) => {
        res.render("admin/clientEdit", {
            data: data
        })
    })
})











////////////  EXCLUIR UM CLIENTE ////////////
const deleteClient = asyncHandler (async (req, res) => {
    clientModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.client_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            clientModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.client_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Cliente excluído com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir o cliente. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/client-list")
            })
        }else{
    
        }
    })
})





module.exports = {
    addClient,
    creatClient,
    allClient,
    getClient,
    editClient,
    deleteClient
}
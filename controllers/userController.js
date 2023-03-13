const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const sectionModel = require("../models").sections
const userModel = require("../models").users
const moment = require("moment")
const bcrypt = require("bcrypt")


////////////  RENDERIZAR PÁGINA PARA CADASTRAR USUÁRIO ////////////
const addUser = asyncHandler (async (req, res) => {
    var sections = await sectionModel.findAll({
        where:{
            status:{
                [op.eq]: '1'
            }
        }
    })
    res.render("admin/userCreate", {
        sections: sections,
        title: "Criar Usuário - Frutadmin"
    });
})









////////////  CADASTRAR USUÁRIO ////////////
const createUser = asyncHandler (async (req, res) => {
    userModel.findOne({
        where:{
            email:{
                [op.eq]: req.body.email
            }
        }
    }).then((data)=> {
        if(data){ //user already exists
            req.flash("error", "Este usuário já existe.")
            res.redirect("/admin/user-create")
        }else{
            if (!req.files) {
                var dateString = req.body.date_hired; // Pegar a data em formato string
                var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
                var dateHired = dateMomentObject.toDate();          
                
                const password = req.body.password
                const hashPassword = bcrypt.hashSync(password, 10)
    
   
                userModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    section_id: req.body.section,
                    image: "/uploads/avatar.png",
                    date_hired: dateHired,  
                    status: req.body.status,
                    password: hashPassword,
                    type_user: req.body.type_user
                }).then((status) => {
                    if(status){
                        req.flash("success", "Usário cadastrado com sucesso")
                        res.redirect("/admin/user-create")
                    }else{
                        req.flash("error", "Falha ao criar usuário. Por favor, entre em contato com o administrador do sistema.")
                        res.redirect("/admin/add-user")
                    }
                }) 
            } else {
                var dateString = req.body.date_hired; // Pegar a data em formato string
                var dateMomentObject = moment(dateString, "DD/MM/YYYY").add(1, 'hours'); // 1st argument - string, 2nd argument - format
                var dateHired = dateMomentObject.toDate();          
                
                const password = req.body.password
                const hashPassword = bcrypt.hashSync(password, 10)
    
                var image_attr = req.files.image
                var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]
                if (valid_images_extensions.includes(image_attr.mimetype)){
                image_attr.mv("./public/uploads/" + image_attr.name)
    
                userModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    section_id: req.body.section,
                    image: "/uploads/" + image_attr.name,
                    date_hired: dateHired,  
                    status: req.body.status,
                    password: hashPassword
                }).then((status) => {
                    if(status){
                        req.flash("success", "Usário cadastrado com sucesso")
                        res.redirect("/admin/user-create")
                    }else{
                        req.flash("error", "Falha ao criar usuário. Por favor, entre em contato com o administrador do sistema.")
                        res.redirect("/admin/add-user")
                    }
                }) 
            }
            }

        }
    })
    
})






////////////  LISTAR USUÁRIO  ////////////
const allUser = asyncHandler (async (req, res) => {

    moment.locale('pt-br')

    const getUsers = await userModel.findAll({
        include:{
            model: sectionModel,
            attributes: ["name"]
          }  
    })
    res.render("admin/userList", {
        users: getUsers,
        moment: moment,
        title: "Lista de Usuários - Frutadmin"
    })
})



////////////  EDITAR UM USUÁRIO ////////////
const editUser = asyncHandler (async (req, res) => {
    const edit = await userModel.findOne({
        where:{
            [op.and]:[
                {
                    id:{
                        [op.ne]: req.params.user_id
                    }
                },
                {
                    email:{
                        [op.eq]: req.body.email
                    }
                }
            ]
        }
    }).then((data)=>{
        if(data){
            //category arlredy exists
            req.flash("error", "Este usuário já está cadastrado.")
            res.redirect("/admin/user-edit/" + req.params.user_id)

        } else {
            if (!req.files) {
                userModel.update({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    section_id: req.body.section, 
                    status: req.body.status,
                }, {
                    where:{
                        id: req.params.user_id
                    }
                }).then((data)=>{
                    if(data){
                        req.flash("success", "Usuário atualizado com sucesso.")   
                    } else {
                        req.flash("error", "Erro ao atualizar usuário. Por favor entre em contato com o administrador do sistema.")
                    }
    
                    res.redirect("/admin/user-edit/" + req.params.user_id)
                     })
            } else {
                var image_attr = req.files.image
                var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]
                if (valid_images_extensions.includes(image_attr.mimetype)){
                image_attr.mv("./public/uploads/" + image_attr.name)

            userModel.update({
                name: req.body.name,
                mobile: req.body.mobile,
                section_id: req.body.section,
                image: "/uploads/" + image_attr.name,  
                status: req.body.status,
            }, {
                where:{
                    id: req.params.user_id
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Usuário atualizado com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar usuário. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/user-edit/" + req.params.user_id)
                 })
                }  
            }
            //category doesnot exists
 
        }
    })
})







////////////  LOCALIZAR UM USUÁRIO PARA EDITAR ////////////
const getUser = asyncHandler (async(req, res) =>{
    
    const sections = await sectionModel.findAll()
    
    const edit = userModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.user_id
            }
        }
    }).then((data) => {
        res.render("admin/userEdit", {
            user: data,
            sections: sections,
            title: "Editar Usuário - Frutadmin"
        })
    })
})











////////////  EXCLUIR UM USUÁRIO ////////////
const deleteUser = asyncHandler (async (req, res) => {
    await userModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.user_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            userModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.user_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Usuário excluído com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir usuário. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/user-list")
            })
        }else{
    
        }
    })
})





module.exports = {
    addUser,
    createUser,
    allUser,
    getUser,
    editUser,
    deleteUser
}
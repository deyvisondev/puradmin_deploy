const express = require('express')

const Sequelize = require("sequelize")
var Op = Sequelize.Op

const router = express.Router();

//locad model

var userModel = require("../models").User

router.route("/admin/add-user").get(function(req, res, next) {
    res.render("admin/add-user")
}).post(function(req, res, next) {

    //email address check

    userModel.findOne({
        where:{
            email:{
                [Op.eq]: req.body.email
            }
        }
    }).then((data)=> {
        if(data){ //user already exists
            req.flash("error", "This email already exists")
            res.redirect("/admin/add-user")
        }else{ 
            userModel.create({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                gender: req.body.dd_gender,
                address: req.body.address,
                status: req.body.status
            }).then((status) => {
                if(status){
                    req.flash("success", "User has been created")
                    res.redirect("/admin/add-user")
                }else{
                    req.flash("error", "Failed to create user")
                    res.redirect("/admin/add-user")
                }
            }) 
        }
    })


})

//Rota para buscar todos os usários para imprimir no templete ejs

router.get("/admin/list-user", async function(req, res, next){

    var userData = await userModel.findAll()

    res.render("admin/list-user", {
        users: userData
        });
    
    });

// Rota para editar os usuários impressos no templete ejs

router.get("/admin/edit-user/:userId", async function(req, res, next){
    
    var userData = await userModel.findOne({
        where:{
            id:{
                [Op.eq]: req.params.userId
            }
        }
    })
    
    res.render("admin/edit-user", {
        user: userData
    })
})  

// Rota para persistir no banco de dados os valores editados no templete edit-user.ejs

router.post("/admin/edit-user/:userId", function(req, res, next){
    
    userModel.update({
        name: req.body.name,
        mobile: req.body.mobile,
        gender: req.body.dd_gender,
        address: req.body.address,
        status: req.body.status
    }, {
        where:{
            id:{
                [Op.eq]: req.params.userId
            }
        }
    }).then((status)=>{
        if(status){
            req.flash("success", "User update successfully")
        }else{
            req.flash("error", "Failed to update user")
        }
        res.redirect("/admin/edit-user/" + req.params.userId)
    })
    
      
})

//Rota para deletar os usuários

router.post("/admin/delete-user", function(req, res, next){
    userModel.destroy({
        where:{
            id:{
                [Op.eq]: req.body.user_id
            }
        }
    }).then((status)=>{
        if(status){
            req.flash("success", "User deleted successfully")
        }else{
            req.flash("error", "Failed to delete user")
        }
        res.redirect("/admin/list-user")
    })
})

module.exports = router;
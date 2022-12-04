const express = require('express')

const Sequelize = require('sequelize')
var Op = Sequelize.Op

var categoryModel = require('../models').Category
var userModel = require('../models').User
var bookModel = require('../models').Book
var issueBookModel = require('../models').IssueBook

const router = express.Router();

router.get("/admin/issue-book", async function(req, res, next){
    //traz para o render todas as categorias ativas
    var categories = await categoryModel.findAll({
        where:{
            status:{
                [Op.eq]: '1'
            }
        }
    })
    // traz para o render todos os usuários ativos
    var users = await userModel.findAll({
        where:{
            status:{
                [Op.eq]: '1'
            }
        }
    })
    // envia os dados de categoria e usuário para o templete ejs
    res.render("admin/issue-a-book", {
        categories: categories,
        users: users
    });

    });

router.post("/admin/issue-book/", function(req, res, next){
    issueBookModel.create({
        categoryId: req.body.dd_category,
        bookId: req.body.dd_book,
        userId: req.body.dd_user,
        days_issued: req.body.dd_days
    }).then((status)=>{
        if(status){
            req.flash("success", "Issue book has been created")
        }else{
            req.flash("error", "Failed to create a issue")
        }
        res.redirect("/admin/issue-history/")
    })
})

router.get("/admin/issue-history", async function(req, res, next){

    var issueList = await issueBookModel.findAll({
        include:[
            {
                model: categoryModel,
                attributes:["name"]
            },
            {
                model: bookModel,
                attributes:["name"]
            },
            {
                model: userModel,
                attributes:["name", "email"]
            }
        ],
        attributes:["days_issued", "issued_date"],
        where:{
            is_returned: {
                [Op.eq]: '0'
            }
        }
    });
    // res.json(issueList)
    res.render("admin/issue-history", {
        list: issueList
    });
    
    });

// Rota para concatenar categoria e livro em Issue a Book

router.post("/admin/category-list-book", async function(req, res, next){
    var category_id = req.body.cat_id 
    var books = await bookModel.findAll({
        where:{
            categoryId:{
                [Op.eq]: category_id
            }
        }
    })
    return res.json({
        status: 1,
        books: books
    })
})


module.exports = router;
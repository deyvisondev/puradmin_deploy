const express = require('express')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//load models
var userModel = require('../models').User
var issueBooksModel = require('../models').IssueBook
var bookModel = require('../models').Book

const router = express.Router();


router.get("/admin/return-a-book", async function(req, res, next){
    var all_users = await userModel.findAll({
        where:{
            status:{
                [Op.eq]: '1'
            }
        }
    })

    res.render("admin/return-a-book", {
        users: all_users
    });

    });

router.get("/admin/return-list-book", function(req, res, next){

    res.render("admin/return-list");
    
    });

/* handle ajax request */

router.post("/admin/user-list-book", async function(req, res, next){
    var user_id = req.body.user_id;
    var all_books = await issueBooksModel.findAll({
        include:[
            {
                model: bookModel,
                attributes:["name"]
            }
        ],
        where:{
            userId:{
                [Op.eq]: user_id
            },
            is_returned:{
                [Op.eq]: '0'
            }
        },
        attributes:["bookId"]
    })

    return res.json({
        status: 1,
        books: all_books

    })

})

// rota para cadastrar o retorno de um livro

router.post("/admin/return-a-book/", function(req, res, next){
    issueBooksModel.update({
        is_returned: '1',
        returned_date: Sequelize.fn('NOW')
    },{
        where:{
            userId:{
                [Op.eq]: req.body.dd_user
            },
            bookId:{
                [Op.eq]: req.body.dd_book
            },
            is_returned: '0'
        }
    }).then((status)=>{
        if(status){
            req.flash("success", "Book has been returned")
        }else{
            req.flash("error", "Failed to returned a book")
        }
        res.redirect("/admin/return-a-book/")
    })

})


module.exports = router;
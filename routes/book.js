const express = require('express')
const router = express.Router();
const Sequelize = require("sequelize")

//carregar o model de categorias para puxar os dados deste model
var categoryModel = require("../models").Category
//
var bookModel = require("../models").Book
var Op = Sequelize.Op

router.route("/admin/add-book").get(async function(req, res, next){

    var categories = await categoryModel.findAll({
        where:{
            status:{
                [Op.eq]: '1'
            }
        }
    });
    res.render("admin/add-book", {
        categories: categories
    });

    }).post(function(req, res, next){
        if(!req.files){
            req.flash("error", "Please upload some file")
        }else {
            var image_attr = req.files.cover_image;
            var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]

            if(valid_images_extensions.includes(image_attr.mimetype)){
                image_attr.mv("./public/uploads/" + image_attr.name)
                bookModel.create({
                    name: req.body.name,
                    categoryId: req.body.dd_category,
                    description: req.body.description,
                    amount: req.body.amount,
                    cover_image: "/uploads/" + image_attr.name,
                    author: req.body.author,
                    status: req.body.status
                }).then((data) => {
                    if (data){
                        //save
                        req.flash("success", "Book has been created")
                    } else {
                        //not save
                        req.flash("error", "Failed to create a book")
                    }
                    res.redirect("/admin/add-book")
                })
            } else{
                req.flash("error", "Invalid file selected")
                res.redirect("/admin/add-book")
            }



        }
    });

router.get("/admin/list-book", async function(req, res, next){

    var books = await bookModel.findAll({
      include:{
        model: categoryModel,
        attributes: ["name"]
      }  
    })

    res.render("admin/list-book", {
            books: books
        });
    
    });


// rota para buscar os itens e postar na tela ao clicar em edit book

router.get("/admin/edit-book/:bookId", async function(req, res, next){
    var book_data = await bookModel.findOne({
        where:{
            id:{
                [Op.eq]: req.params.bookId
            }
        }
    });

    var categories = await categoryModel.findAll({
        where:{
            status:{
                [Op.eq]: '1'
            }
        }
    });

    res.render("admin/edit-book", {
        book: book_data,
        categories: categories
    })
})


// rota para postar os campos editados no edit book
router.post("/admin/edit-book/:bookId", function(req, res, next){
    if(!req.files){ // not update cover image
        bookModel.update({
            name: req.body.name,
            categoryId: req.body.dd_category,
            description: req.body.description,
            amount: req.body.amount,
            author: req.body.author,
            status: req.body.status
        }, {
            where:{
                id:{
                    [Op.eq]:req.params.bookId
                }
            }
        }).then((data) => {
            if(data){
                req.flash("success", "The book has been updated")
            }else{
                req.flash("error", "Failed to update book")
            }
            res.redirect("/admin/edit-book/" + req.params.bookId)
        })
    }else{ //update cover image
        var image_attr = req.files.cover_image;
        var valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"]

        if(valid_images_extensions.includes(image_attr.mimetype)){
            image_attr.mv("./public/uploads/" + image_attr.name)
            bookModel.update({
                name: req.body.name,
                categoryId: req.body.dd_category,
                description: req.body.description,
                amount: req.body.amount,
                cover_image: "/uploads/" + image_attr.name,
                author: req.body.author,
                status: req.body.status
            }, {
                where:{
                    id:{
                        [Op.eq]: req.params.bookId
                    }
                }
            }).then((data) => {
                if (data){
                    //save
                    req.flash("success", "Book has been updated")
                } else {
                    //not save
                    req.flash("error", "Failed to update a book")
                }
                res.redirect("/admin/edit-book/" + req.params.bookId)
            })
        } else{
            req.flash("error", "Invalid file selected")
            res.redirect("/admin/add-book")
        }
    }

})

// rota para deletar um book

router.post("/admin/delete-book/:bookId", function(req, res, next){
    bookModel.findOne({
        where:{
            id:{
                [Op.eq]: req.body.book_id
            }
        }
    }).then((data)=>{
        if(data){
            bookModel.destroy({
                where:{
                    id:{
                        [Op.eq]: req.body.book_id
                    }
                }
            }).then((status) => {
                if(status){
                    req.flash("success", "Book has been deleted")
                    res.redirect("/admin/list-book/")
                }else{
                    req.flash("error", "Error to delete book")
                    res.redirect("/admin/list-book/")         
                }
            })
        }else{
            req.flash("error", "Invalid not found")
            res.redirect("/admin/list-book/")
        }
    })
})


module.exports = router;
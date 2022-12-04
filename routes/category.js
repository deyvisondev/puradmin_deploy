const express = require("express");

// load model
var categoryModel = require('../models').Category;
var Sequelize = require("sequelize")
var Op = Sequelize.Op

const router = express.Router();

router.route("/admin/add-category").get(function(req, res, next){
    res.render("admin/add-category");
}).post(function(req, res, next){
    
    categoryModel.findOne({
        where:{
            name:{
               [Op.eq]: req.body.name 
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Category Alredy Exists");
            res.redirect("/admin/add-category")
        } else {
            // not exists
            categoryModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((category) => {
                
                if(category){
                    req.flash("success", "Category created successfully");
                    res.redirect("/admin/add-category")
                }else{
                    req.flash("error", "Failed to create category");
                    res.redirect("/admin/add-category")
                }
        
            })
        }
    });
    

}),

router.get("/admin/list-category", async function (req, res, next){

    var all_categories = await categoryModel.findAll();
    res.render("admin/list-category", {
        categories: all_categories
    });
    
    });


router.route("/admin/edit-category/:categoryId").get(function(req, res, next){
   
    categoryModel.findOne({
        where:{
            id:{
                [Op.eq]: req.params.categoryId
            }
        }
    }).then((data) => {
        res.render("admin/edit-category", {
            category: data
        })
    })



    }).post(function(req, res, next) {
        categoryModel.findOne({
            where:{
                [Op.and]:[
                    {
                        id:{
                            [Op.ne]: req.params.categoryId
                        }
                    },
                    {
                        name:{
                            [Op.eq]: req.body.name
                        }
                    }
                ]
            }
        }).then((data)=>{
            if(data){
                //category arlredy exists
                req.flash("error", "Category already exists")
                res.redirect("/admin/edit-category/" + req.params.categoryId)

            } else {
                //category doesnot exists
                categoryModel.update({
                    name: req.body.name,
                    status: req.body.status
                }, {
                    where:{
                        id: req.params.categoryId
                    }
                }).then((data)=>{
                    if(data){
                        req.flash("success", "Category has been updated")   
                    } else {
                        req.flash("error", "Failed to update category")
                    }

                    res.redirect("/admin/edit-category/" + req.params.categoryId)
                })
            }
        })
    });  

    router.post("/admin/delete-category", function(req, res, next){
        categoryModel.findOne({
            where:{
                id:{
                    [Op.eq]: req.body.category_id
                }
            }
        }).then((data) => {
            if(data){
                //we have data on the basis of the given id
                categoryModel.destroy({
                    where:{
                        id:{
                            [Op.eq]: req.body.category_id
                        }
                    }
                }).then((status) => {
                    if(status){
                        //delete
                        req.flash("success", "Category has been deleted successfully")
                    }else{
                        //not delete
                        req.flash("error", "Failed to delete category")
                    }
                    res.redirect("/admin/list-category")
                })
            }else{

            }
        })
    })

module.exports = router;
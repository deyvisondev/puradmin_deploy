const asyncHandler = require("express-async-handler")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const productModel = require("../models").Product
const moment = require("moment")





////////////  RENDERIZAR PÁGINA PARA CADASTRAR PRODUTOS ////////////
const addProduct = asyncHandler (async(req, res) => {
    res.render("admin/add-product", {
        title: "Registar Produto - PURAdmin"
    })
})



////////////  BUSCAR TODOS OS PRODUTOS ////////////
const allProducts = asyncHandler (async (req, res) => {
        const getProducts = await productModel.findAll();
        res.render("admin/list-product", {
        products: getProducts,
        moment: moment,
        title: "Lista de Produtos - PURAdmin"
    });
})



////////////  CADASTRAR UM PRODUTO ////////////
const createProduct = asyncHandler (async (req, res) => {
    productModel.findOne({
        where:{
            name:{
               [op.eq]: req.body.name 
            }
        }
    }).then((data) => {
        if (data) {
            //exists
            req.flash("error", "Este produto já está cadastrado.");
            res.redirect("/admin/add-product")
        } else {
            // not exists
            productModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((product) => {
                
                if(product){
                    req.flash("success", "Produto cadastrado com sucesso.");
                    res.redirect("/admin/add-product")
                }else{
                    req.flash("error", "Erro ao criar um produto, por favor entre em contato com o administrador do sistema.");
                    res.redirect("/admin/add-product")
                }
        
            })
        }
    });
})



////////////  LOCALIZAR UM PRODUTO PARA EDITAR ////////////
const getProduct = asyncHandler (async(req, res) =>{
    const edit = productModel.findOne({
        where:{
            id:{
                [op.eq]: req.params.productId
            }
        }
    }).then((data) => {
        res.render("admin/edit-product", {
            product: data,
            title: "Editar Produto - PURAdmin"
        })
    })
})



////////////  EDITAR UM PRODUTO ////////////
const editProduct = asyncHandler (async (req, res) => {
    const edit = productModel.findOne({
        where:{
            [op.and]:[
                {
                    id:{
                        [op.ne]: req.params.productId
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
            req.flash("error", "Este produto já está cadastrado. Por favor escolha outra nome.")
            res.redirect("/admin/edit-product/" + req.params.productId)

        } else {
            //category doesnot exists
            productModel.update({
                name: req.body.name,
                status: req.body.status
            }, {
                where:{
                    id: req.params.productId
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Produto atualizado com sucesso.")   
                } else {
                    req.flash("error", "Erro ao atualizar o produto. Por favor entre em contato com o administrador do sistema.")
                }

                res.redirect("/admin/edit-product/" + req.params.productId)
            })
        }
    })
})



////////////  EXCLUIR UM PRODUTO ////////////
const deleteProduct = asyncHandler (async (req, res) => {
    productModel.findOne({
        where:{
            id:{
                [op.eq]: req.body.product_id
            }
        }
    }).then((data) => {
        if(data){
            //we have data on the basis of the given id
            productModel.destroy({
                where:{
                    id:{
                        [op.eq]: req.body.product_id
                    }
                }
            }).then((status) => {
                if(status){
                    //delete
                    req.flash("success", "Produto excluído com sucesso.")
                }else{
                    //not delete
                    req.flash("error", "Erro ao excluir o produto. Por favor entre em contato com o administrador do sistema.")
                }
                res.redirect("/admin/list-product")
            })
        }else{
    
        }
    })
})






module.exports = {
    allProducts,
    addProduct,
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}
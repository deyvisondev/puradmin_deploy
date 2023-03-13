const asyncHandler = require("express-async-handler")
const userModel = require("../models").users
const Sequelize = require("sequelize")
const op = Sequelize.Op

const getUserData = asyncHandler (async (req, res, next) => {
    const username = req.session.userId;
    const userData = await userModel.findOne({
        where:{
            id:{
                [op.eq]: username
            }
        },
        attributes: ['id', 'name', 'image']
    })
    res.locals.userData = userData;
    next()
})



module.exports = {
    getUserData
}
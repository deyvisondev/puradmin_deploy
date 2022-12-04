const redirectHome = function (req, res, next) {
    //verificar se existem variáveis de login
    if(req.session.userId){
        res.redirect("/admin")
    }else{
        next()
    }
}

const redirecLogin = function (req, res, next) {
    //verificar se existem varáveis de login
    if(!req.session.userId) {
        res.redirect("/login")
    } else {
        next()
    }
}

module.exports = {
    redirectHome,
    redirecLogin
}
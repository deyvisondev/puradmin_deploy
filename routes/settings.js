const express = require('express')
const router = express.Router();

router.get("/admin/currency-settings", function(req, res, next){

    res.render("admin/currency-settings");

    });

    router.get("/admin/days-settings", function(req, res, next){

        res.render("admin/day-settings");
    
        });


module.exports = router;
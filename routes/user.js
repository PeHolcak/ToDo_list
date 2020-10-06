const express = require("express")
const router = express.Router()
const User = require("../models/User")
const redirectToHome = require("../redirectToHome")
const userController = require("../controlers/userControler")

router.get("/login",redirectToHome,userController.getLoginForm)
router.post("/login",userController.login)

router.get("/register", redirectToHome,userController.getRegisterForm);
router.post("/register", redirectToHome,userController.register)


router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success_msg", "Uživatel byl úspěšně odhlášen.")
    res.redirect("/login")
})

module.exports=router
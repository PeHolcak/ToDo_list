
const redirectToLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error_msg","Nejprve se prosím přihlaste")
        res.redirect("/login")
    }
    else {
        return next()
    }
}

module.exports = redirectToLogin;


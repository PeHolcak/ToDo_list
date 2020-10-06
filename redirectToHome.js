
const redirectToHome = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash("error_msg","Již jste přihlášen.")
        res.redirect("/home")
    }
    else {
        return next()
    }};

    module.exports = redirectToHome;
const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport')
const User = require("../models/User")
const bcrypt = require('bcryptjs');

exports.getLoginForm = function (req, res, next) {
    res.render('login');
}

exports.login = function (req, res, next) {
    if (!req.body) { req.flash('error_msg', 'Špatně odeslaný formulář');
    res.redirect("/login")}
    const { username, password } = req.body
    if (username && password) {
        User.findOne({ email: username}, (err, user) => {
            if (err) {
                req.flash('error_msg', 'Zadal(a) jste nesprávné přihlašovací údaje.');
                res.redirect("/login")
            } else if (user == undefined) {
                req.flash('error_msg', 'Zadal(a) jste nesprávné přihlašovací údaje.');
                res.redirect("/login")
            } else {
                bcrypt.compare(password, user.password, (err, jeStejne) => {
                    if (err) {
                        req.flash('error_msg', 'Nastala chyba, ze strany apliakce, zkuste to prosím později');
                res.redirect("/login")
                    } else if (jeStejne === true) {
                        passport.authenticate("local", {
                            successRedirect: "/home",
                            failureRedirect: "/login",
                            failureFlash: true
                        })(req, res, next)
                    } else {
                        req.flash('error_msg', 'Zadal(a) jste nesprávné přihlašovací údaje.');
                        res.redirect("/login")
                    }
                })
        }})
}else{
    req.flash('error_msg', 'Všechna pole musí být vyplněná.');
    res.redirect("/login")
}};



exports.getRegisterForm = function (req, res, next) {
    res.render('register');
}
exports.register = function (req, res, next) {
    if (!req.body) return res.sendStatus(400);
    const { name, email, password, password2 } = req.body
    if(password==password2){
    if (name && email && password) {
        if (password.length > 8) {
            let user = new User({
                name: name,
                email: email,
                password: password
            });
            User.findOne({ email: user.email }, (err, nalezenyUzivatel) => {
                if (nalezenyUzivatel) {
                    req.flash('error_msg', 'Tohoto uživatele tu už máme.');
                    res.redirect("/register")
                }
                else {
                    User.addUser(user, (err, result) => {
                        if (err) {
                            req.flash('error_msg', 'Nepodařilo se nám uživatele zaregistrovat.');
                            res.redirect("/register")
                        }
                        if (result == "user added") {
                            req.flash('success_msg', 'Uživatel byl přidán, nyní se prosím přihlašte.');
                            res.redirect("/login")
                        }
                        else {
                            req.flash('error_msg', 'Nepodařilo se nám uživatele zaregistrovat.');
                            res.redirect("/register")
                        }

                    });
                }
            });
        } else {
            req.flash('error_msg', 'Nedostatečná délka hesla, zadejte minimálně 8 znaků!');
            res.redirect("/register")
        }
    }
    else {
        req.flash('error_msg', 'Všechna pole musí být vyplněná');
        res.redirect("/register")
    }
}else{
    req.flash('error_msg', "Hesla se neshodují");
    res.redirect("/register")
}}
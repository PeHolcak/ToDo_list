const express = require("express");
const Task = require("../models/task");
const User = require("../models/User");

function getTasks(req, res, callback) {
    let Usemail = req.user.email
    Task.find({ idOfUSer: Usemail }, function (err, result) {
        return callback(result)
    })
}

exports.getHome = function (req, res, next) {
    let idOOT=null
    let Usemail = req.user.email;
    User.findOne({ email: Usemail }, (err, user) => {
        if(err){
            req.flash('error_msg', 'Nastal problém s uživatelem.');
        }
        else{
            idOOT=user.lastOpenedTask
    getTasks(req, res, function (ress, err) {
        let titlesAndIDs = [];
        let doneTasks = [];
        let task = null;
        ress.forEach(element => {
            let pravda = element.done;
            if(element._id==idOOT){
                task = element;
            }
            if (pravda) {
                doneTasks.push({ name: element.title, id: "home/get/" + element.id });
            }
            else {
                titlesAndIDs.push({ name: element.title, id: "home/get/" + element.id });
            }
        });
        if(task==null){
            var data = { tasks: titlesAndIDs, doneTasks: doneTasks };
        }else{
            var data = { tasks: titlesAndIDs, doneTasks: doneTasks, shownTask: task };
        }
        res.render("home", { person: "ddsa", data: data });
    })
}
})
}
 
exports.add = function (req, res, next) {
    let title = req.body.nadpis
    let description = req.body.text
    if (title != "" && description != "") {
        let user = req.user.email
        let newtask = new Task({
            idOfUSer: user,
            title: req.body.nadpis,
            description: req.body.text,
            done: false
        })
        newtask.save(
            function (err, result) {
                if (!err) {
                    req.flash('success_msg', 'Úkol byl úspěšně přidán.');
                    res.redirect("/home")
                }
                else {
                    req.flash('error_msg', 'Nepodařilo se úkol přidat');
                    res.redirect("/home")
                }
            })
    }
    else if (description != "") {
        req.flash('error_msg', 'Můsíte zadat alespoň jeden znak.');
        res.redirect("/home")
    }
    else if (title != "") {
        req.flash('error_msg', 'Můsíte zadat alespoň jeden znak.');
        res.redirect("/home")
    }
    else {
        req.flash('error_msg', 'Můsíte zadat alespoň jeden znak.');
        res.redirect("/home")
    }
}
function aktualizujTask(req,res,next,id){
    let Usemail = req.user.email;
    Task.findOne({ _id: id }, (err, task) => {
        if (err) {
            req.flash('error_msg', "Zadaný úkol neexistuje");
            res.redirect("/home")
        } else {
            if (Usemail === task.idOfUSer) {
                    User.updateOne({ email: Usemail }, {
                        lastOpenedTask: id
                    }, function (err, ress) { if (err) {
                        req.flash('error_msg', "Chyba. Nepodařilo se nám úkol otevřít");
                        res.redirect("/home")
                 } else { 
                    res.redirect("/home") } })

            } else {
                req.flash('error_msg', "Číst úkoly, může pouze uživatel který je vytvořil");
                res.redirect("/home")
            }
        }
    })
}
exports.getTask = function (req, res, next) {
    let idFromUrl = req.params.id;
    aktualizujTask(req,res,next,idFromUrl)
}

exports.deleteTask = function (req, res, next) {
    let Usemail = req.user.email;
    let idFromUrl = req.params.id;
    Task.findOne({ _id: idFromUrl }, (err, task) => {
        if (err) {
            req.flash('error_msg', "Zadaný úkol neexistuje");
            res.redirect("/home")
        } else {
            if (Usemail === task.idOfUSer) {
                Task.deleteOne({ _id: idFromUrl }, (err, task) => {
                    if (err) {
                        req.flash('error_msg', "Chyba. Nepodařilo se nám úkol odstranit!");
                    } else {
                        req.flash('success_msg', "Úkol byl úspěšně vymazán.");
                    }
                    res.redirect("/home")
                });
            }
        }
    }
    )
}

exports.doneTasks = function (req, res, next) {
    let Usemail = req.user.email;
    let idFromUrl = req.params.id;
    Task.findOne({ _id: idFromUrl }, (err, task) => {
        if (err) {
            req.flash('error_msg', "Zadaný úkol neexistuje");
            res.redirect("/home")
        } else {
            if (Usemail === task.idOfUSer) {
                Task.updateOne({ _id: idFromUrl }, {
                    done: true
                }, function (err, ress) { if (err) {
                    req.flash('error_msg', "Chyba. Nepodařilo se nám úkol přesunout do vyřešených!");
                    res.redirect("/home")
             } else { 
                req.flash('success_msg', "Úkol byl úspěšně přiřazen do hotových.");
                res.redirect("/home") } })
            }
        }
    })
}

exports.updateTasks = function (req, res, next) {
    let Usemail = req.user.email;
    let idFromUrl = req.params.id;
    Task.findOne({ _id: idFromUrl }, (err, task) => {
        if (err){
        req.flash('error_msg', "Chyba. Nepodařilo se nám úkol přesunout do vyřešených!");
        res.redirect("/home")
        }else{
        if (Usemail === task.idOfUSer) {
            if(!task.done){
            Task.updateOne({ _id: idFromUrl }, {
                title: req.body.nadpis,
                description: req.body.text
            }, function (err, ress) { if (err) {
                req.flash('error_msg', "Chyba. Nepodařilo se nám úkol upravit!");
                res.redirect("/home")} else {                
                req.flash('success_msg', "Úkol byl úspěšně upraven.");
                aktualizujTask(req,res,next,idFromUrl) } })
            }else{
                req.flash('error_msg', "Nelze upravovat již vyřešený úkol");
                res.redirect("/home")
            }
        }
        else{
            req.flash('error_msg', "Upravovat úkoly, může pouze uživatel který je vytvořil");
            res.redirect("/home")
        }
     } })
}


exports.getJson = function (req, res, next) {
    getTasks(req, res, function (ress, err) {
        res.render("json", { json: JSON.stringify(ress, null, ' ') });
    })
}

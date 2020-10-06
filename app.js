const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = process.env.PORT||5000;
const app = express();
const flash = require("connect-flash")
const session = require("express-session")

require("./config/passport")(passport)

const db = require("./config/keyes").MongoURI;
mongoose.connect(db, {useNewUrlParser: true,  useUnifiedTopology: true }).then(()=>console.log("MongoDB Connected...")).catch(err=>console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use("/styles", express.static('styles'));

app.use(express.urlencoded({extended: false}))

app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
    cookie : {
        sameSite: 'strict',
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg=req.flash("error_msg")
    next()
})

app.use("/", require("./routes/index.js"))
app.use("/", require("./routes/user.js"))
app.use("/", require("./routes/taskRouter.js"))

app.get("*", function(req,res){
    res.render("wrongAdress");
    })

app.listen(PORT, console.log("Server started on port ${PORT}"))
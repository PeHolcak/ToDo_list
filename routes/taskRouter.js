const express = require("express")
const router = express.Router();
const redirectToLogin = require("../redirectToLogin");
const taskController = require("../controlers/taskController");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/home/add",redirectToLogin,urlencodedParser,taskController.add);
router.get("/home",redirectToLogin,urlencodedParser,taskController.getHome);
router.get("/home/get/:id",redirectToLogin,urlencodedParser,taskController.getTask);
router.get("/home/delete/:id",redirectToLogin,urlencodedParser,taskController.deleteTask);
router.get("/home/done/:id",redirectToLogin,urlencodedParser,taskController.doneTasks);
router.post("/home/edit/:id",redirectToLogin,urlencodedParser,taskController.updateTasks);
router.get("/json",redirectToLogin,urlencodedParser,taskController.getJson);
module.exports = router


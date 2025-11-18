const { Router } = require('express');
const controller = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", controller.messagesGet);
indexRouter.get("/new", controller.formGet);
indexRouter.post("/new", controller.formPost);
indexRouter.get("/message/:id", controller.messageGet);

module.exports = indexRouter;
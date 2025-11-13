const { Router } = require('express');
const { v4: uuid } = require('uuid');

const indexRouter = Router();

const messages = [
    {
        id: uuid(),
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        id: uuid(),
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

indexRouter.get("/", (req, res) => res.render("index", { title: "Mini Messageboard", messages: messages }));

indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;

    messages.push({ id: uuid(), text: messageText, user: messageUser, added: new Date() });

    res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
    const messageId = req.params.id;
    const message = messages.find((messageObject) => messageId === messageObject.id);

    res.render("messageDetails", { message: message });
});

module.exports = indexRouter;
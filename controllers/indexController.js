const db = require("../db/queries");

async function messagesGet(req, res) {
    const messages = await db.getAllMessages();

    res.render("index", { title: "Mini Messageboard", messages: messages });
};

async function messageGet(req, res) {
    const message = await db.getMessage(req.params.id);

    res.render("messageDetails", { title: "Mini Messageboard", message: message });
};

async function formGet(req, res) {
    res.render("form");
};

async function formPost(req, res) {
    const { userName, message } = req.body;
    
    await db.addNewMessage(userName, message);
    res.redirect("/");
};

module.exports = { 
        messagesGet,
        messageGet,
        formGet,
        formPost 
    };
const db = require("../db/queries");

async function getMessages(req, res) {
    const messages = await db.getAllMessages();

    res.render("index", { title: "Mini Messageboard", messages: messages });
}

module.exports = { getMessages };
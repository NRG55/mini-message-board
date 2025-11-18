const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUserInput = [
    body("userName")
        .trim()
        .isLength( { min: 1, max: 30 })
        .withMessage("Name must be between 1 and 30 characters"),
    body("message")
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage("Message must be between 1 and 200 characters"),
];

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

const formPost = [
    validateUserInput,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("form", { errors: errors.array() });
        };

        const { userName, message } = req.body;
        
        await db.addNewMessage(userName, message);
        res.redirect("/");
    }
];

module.exports = { 
        messagesGet,
        messageGet,
        formGet,
        formPost 
    };
const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
};

async function addNewMessage (userName, message) {
    console.log(userName, message)
    await pool.query(`INSERT INTO messages ("user", text) VALUES ($1, $2)`, [userName, message]);
};

async function getMessage(id) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return rows[0];
};

module.exports = { 
    getAllMessages,
    getMessage,
    addNewMessage 
};
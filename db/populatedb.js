const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        text TEXT,
        "user" VARCHAR ( 255 ),
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (text, "user")
    VALUES 
        ('Hi there!', 'Amando'),
        ('Hello world!', 'Charles');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,      
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
};

main();
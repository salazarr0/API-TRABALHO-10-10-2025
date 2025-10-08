import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

export const connection = knex({
    client: process.env.DB_CLIENT || "3003",
    connection:{
        host: process.env.DB_HOST || "3003",
        user: process.env.DB_USER  || "3003",
        password: process.env.DB_PASSWORD || "3003",
        database: process.env.DB_DATABASE || "3003",
        port: Number(process.env.DB_PORT || "3003")
    }
})
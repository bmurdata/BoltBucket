import { pool } from "./database.js";
import './dotenv.js'


const createcustomcarTable=async ()=>{
    const createTableQuery=`
    DROP TABLE IF EXISTS customcar;
    CREATE TABLE IF NOT EXISTS customcar (
        id SERIAL PRIMARY KEY,
        exterior VARCHAR(255) NOT NULL,   
        roof VARCHAR(255) NOT NULL,
        wheels VARCHAR(255) NOT NULL,
        interior VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    );
    `
    try{
        const res =await pool.query(createTableQuery)
        console.log('customcar table created successfully')
    }
    catch (err){
        console.error('Error creating customcar table',err)
    }
}
createcustomcarTable()
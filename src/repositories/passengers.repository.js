import db from "../database/database.connection.js";

async function insert(firstName, lastName) {
    return await db.query("INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)", [firstName, lastName]);
}

const passengersRepository = { insert };
export default passengersRepository;

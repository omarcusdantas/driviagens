import db from "../database/database.connection.js";

async function insert(origin, destination, date) {
    const formatedDate = date.split("-").reverse().join("-");
    return await db.query("INSERT INTO flights (origin, destination, date) VALUES ($1 ,$2, $3)", [
        origin,
        destination,
        formatedDate,
    ]);
}

async function selectById(id) {
    const result = await db.query("SELECT * FROM flights WHERE id = $1", [id]);
    return result.rows[0];
}

const flightsRepository = { insert, selectById };
export default flightsRepository;
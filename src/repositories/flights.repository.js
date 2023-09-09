import db from "../database/database.connection.js";

async function insert(origin, destination, date) {
    const formatedDate = date.split("-").reverse().join("-");
    return await db.query("INSERT INTO flights (origin, destination, date) VALUES ($1 ,$2, $3)", [
        origin,
        destination,
        formatedDate,
    ]);
}

const flightsRepository = { insert };
export default flightsRepository;

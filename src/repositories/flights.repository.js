import db from "../database/database.connection.js";

async function insert(origin, destination, date) {
    return await db.query("INSERT INTO flights (origin, destination, date) VALUES ($1 ,$2, $3)", [
        origin,
        destination,
        date,
    ]);
}

async function selectById(id) {
    const result = await db.query("SELECT * FROM flights WHERE id = $1", [id]);
    return result.rows[0];
}

async function select(origin, destination, smallDateFormated, bigDateFormated, page) {
    let query = `
        SELECT 
            flights.id, 
            origin.name AS origin, 
            destination.name AS destination, 
            TO_CHAR(date, 'DD-MM-YYYY') AS date
        FROM flights
        JOIN cities AS origin ON flights.origin = origin.id
        JOIN cities AS destination ON flights.destination = destination.id
    `;
    const queryParams = [];

    if (origin) {
        query += ` WHERE origin.name = $${queryParams.length + 1}`;
        queryParams.push(origin);
    }

    if (destination) {
        query += query.includes("WHERE") ? ` AND` : ` WHERE`;
        query += `destination.name = $${queryParams.length + 1})`;
        queryParams.push(destination);
    }

    if (smallDateFormated && bigDateFormated) {
        query += query.includes("WHERE") ? ` AND` : ` WHERE`;
        query += ` flights.date BETWEEN $${queryParams.length} AND $${queryParams.length + 1}`;
        queryParams.push(smallDateFormated, bigDateFormated);
    }

    query += ` ORDER BY flights.date`;

    if (page) {
        const limit = 10;
        const offset = (page - 1) * limit;

        query += ` OFFSET $${queryParams.length} LIMIT $${queryParams.length + 1}`;
        queryParams.push(offset, limit);
    }

    const flights = await db.query(query, queryParams);
    return flights.rows;
}

const flightsRepository = { insert, selectById, select };
export default flightsRepository;

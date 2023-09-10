import db from "../database/database.connection.js";

async function insert(firstName, lastName) {
    return await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`, [firstName, lastName]);
}

async function selectById(id) {
    const result = await db.query("SELECT * FROM passengers WHERE id = $1", [id]);
    return result.rows[0];
}

async function selectFlightsPerPessengers(name, page) {
    let query = `
        SELECT 
            (passengers."firstName" || ' ' || passengers."lastName") AS passenger, 
            COUNT(travels."passengerId") AS travels
        FROM passengers
        JOIN travels ON passengers.id = travels."passengerId" 
    `;
    const queryParams = [];

    if (name) {
        query += ` 
            WHERE passengers."firstName" ILIKE $${queryParams.length + 1} 
            OR passengers."lastName" ILIKE $${queryParams.length + 1} 
        `;
        queryParams.push(`%${name}%`);
    }

    query += " GROUP BY passengers.id ORDER BY travels DESC";

    if (page) {
        const limit = 10;
        const offset = (page - 1) * limit;

        query += ` OFFSET $${queryParams.length} LIMIT $${queryParams.length + 1}`;
        queryParams.push(offset, limit);
    }

    const flightsPerPassenger = await db.query(query, queryParams);
    return flightsPerPassenger.rows;
}

const passengersRepository = { insert, selectById, selectFlightsPerPessengers };
export default passengersRepository;

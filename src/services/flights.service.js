import flightsRepository from "../repositories/flights.repository.js";
import { isValidCity } from "../utils/validations.js";

async function create(origin, destination, date) {
    if (origin === destination) {
        throw { type: "conflit", message: "Origin and destination cannot be the same" };
    }

    const isValidOrigin = await isValidCity(origin);
    const isValidDestination = await isValidCity(destination);

    if (!isValidOrigin || !isValidDestination) {
        throw { type: "notFound", message: "Invalid id for cities" };
    }

    return await flightsRepository.insert(origin, destination, date);
}

const flightsService = {
    create,
};
export default flightsService;

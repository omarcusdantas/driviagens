import flightsRepository from "../repositories/flights.repository.js";
import citiesRepository from "../repositories/cities.repository.js";

async function create(origin, destination, date) {
    if (origin === destination) {
        throw { type: "conflit", message: "Origin and destination cannot be the same" };
    }

    const originCity = await citiesRepository.selectById(origin);
    const destinationCity = await citiesRepository.selectById(destination);

    if (!originCity || !destinationCity) {
        throw { type: "notFound", message: "Invalid id for cities" };
    }

    return await flightsRepository.insert(origin, destination, date);
}

const flightsService = {
    create,
};
export default flightsService;

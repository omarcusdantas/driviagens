import citiesRepository from "../repositories/cities.repository.js";
import flightsRepository from "../repositories/flights.repository.js";
import passengersRepository from "../repositories/passengers.repository.js";
import { dateQuerySchema } from "../schemas/dates.schema.js";

export async function isValidCity(cityId) {
    const city = await citiesRepository.selectById(cityId);
    if (city) {
        return true;
    }
    return false;
}

export async function isValidPassenger(passengerId) {
    const passenger = await passengersRepository.selectById(passengerId);
    if (passenger) {
        return true;
    }
    return false;
}

export async function isValidFlight(flightId) {
    const flight = await flightsRepository.selectById(flightId);
    if (flight) {
        return true;
    }
    return false;
}

export function isInvalidDateQuery(smallDate, bigDate) {
    const validation = dateQuerySchema.validate({ smallDate, bigDate }, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return errors;
    }
    return false;
}

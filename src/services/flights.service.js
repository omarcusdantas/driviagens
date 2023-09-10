import flightsRepository from "../repositories/flights.repository.js";
import { isValidCity, isInvalidDateQuery } from "../utils/validations.js";

async function create(origin, destination, date) {
    const isValidOrigin = await isValidCity(origin);
    const isValidDestination = await isValidCity(destination);

    if (!isValidOrigin || !isValidDestination) {
        throw { type: "notFound", message: "Invalid id for cities" };
    }

    if (origin === destination) {
        throw { type: "conflict", message: "Origin and destination cannot be the same" };
    }

    const dateFormated = date.split("-").reverse().join("-");
    if (new Date(dateFormated) < new Date()) {
        throw { type: "unprocessable", message: "Date cannot be in the past" };
    }

    return await flightsRepository.insert(origin, destination, dateFormated);
}

function checkDates(smallDate, bigDate) {
    const invalidDateQuery = isInvalidDateQuery(smallDate, bigDate);
    if (invalidDateQuery) {
        throw { type: "unprocessable", message: invalidDateQuery };
    }

    const smallDateFormated = smallDate.split("-").reverse().join("-");
    const biggerDateFormated = bigDate.split("-").reverse().join("-");
    if (new Date(smallDateFormated) > new Date(biggerDateFormated)) {
        throw { type: "unprocessable", message: "Smaller date cannot be greater than bigger date" };
    }
}

async function retrieve(origin, destination, smallDate, bigDate, page) {
    if ((smallDate && !bigDate) || (!smallDate && bigDate)) {
        throw { type: "unprocessable", message: "Smaller date and bigger date must be passed together" };
    } else if (smallDate && bigDate) {
        checkDates(smallDate, bigDate);
    }

    if (page && (page < 1 || isNaN(page))) {
        throw { type: "badRequest", message: "Page must be greater than 0" };
    }

    const flights = await flightsRepository.select(origin, destination, smallDateFormated, bigDateFormated, page);
    return flights;
}

const flightsService = {
    create,
    retrieve,
};
export default flightsService;

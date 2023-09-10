import passengersRepository from "../repositories/passengers.repository.js";

async function create(firstName, lastName) {
    return await passengersRepository.insert(firstName, lastName);
}

async function retrieveFlightsPerPassengers(name, page) {
    if (page && (page < 1 || isNaN(page))) {
        throw { type: "badRequest", message: "Page must be greater than 0" };
    }

    const flightsPerPassenger = await passengersRepository.selectFlightsPerPessengers(name, page);

    if (flightsPerPassenger.length > 10) {
        throw { type: "internal", message: "Too many results" };
    }
    return flightsPerPassenger;
}

const passengersService = {
    create, retrieveFlightsPerPassengers
};
export default passengersService;

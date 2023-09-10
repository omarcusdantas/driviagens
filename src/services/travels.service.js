import travelsRepository from "../repositories/travels.repository.js";
import { isValidPassenger, isValidFlight } from "../utils/validations.js";

async function create(passengerId, flightId) {
    const validPassenger = await isValidPassenger(passengerId);
    const validFlight = await isValidFlight(flightId);

    if (!validFlight || !validPassenger) {
        throw { type: "notFound", message: "Invalid id for flight or passenger" };
    }

    return await travelsRepository.insert(passengerId, flightId);
}

const travelsService = {
    create,
};
export default travelsService;

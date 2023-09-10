import httpStatus from "http-status";
import passengersService from "../services/passengers.service.js";

async function register(req, res) {
    const { firstName, lastName } = req.body;
    await passengersService.create(firstName, lastName);
    res.sendStatus(httpStatus.CREATED);
}

async function get(req, res) {
    const { name, page } = req.query;
    const flightsPerPassenger = await passengersService.retrieveFlightsPerPassengers(name, page);
    res.status(httpStatus.OK).send(flightsPerPassenger);
}

export const passengersController = {
    register, get
}
export default passengersController;

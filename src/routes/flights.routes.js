import { Router } from "express";
import flightsController from "../controllers/flights.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { flightSchema } from "../schemas/flights.schema.js";

const flightsRouter = Router();
flightsRouter.post("/flights", validateSchema(flightSchema), flightsController.register);

export default flightsRouter;

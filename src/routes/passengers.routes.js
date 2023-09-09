import { Router } from "express";
import passengersController from "../controllers/passengers.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schema.js";

const passengersRouter = Router();
passengersRouter.post("/passengers", validateSchema(passengerSchema), passengersController.register);

export default passengersRouter;

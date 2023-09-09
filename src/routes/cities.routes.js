import { Router } from "express";
import citiesController from "../controllers/cities.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { citySchema } from "../schemas/cities.schema.js";

const citiesRouter = Router();
citiesRouter.post("/cities", validateSchema(citySchema), citiesController.register);

export default citiesRouter;

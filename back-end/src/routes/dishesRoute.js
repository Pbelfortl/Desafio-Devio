import { Router } from "express";
import { getDishes } from "../controllers/dishesController.js";

const dishesRouter = Router()

dishesRouter.get("/products", getDishes)

 export default dishesRouter
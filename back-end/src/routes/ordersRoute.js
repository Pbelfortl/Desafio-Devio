import { Router } from "express";
import { clearOrder, finishOrder, getOrders, placeOrder } from "../controllers/ordersController.js";

const ordersRouter = Router()

ordersRouter.post("/orders", placeOrder)
ordersRouter.get("/orders", getOrders)
ordersRouter.put("/orders/:clientCode", finishOrder)
ordersRouter.delete("/orders/:clientCode", clearOrder)

export default ordersRouter
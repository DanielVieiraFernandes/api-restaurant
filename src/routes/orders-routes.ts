import { OrdersController } from "@/controllers/orders-controller";
import { Router } from "express";

export const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/table-session/:table_session_id/total", ordersController.show);
ordersRoutes.get("/table-session/:table_session_id", ordersController.index);
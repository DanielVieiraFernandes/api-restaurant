import { TablesSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";

export const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.get("/", tablesSessionsController.index);
tablesSessionsRoutes.post("/", tablesSessionsController.create);
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update);
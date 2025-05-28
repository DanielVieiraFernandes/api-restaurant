import { TablesController } from "@/controllers/tables-controller";
import { Router } from "express";

export const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.index);
import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";

export class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableTable>("tables")
        .select()
        .orderBy("table_number");

      return res.json({ tables });
    } catch (error) {
      next(error);
    }
  }
}

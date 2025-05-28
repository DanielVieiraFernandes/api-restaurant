import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export class TablesSessionsController {
  // constructor(private tablesSessionsService: TablesSessionsService){}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_id } = z
        .object({
          table_id: z.number(),
        })
        .parse(req.body);

      const session = await knex<TablesSessionsTable>("tables_sessions")
        .where({
          table_id,
        })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("this table is already open");
      }

      await knex<TablesSessionsTable>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return res.status(201).end();
    } catch (error) {
      next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsTable>(
        "tables_sessions"
      ).orderBy("closed_at");

      return res.json({ sessions });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce
        .number()
        .positive()
        .refine((value) => !isNaN(value))
        .parse(req.params.id);

      const session = await knex<TablesSessionsTable>("tables_sessions")
        .where({ table_id: id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.closed_at) {
        throw new AppError("this session table is already closed");
      }

      await knex<TablesSessionsTable>("tables_sessions")
        .update({ closed_at: knex.fn.now() })
        .where({ table_id: id });

      return res.end();
    } catch (error) {
      next(error);
    }
  }
}

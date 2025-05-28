import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
export class OrdersController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { product_id, quantity, table_session_id } = z
        .object({
          table_session_id: z.number().int().positive(),
          product_id: z.number().int().positive(),
          quantity: z.number().int().positive(),
        })
        .parse(req.body);

      const session = await knex<TablesSessionsTable>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductTable>("products")
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<OrderTable>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z.coerce
        .number()
        .int()
        .positive()
        .parse(req.params.table_session_id);

      const order = await knex<OrderTable>("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          knex.raw("(orders.price * orders.quantity) AS total"),
          "orders.created_at",
          "orders.updated_at"
        )
        .join("products", "products.id", "orders.product_id")
        .where({
          table_session_id,
        })
        .orderBy("orders.created_at", "desc");

      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z.coerce
        .number()
        .int()
        .positive()
        .parse(req.params.table_session_id);

      const order = await knex<OrderTable>("orders")
        .select(
          knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total"),
          knex.raw("COALESCE(SUM(orders.quantity), 0) AS quantity")
        )
        .where({ table_session_id })
        .first();

      return res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

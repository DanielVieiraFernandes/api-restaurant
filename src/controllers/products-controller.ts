import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

export class ProductController {
  constructor() {}
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      const products = await knex<ProductTable>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "name is required" }).trim().min(6),
        price: z.number().gt(0, { message: "Value must be greather than 0" }),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductTable>("products").insert({ name, price });

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce
        .number()
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.id);

      const product = await knex<ProductTable>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      const { name, price } = z
        .object({
          name: z.string({ required_error: "name is required" }).trim().min(6),
          price: z.number().gt(0, { message: "Value must be greather than 0" }),
        })
        .parse(req.body);

      await knex<ProductTable>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce
        .number()
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.id);

      const product = await knex<ProductTable>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      await knex<ProductTable>("products").delete().where({ id });

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

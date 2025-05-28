import { knex as KnexConfig } from "knex";
import config from "../../knexfile";
export const knex = KnexConfig(config);
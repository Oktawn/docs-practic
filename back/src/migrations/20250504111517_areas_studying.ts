import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("areas_studying", (table) => {
    table.increments("id").primary();
    table.string("profile").notNullable();
    table.string("specialization").notNullable().unique();
    table.string("type").notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("areas_studying");
}


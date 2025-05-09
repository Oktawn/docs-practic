import type { Knex } from "knex";
import { IStudentPractic } from "../commons/interfaces/interface";


export async function up(knex: Knex<IStudentPractic>): Promise<void> {
  return knex.schema.createTable("students", (table) => {
    table.increments("id").notNullable();
    table.string("fullName").notNullable();
    table.string("profileType").notNullable();
    table.string("profile").notNullable();
    table.string("specialization").notNullable();
    table.string("groups").notNullable();
    table.string("kyrs").notNullable();
    table.string("practicStyle").notNullable();
    table.string("practicType").notNullable();
    table.string("orgName").notNullable();
    table.string("dateStart").notNullable();
    table.string("dateEnd").notNullable();

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("students");
}


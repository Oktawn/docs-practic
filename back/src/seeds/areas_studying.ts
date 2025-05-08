import { Knex } from "knex";
import { data } from "../commons/mooks/data";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("areas_studying").del();

    // Inserts seed entries
    await knex("areas_studying").insert(data);
};

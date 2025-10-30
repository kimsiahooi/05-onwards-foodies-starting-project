import type { Meal } from "@/types/meals/meal";
import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <Meal[]>db.prepare("SELECT * FROM meals").all();
};

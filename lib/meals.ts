import type { Meal } from "@/types/meals/meal";
import sql from "better-sqlite3";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return <Meal[]>db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug: string) => {
  return <Meal>db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

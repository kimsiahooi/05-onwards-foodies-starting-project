import type { Meal, MealFormData } from "@/types/meals/meal";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return <Meal[] | undefined>db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug: string) => {
  return <Meal | undefined>(
    db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug)
  );
};

export const saveMeal = async (meal: MealFormData) => {
  const newMeal: Omit<Meal, "id"> = {
    title: meal.title,
    summary: meal.summary,
    image: meal.image.name,
    creator: meal.creator,
    creator_email: meal.creator_email,
    slug: slugify(meal.title, { lower: true }),
    instructions: xss(meal.instructions),
  };

  const extension = meal.image.name.split(".").pop();
  const fileName = `${newMeal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  newMeal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
    )
    `
  ).run(newMeal);
};

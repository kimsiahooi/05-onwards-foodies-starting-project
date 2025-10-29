import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/sequelize";
import { Meal } from "@/models/meals";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const meal = await Meal.create({
        title: "Juicy Cheese Burger",
        slug: "juicy-cheese-burger",
        image: "/images/burger.jpg",
        summary:
          "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
        instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
        creator: "John Doe",
        creator_email: "johndoe@example.com",
      });
      res.status(200).json(meal);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}

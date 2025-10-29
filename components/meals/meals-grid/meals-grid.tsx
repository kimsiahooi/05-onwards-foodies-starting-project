import type { Meal } from "@/types/meals/meal";
import classes from "./meals-grid.module.css";
import MealItem from "../meal-item/meal-item";

export default function MealsGrid({ meals }: { meals: Meal[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}

import type { ReactNode } from "react";

export default function MealsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <p>Meals layout</p>
      {children}
    </>
  );
}

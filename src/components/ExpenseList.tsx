import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {
  const { budgetState } = useBudget();

  const isEmpty = useMemo(
    () => budgetState.expenses.length === 0,
    [budgetState.expenses]
  );

  const selectedExpenses = useMemo(() => {
    return budgetState.selectedCategory
      ? budgetState.expenses.filter(
          (expense) => expense.category === budgetState.selectedCategory
        )
      : budgetState.expenses;
  }, [budgetState.selectedCategory, budgetState.expenses]);

  return isEmpty ? (
    <p className="mt-10 text-center text-gray-600 text-xl font-bold">
      no hay gastos registrados aún...
    </p>
  ) : (
    selectedExpenses.map((expense) => (
      <div key={expense.id}>
        <ExpenseDetail expense={expense}></ExpenseDetail>
      </div>
    ))
  );
};

import { useEffect, useMemo } from "react";
import { BudgetForm } from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterByCategory } from "./components/FilterByCategory";

function App() {
  const { budgetState } = useBudget();
  const isValidBudget = useMemo(
    () => budgetState.budget > 0,
    [budgetState.budget]
  );

  useEffect(() => {
    localStorage.setItem("budgetState", JSON.stringify(budgetState));
  }, [budgetState]);

  return (
    <>
      <header className="py-7 max-h-72 bg-indigo-500">
        <h1 className="uppercase text-white font-black text-2xl text-center">
          Control de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-5 md:mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;

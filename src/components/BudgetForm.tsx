import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { budgetDispatch } = useBudget();
  const isValid = useMemo(() => !isNaN(budget) && budget > 0, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    budgetDispatch({ type: "set-budget", payload: { budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-2xl text-indigo-500 font-extrabold text-center uppercase"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border rounded-md border-gray-200 p-2"
          name="budget"
          placeholder="Define tu presupuesto"
          value={budget}
          onChange={(e) => setBudget(+e.target.value)}
        />
        <input
          type="submit"
          className="bg-indigo-500 enabled:hover:bg-indigo-600 cursor-pointer w-full p-2 text-white font-black uppercase disabled:bg-indigo-200"
          value="Continuar"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const BudgetTracker = () => {
  const { budgetState, budgetDispatch, expended } = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={(expended / budgetState.budget) * 100}
          text={`${((expended / budgetState.budget) * 100).toFixed(2)}%`}
          styles={buildStyles({
            pathColor:
              expended / budgetState.budget == 1 ? "#6366f1" : "#3b82f6",
            trailColor: "#f5f5f5",
            textColor:
              expended / budgetState.budget == 1 ? "#6366f1" : "#3b82f6",
          })}
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-8">
        <button
          type="button"
          className="bg-pink-500 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => budgetDispatch({ type: "reset-expense" })}
        >
          Resetear App
        </button>
        <div className="space-y-3">
          <AmountDisplay label="Presupuesto" amount={budgetState.budget} />
          <AmountDisplay
            label="Disponible"
            amount={budgetState.budget - expended}
          />
          <AmountDisplay label="Gastado" amount={expended} />
        </div>
      </div>
    </div>
  );
};

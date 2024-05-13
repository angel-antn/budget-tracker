import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { useEffect, useState } from "react";
import { DraftExpense } from "../interfaces/Expense";
import { DateValue } from "../interfaces/DateValue";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const { budgetDispatch, budgetState, expended } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [prevExpense, setPrevExpense] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    if (budgetState.editingId) {
      const toEditExpense = budgetState.expenses.find(
        (currentExpense) => currentExpense.id === budgetState.editingId
      )!;

      setPrevExpense(toEditExpense.amount);
      setExpense(toEditExpense);
    }
  }, [budgetState.editingId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    type: "number" | "text"
  ) => {
    setExpense({
      ...expense,
      [e.target.name]: type == "number" ? +e.target.value : e.target.value,
    });
  };

  const handleChangeDate = (value: DateValue) =>
    setExpense({ ...expense, date: value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Hay campos obligatorios sin rellenar");
      return;
    }

    if (expended - prevExpense + expense.amount > budgetState.budget) {
      setError("Este gasto se sale del presupuesto");
      return;
    }

    if (budgetState.editingId) {
      budgetDispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: budgetState.editingId } },
      });
    } else {
      budgetDispatch({ type: "add-expense", payload: { expense } });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-indigo-500">
        {budgetState.editingId ? "Editar gasto" : "Nuevo gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Agrega el nombre del gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={(e) => handleChange(e, "text")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Agrega la cantidad del gasto"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={(e) => handleChange(e, "number")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          value={expense.category}
          onChange={(e) => handleChange(e, "text")}
          id="category"
          name="category"
          className="bg-slate-100 p-2"
        >
          <option value="">--Seleccione--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChangeDate}
          className="p-2 bg-slate-100 border-0"
        />
      </div>

      <input
        type="submit"
        className="bg-indigo-500 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={budgetState.editingId ? "Editar gasto" : "Registrar gasto"}
      />
    </form>
  );
};

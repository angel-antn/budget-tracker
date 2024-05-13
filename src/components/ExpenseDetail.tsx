import { useMemo } from "react";
import { Expense } from "../interfaces/Expense";
import { formatDate } from "../utils/formatDate";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

interface ExpenseDetailProps {
  expense: Expense;
}

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { budgetDispatch } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((category) => category.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          budgetDispatch({
            type: "get-expense-by-id",
            payload: { id: expense.id },
          });
        }}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          budgetDispatch({
            type: "delete-expense",
            payload: { id: expense.id },
          });
        }}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className="shadow-md">
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className=" bg-white p-10 w-full border-b border-gray-200 flex gap-5 items-center ">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt={categoryInfo.name}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

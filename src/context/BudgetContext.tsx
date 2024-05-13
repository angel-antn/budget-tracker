import { ReactNode, createContext, useMemo, useReducer } from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budgetReducer";

interface budgetContextProps {
  budgetState: BudgetState;
  budgetDispatch: React.Dispatch<BudgetActions>;
  expended: number;
}

export const BudgetContext = createContext<budgetContextProps>(null!);

interface budgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider = ({ children }: budgetProviderProps) => {
  const [budgetState, budgetDispatch] = useReducer(budgetReducer, initialState);

  const expended = useMemo(
    () =>
      budgetState.expenses.reduce((acum, expense) => acum + expense.amount, 0),
    [budgetState.expenses]
  );

  return (
    <BudgetContext.Provider value={{ budgetState, budgetDispatch, expended }}>
      {children}
    </BudgetContext.Provider>
  );
};

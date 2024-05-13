import { DateValue } from "./DateValue";

export interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: DateValue;
}

export type DraftExpense = Omit<Expense, "id">;

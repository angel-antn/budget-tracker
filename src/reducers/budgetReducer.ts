import { Category } from "../interfaces/Category";
import { DraftExpense, Expense } from "../interfaces/Expense";
import { v4 as uuidv4 } from "uuid";

interface SetBugetAction {
  type: "set-budget";
  payload: { budget: number };
}

interface ShowModalAction {
  type: "show-modal";
}

interface AddExpenseAction {
  type: "add-expense";
  payload: { expense: DraftExpense };
}

interface DeleteExpenseAction {
  type: "delete-expense";
  payload: { id: Expense["id"] };
}

interface GetExpenseByIdAction {
  type: "get-expense-by-id";
  payload: { id: Expense["id"] };
}

interface UpdateExpenseAction {
  type: "update-expense";
  payload: { expense: Expense };
}

interface ResetExpenseAction {
  type: "reset-expense";
}

interface AddFilterCategoryAction {
  type: "add-filter-category-action";
  payload: { category: string };
}

export type BudgetActions =
  | SetBugetAction
  | ShowModalAction
  | AddExpenseAction
  | DeleteExpenseAction
  | GetExpenseByIdAction
  | UpdateExpenseAction
  | ResetExpenseAction
  | AddFilterCategoryAction;

export interface BudgetState {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  selectedCategory: Category["id"];
}

const getStoragedState = (): BudgetState | undefined => {
  const storagedState = localStorage.getItem("budgetState");
  if (!storagedState) return undefined;
  return JSON.parse(storagedState);
};

const emptyState: BudgetState = {
  budget: 0,
  showModal: false,
  expenses: [],
  editingId: "",
  selectedCategory: "",
};

export const initialState: BudgetState = getStoragedState() ?? emptyState;

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case "set-budget": {
      return { ...state, budget: action.payload.budget };
    }
    case "show-modal": {
      const { showModal } = state;
      return { ...state, showModal: !showModal, editingId: "" };
    }
    case "add-expense": {
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload.expense, id: uuidv4() },
        ],
        showModal: false,
      };
    }
    case "delete-expense": {
      const expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return { ...state, expenses };
    }
    case "get-expense-by-id": {
      return { ...state, editingId: action.payload.id, showModal: true };
    }
    case "update-expense": {
      return {
        ...state,
        showModal: false,
        expenses: state.expenses.map((currentExpense) => {
          if (currentExpense.id === state.editingId)
            return action.payload.expense;
          else return currentExpense;
        }),
      };
    }
    case "reset-expense": {
      return emptyState;
    }
    case "add-filter-category-action": {
      return { ...state, selectedCategory: action.payload.category };
    }
    default: {
      return state;
    }
  }
};

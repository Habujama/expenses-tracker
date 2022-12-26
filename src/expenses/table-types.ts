export type Order = "asc" | "desc";

export enum SelectValues {
  EXPENSE = "Expense",
  REVENUE = "Revenue",
}

export type ExpenseFormValues = {
  description: string;
  amount: number;
  select: SelectValues;
  id: number;
};

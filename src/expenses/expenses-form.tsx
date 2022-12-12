import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";

import { ExpenseFormValues, SelectValues } from "./table-types";

const createData = (
  description: string,
  amount: number,
  select: SelectValues
) => {
  return {
    amount,
    description,
    select,
  };
};

interface ExpensesFormProps {
  user: string | null;
  setHasUpdated: (hasUpdated: boolean) => void;
  hasUpdated: boolean;
}

const ExpensesForm = ({
  user,
  setHasUpdated,
  hasUpdated,
}: ExpensesFormProps) => {
  const [isExpense, setIsExpense] = useState<SelectValues>(
    SelectValues.EXPENSE
  );

  const { register, handleSubmit } = useForm<ExpenseFormValues>();

  const handleChange = (value: string | SelectValues) => {
    if (value === "Expense") {
      setIsExpense(SelectValues.EXPENSE);
      return;
    } else {
      return setIsExpense(SelectValues.REVENUE);
    }
  };

  const onSubmit: SubmitHandler<ExpenseFormValues> = (data) => {
    const dataFromStorage = localStorage.getItem("rows");

    let localData: ExpenseFormValues[] = dataFromStorage
      ? JSON.parse(dataFromStorage)
      : [];

    const newData = createData(data.description, data.amount, data.select);
    localData.unshift(newData);

    setHasUpdated(!hasUpdated);

    return localStorage.setItem("rows", JSON.stringify(localData));
  };

  return (
    <form
      method="POST"
      className="grid grid-cols-1 grid-rows-4 gap-y-4 pr-8 md:flex md:flex-row md:space-x-4  md:items-center my-6 md:my-12"
    >
      <FormControl>
        <InputLabel htmlFor="description">Description</InputLabel>
        <OutlinedInput
          id="description"
          type="text"
          label="Description"
          required
          {...register("description")}
          fullWidth
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
          id="amount"
          type="number"
          label="Amount"
          required
          {...register("amount")}
          fullWidth
        />
      </FormControl>
      <FormControl>
        <Select
          id="expense-select"
          value={isExpense}
          {...register("select")}
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
        >
          <MenuItem value={SelectValues.EXPENSE}>
            {SelectValues.EXPENSE}
          </MenuItem>
          <MenuItem value={SelectValues.REVENUE}>
            {SelectValues.REVENUE}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="secondary"
          variant="contained"
          type="submit"
          disabled={!user}
        >
          Add entry
        </Button>
      </FormControl>
    </form>
  );
};
export default ExpensesForm;

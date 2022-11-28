import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import Navbar from "../navbar";
import Table from "./table";

const Expenses = () => {
  const [isExpense, setIsExpense] = useState("Expense");
  console.log(isExpense);

  const handleChange = (event: SelectChangeEvent) => {
    setIsExpense(event.target.value);
  };
  return (
    <div className="App-base">
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-4 my-4 items-center">
          <FormControl>
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              id="description"
              type="text"
              label="Description"
              onChange={() => console.log("add")}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              type="number"
              label="Amount"
              onChange={() => console.log("add")}
            />
          </FormControl>
          <FormControl>
            <Select
              id="expense-select"
              value={isExpense}
              onChange={handleChange}
            >
              <MenuItem value={"Expense"}>Expense</MenuItem>
              <MenuItem value={"Revenue"}>Revenue</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Button
              onClick={() => {
                console.log("add expenses");
              }}
            >
              Add expenses
            </Button>
          </FormControl>
        </div>
        <Table />
      </div>
    </div>
  );
};
export default Expenses;

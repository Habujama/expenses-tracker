import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import Paper from "@mui/material/Paper";

import { ExpenseFormValues } from "./table-types";
ChartJS.register(...registerables);

interface ExpensesChartProps {
  hasUpdated: boolean;
}

const ExpensesChart = ({ hasUpdated }: ExpensesChartProps) => {
  let rowsFromLocalStorage = localStorage.getItem("rows");
  let rows = !!rowsFromLocalStorage ? JSON.parse(rowsFromLocalStorage) : [];

  const values = rows.map((row: ExpenseFormValues) => {
    return row.select === "Revenue" ? row.amount : -row.amount;
  });

  const revenuesOnly = rows.filter(
    (value: ExpenseFormValues) => value.select === "Revenue"
  );
  const maxRevenueValue =
    revenuesOnly.length > 0
      ? Math.max(
          ...revenuesOnly.map((value: ExpenseFormValues) => {
            return value.amount;
          })
        )
      : 10;

  const maxValue =
    Math.ceil(maxRevenueValue / 100) * 100 + maxRevenueValue / 10;

  const expensesOnly = rows.filter(
    (value: ExpenseFormValues) => value.select === "Expense"
  );
  const maxExpenseValue =
    expensesOnly.length > 0
      ? Math.max(
          ...expensesOnly.map((value: ExpenseFormValues) => {
            return value.amount;
          })
        )
      : 10;
  const minValue =
    Math.ceil(maxExpenseValue / 100) * 100 + maxExpenseValue / 10;

  const labels = rows.map((row: ExpenseFormValues) => {
    return row.description;
  });

  const structuredData = {
    labels: labels,
    datasets: [
      {
        label: "Revenues and expenses",
        data: values,
        backgroundColor: function (context: {
          dataIndex: any;
          dataset: { data: { [x: string]: any } };
        }) {
          const index = context.dataIndex;
          const value = context.dataset.data[index];
          return value < 0 ? "#9c27b0" : "#0284c7";
        },
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-2 md:p-0 mb-8">
      <Paper className="pt-8 px-6 pb-6">
        <Bar
          data={structuredData}
          height={300}
          width={600}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    if (Math.sign(Number(context.formattedValue)) === 1) {
                      return `Revenue ${context.formattedValue}`;
                    } else return `Expense ${context.formattedValue}`;
                  },
                },
              },
            },
            maintainAspectRatio: false,
            elements: {
              bar: {
                borderRadius: 3,
              },
            },
            scales: {
              y: {
                min: -minValue,
                max: maxValue,
                ticks: {
                  callback: (value) => {
                    return Math.round(Number(value));
                  },
                },
              },
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default ExpensesChart;

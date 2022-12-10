import "../App.css";
import { v4 } from "uuid";

import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Data } from "./table-types";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Amount",
  },

  {
    id: "expense",
    numeric: false,
    disablePadding: false,
    label: "Expense/Revenue",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={v4()}
            align={headCell.id === "description" ? "left" : "right"}
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;

import { useState, MouseEvent, ChangeEvent } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import "../App.css";
import EnhancedTableHead from "./table-head";
import EnhancedTableToolbar from "./table-tooolbar";
import { ExpenseFormValues, SelectValues } from "./table-types";

interface EnhancedTableProps {
  setHasUpdated: (hasUpdated: boolean) => void;
  hasUpdated: boolean;
}

export default function EnhancedTable({
  setHasUpdated,
  hasUpdated,
}: EnhancedTableProps) {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  let rowsFromLocalStorage = localStorage.getItem("rows");

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const rows = rowsFromLocalStorage ? JSON.parse(rowsFromLocalStorage) : null;

  const emptyRows =
    rows && page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box className="overflow-x-scroll p-2">
      <Paper className="w-fit mx-auto p-1 md:p-8">
        <EnhancedTableToolbar
          selected={selected}
          rowsFromLocalStorage={rows}
          hasUpdated={hasUpdated}
          setHasUpdated={setHasUpdated}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead />
            <TableBody>
              {rows ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: ExpenseFormValues, index: number) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={
                          row.select === SelectValues.EXPENSE
                            ? "bg-red-100"
                            : "bg-sky-100"
                        }
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align="left"
                        >
                          {row.description}
                        </TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">
                          {row.select === SelectValues.EXPENSE
                            ? SelectValues.EXPENSE
                            : SelectValues.REVENUE}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {rows && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}

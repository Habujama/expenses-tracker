import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ExpenseFormValues } from "./table-types";

interface EnhancedTableToolbarProps {
  selected: readonly number[];
  rowsFromLocalStorage: ExpenseFormValues[];
  setHasUpdated: (hasUpdated: boolean) => void;
  hasUpdated: boolean;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selected, rowsFromLocalStorage, setHasUpdated, hasUpdated } = props;

  let numSelected = selected.length;

  const handleDelete = () => {
    const rows = rowsFromLocalStorage;
    selected.map((selectedItemId) => {
      const objWithIdIndex = rows.findIndex((obj) => obj.id === selectedItemId);

      if (objWithIdIndex > -1) {
        rows.splice(objWithIdIndex, 1);
      }
      localStorage.setItem("rows", JSON.stringify(rows));

      setHasUpdated(!hasUpdated);
      numSelected = 0;

      return rows;
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Revenue and Expenses
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;

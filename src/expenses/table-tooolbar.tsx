import { useEffect, useState } from "react";

import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpenseFormValues } from "./table-types";

interface EnhancedTableToolbarProps {
  selected: readonly number[];
  setSelected: (selected: number[]) => void;
  rowsFromLocalStorage: ExpenseFormValues[];
  setHasUpdated: (hasUpdated: boolean) => void;
  hasUpdated: boolean;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    selected,
    setSelected,
    rowsFromLocalStorage,
    setHasUpdated,
    hasUpdated,
  } = props;
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  useEffect(() => {
    setSelectedNumber(selected.length);
  }, [selected.length]);

  const handleDelete = () => {
    const rows = rowsFromLocalStorage;
    selected.map((selectedItemId) => {
      const objWithIdIndex = rows.findIndex((obj) => obj.id === selectedItemId);

      if (objWithIdIndex > -1) {
        rows.splice(objWithIdIndex, 1);
      }
      localStorage.setItem("rows", JSON.stringify(rows));

      setHasUpdated(!hasUpdated);
      setSelected([]);
      setSelectedNumber(0);

      return rows;
    });
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedNumber > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedNumber > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedNumber} selected
        </Typography>
      )}
      {selectedNumber > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;

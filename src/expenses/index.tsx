import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import Navbar from "../navbar";
import Table from "./table";
import ExpensesForm from "./expenses-form";
import { useUser } from "../hooks/UseUser";

const Expenses = () => {
  const user = useUser();
  const [hasUpdated, setHasUpdated] = useState(false);

  return (
    <div className="App-base">
      <Navbar user={user} />
      <div className="w-screen mx-4">
        {user ? (
          <>
            <ExpensesForm
              user={user}
              setHasUpdated={setHasUpdated}
              hasUpdated={hasUpdated}
            />
            <Table hasUpdated={hasUpdated} setHasUpdated={setHasUpdated} />
          </>
        ) : (
          <div className="flex h-screen items-center justify-center">
            <AutoAwesomeIcon
              sx={{ color: "hotpink", fontSize: 250 }}
              className="transform motion-safe:hover:animate-[ping_5s_ease-in-out_infinite]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Expenses;

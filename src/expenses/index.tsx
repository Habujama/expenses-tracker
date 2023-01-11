import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import Navbar from "../navbar";
import Table from "./table";
import ExpensesForm from "./expenses-form";
import { useUser } from "../hooks/UseUser";
import ExpensesChart from "./expenses-chart";

const Expenses = () => {
  const user = useUser();
  const [hasUpdated, setHasUpdated] = useState(false);

  return (
    <div className="App-base">
      <Navbar user={user} />
      <div className="px-4">
        {user ? (
          <>
            <ExpensesForm
              user={user}
              setHasUpdated={setHasUpdated}
              hasUpdated={hasUpdated}
            />
            <div className="flex md:flex-col flex-col-reverse md:items-center md:justify-center mb-20">
              <ExpensesChart hasUpdated={hasUpdated} />
              <Table hasUpdated={hasUpdated} setHasUpdated={setHasUpdated} />
            </div>
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

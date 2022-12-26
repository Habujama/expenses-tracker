import { useState } from "react";

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
        <ExpensesForm
          user={user}
          setHasUpdated={setHasUpdated}
          hasUpdated={hasUpdated}
        />
        <Table hasUpdated={hasUpdated} setHasUpdated={setHasUpdated} />
      </div>
    </div>
  );
};
export default Expenses;

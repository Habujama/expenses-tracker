import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./login";
import Expenses from "./expenses";
import { useUser } from "./hooks/UseUser";

const AppRouter = () => {
  const user = useUser();
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {!user && <Route path="/" element={<Login />} />}
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

const App = () => <AppRouter />;

export default App;

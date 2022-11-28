import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import useAuth, { AuthProvider } from "./context";
import Login from "./login";
import Expenses from "./expenses";

const AppRouter = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const App = () => <AppRouter />;

export default App;

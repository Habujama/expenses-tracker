import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { useUser } from "../hooks/UseUser";

const Navbar = () => {
  const user = useUser();
  console.log(user);

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/", { replace: true });
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  return (
    <header className="sticky top-0 flex items-center justify-between bg-sky-50 w-full h-20 py-4 px-10 shadow-md">
      {user ? (
        <>
          <p className="mr-4 text-sm font-bold">Hello, {user}!</p>
          <Button variant="contained" onClick={handleOnClick}>
            Log me out
          </Button>
        </>
      ) : (
        <>
          <p className="mr-4 text-sm font-bold">To add data, please log-in.</p>
          <Button variant="contained" onClick={handleOnClick}>
            Log in
          </Button>
        </>
      )}
    </header>
  );
};

export default Navbar;

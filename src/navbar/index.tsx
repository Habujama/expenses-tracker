import Button from "@mui/material/Button";

import useAuth from "../context";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 flex justify-end bg-sky-50 w-full h-20 py-4 px-10 shadow-md">
      <Button variant="contained" onClick={logout}>
        Log me out
      </Button>
    </header>
  );
};

export default Navbar;

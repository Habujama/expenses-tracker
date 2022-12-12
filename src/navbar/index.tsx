import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

interface NavbarProps {
  user: string | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/", { replace: true });
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  const buttonCss = "whitespace-nowrap";

  return (
    <header className="sticky top-0 flex items-center justify-between bg-sky-50 w-full h-20 py-4 px-10 shadow-md">
      {user ? (
        <>
          <p className="mr-4 text-sm font-bold">Hello, {user}!</p>
          <Button
            variant="contained"
            onClick={handleOnClick}
            className={buttonCss}
          >
            Log me out
          </Button>
        </>
      ) : (
        <>
          <p className="mr-4 text-sm font-bold">
            To add data, please log&nbsp;in.
          </p>
          <Button
            variant="contained"
            onClick={handleOnClick}
            className={buttonCss}
          >
            Log in
          </Button>
        </>
      )}
    </header>
  );
};

export default Navbar;

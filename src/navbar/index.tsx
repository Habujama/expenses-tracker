import Button from "@mui/material/Button";

const Navbar = () => (
  <header className="sticky top-0 flex justify-end bg-sky-50 w-full h-20 py-4 px-10 shadow-md">
    <Button href="/" variant="contained">
      Log me out
    </Button>
  </header>
);

export default Navbar;

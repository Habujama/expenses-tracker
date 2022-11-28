import "../App.css";

import { useState } from "react";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

function Login() {
  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <div className="App-base items-center justify-center">
        <AttachMoneyOutlinedIcon
          sx={{ fontSize: 250 }}
          className="transform animate-pulse text-sky-600"
        />
        <p className="pb-10">Log in to track your expenses!</p>
        <div className="flex flex-col space-y-6">
          <FormControl>
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <OutlinedInput
              id="username"
              type="text"
              label="Your username"
              name="username"
              onChange={handleChange("username")}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              label="Your password"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            href="/expenses"
            onClick={() => {
              console.log("login");
            }}
            variant="contained"
          >
            Log me in!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

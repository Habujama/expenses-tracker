import "../App.css";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

type LoginFormValues = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginFormValues>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    navigate("/expenses", { replace: true });
  };

  return (
    <div className="Login">
      <div className="App-base items-center justify-center">
        <AttachMoneyOutlinedIcon
          sx={{ fontSize: 250 }}
          className="transform animate-pulse text-sky-600"
        />
        <p className="pb-10">Log&nbsp;in to track your expenses!</p>
        <form method="POST" className="flex flex-col space-y-6">
          <FormControl>
            <InputLabel htmlFor="outlined-email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="text"
              label="Your email"
              autoComplete="email"
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Your password"
              autoComplete="password"
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
          >
            Log me in!
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

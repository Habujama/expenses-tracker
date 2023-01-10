import "../App.css";

import { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type LoginFormValues = {
  email: string;
  password: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] =
    useState<boolean>(false);
  const [hasErrored, setHasErrored] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
      setSubmittedSuccessfully(true);
    } catch (e) {
      console.error(e);
      setSubmittedSuccessfully(false);
      return setHasErrored(true);
    } finally {
      await setTimeout(() => {
        setIsSubmitting(false);
        navigate("/expenses", { replace: true });
      }, 1000);
    }
  };

  useEffect(() => {
    if (submittedSuccessfully) {
      reset();
    }
  }, [submittedSuccessfully, reset]);

  return (
    <div className="Login">
      <div className="App-base items-center justify-center">
        <AttachMoneyOutlinedIcon
          sx={{ fontSize: 250 }}
          className="transform animate-pulse text-sky-600"
        />
        <p className="pb-10">Log&nbsp;in to track your expenses!</p>
        <form method="POST" className="flex flex-col">
          <FormControl>
            <InputLabel htmlFor="outlined-email">Email</InputLabel>
            <OutlinedInput
              id="email"
              type="text"
              label="Your email"
              autoComplete="email"
              {...register("email", {
                required: true,
                pattern:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]*@[a-z0-9!#$%&'*+/=?^_`{|}~-]*\.[a-z]{2,3}/,
              })}
            />

            <span className="text-sm text-red-500 p-1 h-3 mb-6">
              {errors.email?.type === "required" && "This field is required."}
              {errors.email?.type === "pattern" && "This is not a valid email."}
            </span>
          </FormControl>
          <FormControl className="pt-6">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Your password"
              autoComplete="password"
              {...register("password", {
                required: true,
              })}
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
            <span className="text-sm text-red-500 p-1 h-6 mb-8">
              {errors.password?.type === "required" && "This field is required"}
            </span>
          </FormControl>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-4">
                <CircularProgress
                  sx={{
                    position: "absolute",
                    left: "43%",
                  }}
                />
                Logging you in...
              </div>
            ) : (
              "Log me in!"
            )}
          </Button>
          {hasErrored && (
            <p className="text-sm text-red-500 p-1 mt-2">
              Something went wrong. Please try again in a minute.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;

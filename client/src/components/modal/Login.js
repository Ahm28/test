import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

export default function Login() {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = React.useContext(UserContext);
  const [showPassword, setShowPassword] = React.useState(false);

  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email } = form;

  const handleChange = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      console.log(response);

      if (response?.status == 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }
      setForm({
        email: "",
        password: "",
      });

      navigate("/resume");
    } catch (error) {
      const alert = (
        <Alert severity="error">Email and Password not Match</Alert>
      );
      setForm({
        email: "",
        password: "",
      });
      setMessage(alert);
      console.log(error);
    }
  };

  console.log(state);

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {message && message}

        <FormControl variant="standard" sx={{ width: "100%", mt: 3, mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            id="input-with-icon-adornment"
            placeholder="Type Your Email"
            name="email"
            value={email}
            onChange={handleChange("email")}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mb: 1 }} variant="standard">
          <InputLabel htmlFor="input-adornment-password">Password</InputLabel>
          <Input
            id="input-adornment-password"
            placeholder="Type Your Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            name="password"
            onChange={handleChange("password")}
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
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
        <Link to="/forget" style={{ color: "#808e9b", textDecoration: "none" }}>
          <Typography sx={{ mb: 3 }} textAlign="end">
            Forgot Password?
          </Typography>
        </Link>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
            height: "50px",
            borderRadius: "20px",
            background: "#a64bf4",
            color: "white",
            transition: "all 0.4s",
            "&:hover": {
              background: "#972cf4",
              transition: "all 0.4s",
            },
          }}
        >
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}

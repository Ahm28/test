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
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { API } from "../../config/api";

export default function Register() {
  const [message, setMessage] = React.useState(null);
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const { username, email, password } = form;

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

      const response = await API.post("/register", body, config);

      if (response.data.status == "Success Add User") {
        const alert = <Alert severity="info">Success Register</Alert>;
        setMessage(alert);
      } else {
        const alert = <Alert severity="warning">Email has Declared</Alert>;
        setMessage(alert);
      }
      setForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const alert = <Alert severity="error">Please try another email</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {message && message}
        <FormControl variant="standard" sx={{ width: "100%", mt: 3, mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-username">
            Username
          </InputLabel>
          <Input
            id="input-with-icon-adornment-username"
            placeholder="Type Your Username"
            name="username"
            value={username}
            onChange={handleChange("username")}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "100%", mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-email">
            Email
          </InputLabel>
          <Input
            id="input-with-icon-adornment-email"
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
        <FormControl sx={{ width: "100%", mb: 4 }} variant="standard">
          <InputLabel htmlFor="input-adornment-password">Password</InputLabel>
          <Input
            id="input-adornment-password"
            placeholder="Type Your Password"
            type={showPassword ? "text" : "password"}
            value={password}
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
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
          Register
        </Button>
      </Box>
    </Box>
  );
}

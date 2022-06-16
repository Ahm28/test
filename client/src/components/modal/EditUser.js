import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [formUser, setFormUser] = React.useState({
    username: "",
    email: "",
  });

  const { username, email } = formUser;

  const getUser = async () => {
    try {
      const response = await API.get("/user");
      const responseData = response.data.data.data;
      setFormUser(responseData);
      setUser(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const handleChangeUser = (props) => (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  const hndleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(formUser);

      const res = await API.patch("/user/" + user.id, body, config);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Edit User
      </Typography>

      <Box component="form" onSubmit={hndleSubmit}>
        <FormControl variant="standard" sx={{ width: "100%", mt: 3, mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-username">
            Username
          </InputLabel>
          <Input
            id="input-with-icon-adornment-username"
            placeholder="Type Your Username"
            name="username"
            value={username}
            onChange={handleChangeUser("username")}
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
            onChange={handleChangeUser}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
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
          Edit User
        </Button>
      </Box>
    </Box>
  );
}

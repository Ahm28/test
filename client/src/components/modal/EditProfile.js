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

export default function EditProfile() {
  let navigate = useNavigate();

  const [profile, setProfile] = React.useState({});

  const [formProfile, setFormProfile] = React.useState({
    name: "",
    address: "",
    dateOfBirthDay: null,
  });

  const { name, address, dateOfBirthDay } = formProfile;

  const getUser = async () => {
    try {
      const response = await API.get("/user");
      const responseData = response.data.data.data;

      console.log(responseData);
      if (responseData.profile != null) {
        setFormProfile({
          name: responseData.profile.name,
          address: responseData.profile.address,
          dateOfBirthDay: responseData.profile.dateOfBirthDay,
        });
        setProfile(responseData.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const handleChangeProfile = (e) => {
    setFormProfile({
      ...formProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(formProfile);

      const res = await API.patch("/profile", body, config);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Edit Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <FormControl variant="standard" sx={{ width: "100%", mt: 3, mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-username">
            Name
          </InputLabel>
          <Input
            id="input-with-icon-adornment-username"
            placeholder="Type Your Nickname"
            name="name"
            value={name}
            onChange={handleChangeProfile}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "100%", mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-email">
            Address
          </InputLabel>
          <Input
            id="input-with-icon-adornment-email"
            placeholder="Type Your Address"
            name="address"
            value={address}
            onChange={handleChangeProfile}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: "100%", mb: 4 }}>
          <InputLabel htmlFor="input-with-icon-adornment-email">
            Birth Day
          </InputLabel>
          <Input
            id="input-with-icon-adornment-email"
            placeholder="Chose Your birthday"
            type="date"
            name="dateOfBirthDay"
            value={dateOfBirthDay}
            onChange={handleChangeProfile}
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

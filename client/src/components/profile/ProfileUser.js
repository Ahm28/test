import { Fade, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { API } from "../../config/api";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Backdrop from "@mui/material/Backdrop";
import EditUser from "../modal/EditUser";
import EditProfile from "../modal/EditProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ProfileUser() {
  const [user, setUser] = React.useState({});

  const [modalEditUser, setEditUser] = React.useState(false);
  const [modalEditProfile, setEditProfile] = React.useState(false);

  const getUser = async () => {
    try {
      const response = await API.get("/user");
      setUser(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Grid item xs={7}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Change User
          </Typography>
          <Box
            sx={{ display: "flex", cursor: "pointer" }}
            onClick={() => setEditUser(true)}
          >
            <BorderColorOutlinedIcon />
            <Typography>Change User</Typography>
          </Box>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalEditUser}
            onClose={() => setEditUser(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modalEditUser}>
              <Box sx={style}>
                <EditUser dataUser={user} />
              </Box>
            </Fade>
          </Modal>
        </Box>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={3}>
            <Typography>Username</Typography>
            <Typography>Email</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ mr: 2 }}>{user.username}</Typography>
            <Typography sx={{ mr: 2 }}>{user.email} </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Change Profile
          </Typography>

          <Box
            sx={{ display: "flex", cursor: "pointer" }}
            onClick={() => setEditProfile(true)}
          >
            <BorderColorOutlinedIcon />
            <Typography>Change Profile</Typography>
          </Box>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalEditProfile}
            onClose={() => setEditProfile(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modalEditProfile}>
              <Box sx={style}>
                <EditProfile />
              </Box>
            </Fade>
          </Modal>
        </Box>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={3}>
            <Typography>name</Typography>
            <Typography sx={{ my: 2 }}>address</Typography>
            <Typography>BirthDay</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ mr: 2 }}>
              {user
                ? user.profile == null
                  ? "Name is Empty"
                  : user.profile.name
                : ""}
            </Typography>

            <Typography sx={{ mr: 2, my: 2 }}>
              {user
                ? user.profile == null
                  ? "Address is Empty"
                  : user.profile.address
                : ""}
            </Typography>

            <Typography sx={{ mr: 2 }}>
              {user
                ? user.profile == null
                  ? "Birthday is Empty"
                  : user.profile.dateOfBirthday
                : ""}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

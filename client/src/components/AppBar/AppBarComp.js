import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Login from "../modal/Login";
import Register from "../modal/Register";
import { setAuthToken } from "../../config/api";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: "10px",
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AppBarComp = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [modalRegister, setModalRegister] = React.useState(false);
  const [state, dispatch] = React.useContext(UserContext);

  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const isLogin = () => {
    return (
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mr: 2 }}>
          <ShoppingBagOutlinedIcon fontSize="large" sx={{ color: "#a64bf4" }} />
        </Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/2.jpg"
              sx={{ border: "2px solid #a64bf4" }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={() => navigate("/profile")}>
              Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={logout}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  const isNotLogin = () => {
    return (
      <Box>
        <Box sx={{ flexGrow: 0 }}>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              background: "#a64bf4",

              color: "white",
              transition: "all 0.4s",
              "&:hover": {
                background: "#972cf4",
                transition: "all 0.4s",
              },
            }}
            onClick={() => setModalLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => setModalRegister(true)}
            sx={{
              borderColor: "#a64bf4",
              color: "black",
              "&:hover": {
                background: "#972cf4",
                color: "white",
                borderColor: "#972cf4",
              },
            }}
          >
            Register
          </Button>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalLogin}
          onClose={() => setModalLogin(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalLogin}>
            <Box sx={style}>
              <Login />
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalRegister}
          onClose={() => setModalRegister(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalRegister}>
            <Box sx={style}>
              <Register />
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  };

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Toolbar disableGutters>
          <ForestOutlinedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#0c090f",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#0c090f",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ForestOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#0c090f", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {localStorage.token ? isLogin() : isNotLogin()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppBarComp;

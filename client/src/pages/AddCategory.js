import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBarComp from "../components/AppBar/AppBarComp";
import { API } from "../config/api";

export default function AddCategory() {
  let navigate = useNavigate();

  const [category, setCategory] = React.useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ name: category });

      await API.post("/category", body, config);
      navigate("/product");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBarComp />
      <Box sx={{ my: 2 }}>
        <Container>
          <div
            role="presentation"
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/")}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/product")}
              >
                Product
              </Link>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate("/add-product")}
              >
                Add Product
              </Link>
              <Typography color="text.primary">Add Category</Typography>
            </Breadcrumbs>
          </div>
          <Box>
            <Typography variant="h4">Add Category</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Name Category"
              name="category"
              value={category}
              variant="outlined"
              sx={{ mt: 7, width: "30%" }}
              onChange={handleChange}
            />
            <br />
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "30%",
                height: "50px",
                background: "#a64bf4",
                mt: 3,
                color: "white",
                transition: "all 0.4s",
                "&:hover": {
                  background: "#972cf4",
                  transition: "all 0.4s",
                },
              }}
            >
              Add Category
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

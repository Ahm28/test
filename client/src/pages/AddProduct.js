import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBarComp from "../components/AppBar/AppBarComp";
import { API } from "../config/api";

export default function AddProduct() {
  let navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  const [form, setForm] = React.useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    desc: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const handelChangeProduct = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    console.log(id);

    if (checked == true) {
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("desc", form.desc);
      formData.set("categoryId", categoryId);

      const response = await API.post("/product", formData, config);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categories);

  console.log(form);
  return (
    <>
      <AppBarComp />
      <Box sx={{ my: 2 }}>
        <Container>
          <Box>
            <Typography variant="h4">Add Product</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mt: 2 }}>
              {preview && (
                <img
                  src={preview}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>

            <Box>
              <FormControl
                variant="standard"
                sx={{ width: "100%", mt: 2, mb: 4 }}
              >
                <InputLabel
                  htmlFor="input-upload"
                  sx={{
                    background: " #a64bf4",
                    color: " white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.3rem",
                    cursor: "pointer",
                    mt: "1rem",
                  }}
                >
                  Upload Image
                </InputLabel>
                <input
                  type="file"
                  id="input-upload"
                  name="image"
                  hidden
                  onChange={handelChangeProduct}
                />
              </FormControl>
            </Box>
            <TextField
              id="outlined-basic"
              label="Name Product"
              name="name"
              value={form.name}
              variant="outlined"
              sx={{ mt: 7, width: "30%" }}
              onChange={handelChangeProduct}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Qty"
              name="qty"
              value={form.qty}
              variant="outlined"
              sx={{ width: "30%", mt: 2 }}
              onChange={handelChangeProduct}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Price"
              name="price"
              value={form.price}
              variant="outlined"
              sx={{ width: "30%", mt: 2 }}
              onChange={handelChangeProduct}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Description"
              name="desc"
              value={form.desc}
              rows={4}
              multiline
              variant="outlined"
              sx={{ width: "30%", mt: 2 }}
              onChange={handelChangeProduct}
            />
            <br />

            <FormGroup sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Add Category</Typography>
                <Button
                  variant="contained"
                  sx={{
                    height: "25px",
                    background: "#a64bf4",
                    mt: 3,
                    color: "white",
                    transition: "all 0.4s",
                    "&:hover": {
                      background: "#972cf4",
                      transition: "all 0.4s",
                    },
                  }}
                  onClick={() => navigate("/add-category")}
                >
                  Add Product
                </Button>
              </Box>
              {categories.map((category) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={category.name}
                  value={category.id}
                  onClick={handleChangeCategoryId}
                />
              ))}
            </FormGroup>
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
              Add Product
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

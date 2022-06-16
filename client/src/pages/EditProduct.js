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
import { useNavigate, useParams } from "react-router-dom";
import AppBarComp from "../components/AppBar/AppBarComp";
import CheckBox from "../components/form/CheckBox";
import { API } from "../config/api";

export default function EditProduct() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [preview, setPreview] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState([]);
  const [product, setProduct] = React.useState([]);

  const [form, setForm] = React.useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    desc: "",
  });

  const getProducts = async (id) => {
    try {
      const response = await API.get(`/product/${id}`);
      console.log(response);
      setPreview(response.data.data.image);
      setForm({
        ...form,
        name: response.data.data.name,
        price: response.data.data.price,
        qty: response.data.data.qty,
        desc: response.data.data.desc,
      });
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProducts(id);
    getCategories();
  }, []);

  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked == true) {
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

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
                  onChange={handleChange}
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
              onChange={handleChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Qty"
              name="qty"
              value={form.qty}
              variant="outlined"
              sx={{ width: "30%", mt: 2 }}
              onChange={handleChange}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Price"
              name="price"
              value={form.price}
              variant="outlined"
              sx={{ width: "30%", mt: 2 }}
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <br />

            <FormGroup sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Add Category</Typography>
              </Box>
              {categories.map((category) => (
                <label class="checkbox-inline me-4">
                  <CheckBox
                    categoryId={categoryId}
                    value={category.id}
                    handleChangeCategoryId={handleChangeCategoryId}
                  />
                  <span className="ms-2">{category.name}</span>
                </label>
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
              Update Product
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

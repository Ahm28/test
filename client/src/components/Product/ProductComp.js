import React from "react";
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/api";

export default function ProductComp() {
  let navigate = useNavigate();

  const [products, setProducts] = React.useState();

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      console.log(response);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <Box sx={{ my: 2 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Our Product</Typography>
          {localStorage.token ? (
            <Box
              sx={{
                py: 1,
                px: 2,
                cursor: "pointer",
                backgroundColor: "#a64bf4",
                display: "flex",
              }}
              onClick={() => navigate("/add-product")}
            >
              <AddOutlinedIcon sx={{ color: "white", mr: 1 }} />
              <Typography textAlign="end" color="white">
                Add Product
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {products
              ? products.map((product) => (
                  <Grid item xs={4}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Box
                        sx={{
                          width: "300px",
                          boxShadow: "10px 10px 32px 0px rgba(0,0,0,0.36)",
                        }}
                      >
                        <img
                          src={product.image}
                          alt="product pict"
                          width="300px"
                        />
                        <Box sx={{ p: 4 }}>
                          <Typography variant="h6" sx={{ mb: 2 }}>
                            {product.name}
                          </Typography>
                          <hr />
                          <Typography sx={{ mt: 2 }}>
                            {product.categories.map(
                              (category) => category.name + " "
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                ))
              : ""}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

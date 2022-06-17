import {
  Backdrop,
  Breadcrumbs,
  Button,
  Container,
  Fade,
  Grid,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBarComp from "../components/AppBar/AppBarComp";
import { API } from "../config/api";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteData from "../components/modal/DeleteData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 5,
  borderRadius: "10px",
};

export default function ProductDetail() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = React.useState({});
  const [modalDelete, setModalDelete] = React.useState(false);
  const [idDelete, setIdDelete] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(null);

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    setModalDelete(true);
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/product/${id}`);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (confirmDelete) {
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  React.useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <>
      <AppBarComp />
      <Box sx={{ my: 4 }}>
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
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>
          </div>

          <Box>
            <Typography variant="h3">{product.name}</Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img src={product.image} alt="product image" width="400px" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Details
                </Typography>

                <Box>
                  <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={4}>
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                        Product Name
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                        Stok
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                        Desc
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                        Price
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ mt: 1 }}>{product.name}</Typography>
                      <Typography sx={{ mt: 1 }}>{product.qty}</Typography>
                      <Typography sx={{ mt: 1 }}>{product.desc}</Typography>
                      <Typography sx={{ mt: 1 }}>{product.price}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                {localStorage.token ? (
                  <Box sx={{ mt: 5 }}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        width: "40%",
                        height: "30px",
                        borderRadius: "10px",
                        color: "white",
                        mr: 2,
                      }}
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      <BorderColorOutlinedIcon
                        sx={{ fontSize: "16px", mr: 1 }}
                      />
                      Edit Product
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        width: "40%",
                        height: "30px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteOutlineOutlinedIcon
                        sx={{ fontSize: "16px", mr: 1 }}
                      />
                      Delete Product
                    </Button>
                  </Box>
                ) : (
                  " "
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalDelete}>
          <Box sx={style}>
            <Typography sx={{ fontSize: "20px", fontWidth: "bold" }}>
              Delete Product
            </Typography>
            <Typography sx={{ fontSize: "16px", mt: 2 }}>
              Are you sure you want to delete this data?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                sx={{ mr: 1 }}
                onClick={() => setConfirmDelete(true)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setModalDelete(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

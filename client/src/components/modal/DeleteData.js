import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function DeleteData({ setConfirmDelete, handleClose }) {
  const handleYes = () => {
    setConfirmDelete(true);
  };
  return (
    <>
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
          onClick={handleYes}
        >
          Yes
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          No
        </Button>
      </Box>
    </>
  );
}

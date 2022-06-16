import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AppBarComp from "../components/AppBar/AppBarComp";

export default function Home() {
  return (
    <>
      <AppBarComp />
      <Box
        sx={{
          backgroundImage:
            "url('https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_1536/cms/92jNySJymy9xnTAGSk6K9/03e7fe16aadb2bf42dc9dca1cffef106/SS22-Core-Homepage-Desktop-TR-02.jpg')",
          backgroundSize: "cover",
          height: "92vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "93vh",
          }}
        >
          <Typography
            variant="h3"
            color="white"
            sx={{ fontWeight: "bold", letterSpacing: "3px" }}
          >
            Made from <span style={{ color: "#b477ea" }}> Trees</span>. Designed
            for <span style={{ color: "#b477ea" }}> Sun.</span>
          </Typography>
          <Typography
            color="white"
            sx={{ fontWeight: "bold", letterSpacing: "3px" }}
          >
            Shop shoes made with{" "}
            <span style={{ fontSize: "24px", color: "#b477ea" }}> light </span>&{" "}
            <span style={{ fontSize: "24px", color: "#b477ea" }}>
              breezy eucalyptus
            </span>{" "}
            tree fiber.
          </Typography>
          <Box sx={{ display: "flex", mt: 5 }}>
            <Box
              sx={{
                width: "150px",
                height: "50px",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 3,
              }}
            >
              <Typography variant="h6">Shop Men</Typography>
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "50px",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Shop Women</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

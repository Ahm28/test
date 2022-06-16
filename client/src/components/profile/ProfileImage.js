import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

export default function ProfileImage() {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <img
            src="https://mui.com/static/images/avatar/2.jpg"
            alt="pict profile"
            width="100%"
          />

          <Box
            sx={{
              mt: 4,
              mb: 2,
              py: 1,
              width: "100%",
              border: "1px solid",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              opacity: ".8",
            }}
          >
            Choose Foto
          </Box>
          <Typography variant="caption" sx={{ opacity: ".6" }}>
            File size: maximum 10,000,000 bytes (10 Megabytes). Allowed file
            extension:.JPG. JPEG.PNG
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

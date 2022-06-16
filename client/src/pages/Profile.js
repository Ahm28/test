import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppBarComp from "../components/AppBar/AppBarComp";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileUser from "../components/profile/ProfileUser";

export default function Profile() {
  return (
    <>
      <AppBarComp />
      <Container>
        <Box sx={{ my: 4 }}>
          <Card sx={{ borderRadius: "10px" }}>
            <CardContent>
              <Box
                sx={{ borderBottom: "2px solid", pb: 2, width: "100px", mb: 4 }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", ml: 1 }}>
                  Profile
                </Typography>
              </Box>

              <Box>
                <Grid container spacing={3}>
                  <ProfileImage />
                  <ProfileUser />
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

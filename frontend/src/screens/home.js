import React from "react";
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardActions, Button, Grid } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import GrassIcon from "@mui/icons-material/Grass";

function Home() {
  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#2E3B55" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Plant Health Detection
          </Typography>
          <Button color="inherit" href="/" sx={{ fontWeight: "bold" }}>
            Home
          </Button>
          <Button color="inherit" href="/leaf" sx={{ fontWeight: "bold" }}>
            Leaf Detection
          </Button>
          <Button color="inherit" href="/soil" sx={{ fontWeight: "bold" }}>
            Soil Detection
          </Button>
        </Toolbar>
      </AppBar>

      {/* Home Page Content */}
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#2E3B55" }}>
          Welcome to Plant Health Detection
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Leaf Detection Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%", // Ensure the card takes full height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <GrassIcon sx={{ fontSize: 60, color: "#4CAF50" }} />
                <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: "bold", color: "#2E3B55" }}>
                  Leaf Detection
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, color: "#555" }}>
                  Detect diseases in plant leaves using advanced AI models.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  variant="contained"
                  href="/leaf"
                  sx={{
                    backgroundColor: "#4CAF50",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#45a049" },
                  }}
                >
                  Go to Leaf Detection
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Soil Detection Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%", // Ensure the card takes full height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <ScienceIcon sx={{ fontSize: 60, color: "#FF5722" }} />
                <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: "bold", color: "#2E3B55" }}>
                  Soil Detection
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, color: "#555" }}>
                  Classify soil types using advanced AI models.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  variant="contained"
                  href="/soil"
                  sx={{
                    backgroundColor: "#FF5722",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#E64A19" },
                  }}
                >
                  Go to Soil Detection
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
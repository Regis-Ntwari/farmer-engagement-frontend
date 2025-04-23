import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/Colors";
import {
  Agriculture,
  LocalShipping,
  TrendingUp,
  Group,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const FeatureCard = ({ icon, title, description }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-8px)",
      },
    }}
  >
    <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.primaryColor,
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            PigFarm Connect
          </Typography>
          <Box>
            <Button
              sx={{
                color: COLORS.primaryColor,
                fontWeight: "bold",
                mr: 2,
              }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: COLORS.primaryColor,
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: COLORS.primaryColorDark,
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1646218460428-c4cab92c89e4')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          pt: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Connect with Pig Farmers Worldwide
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            Share knowledge, Increase production, and Grow your pig farming
            business
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            sx={{
              backgroundColor: COLORS.primaryColor,
              color: "white",
              padding: "12px 32px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: COLORS.primaryColorDark,
              },
            }}
          >
            Join Our Community
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: "bold", color: COLORS.primaryColor }}
        >
          Why Choose PigFarm Connect?
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FeatureCard
              icon={
                <Agriculture
                  sx={{ fontSize: 48, color: COLORS.primaryColor }}
                />
              }
              title="Smart Farming"
              description="Access modern pig farming techniques and best practices from experts worldwide"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FeatureCard
              icon={
                <TrendingUp sx={{ fontSize: 48, color: COLORS.primaryColor }} />
              }
              title="Production Tracking"
              description="Monitor your pig production metrics and optimize your farm's performance"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FeatureCard
              icon={
                <LocalShipping
                  sx={{ fontSize: 48, color: COLORS.primaryColor }}
                />
              }
              title="Market Access"
              description="Connect with buyers and expand your market reach for better profits"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FeatureCard
              icon={<Group sx={{ fontSize: 48, color: COLORS.primaryColor }} />}
              title="Community Support"
              description="Join a network of pig farmers to share experiences and solve challenges"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: COLORS.sectionColor, py: 8 }}>
        <Container>
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: "bold", color: COLORS.primaryColor }}
          >
            What Farmers Say
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: "italic" }}
                  >
                    "PigFarm Connect has transformed how I manage my farm. The
                    production tracking tools are invaluable."
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    John Smith
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Commercial Pig Farmer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: "italic" }}
                  >
                    "The community support is amazing. I've learned so much from
                    other farmers' experiences."
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Sarah Johnson
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Small-scale Pig Farmer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: "italic" }}
                  >
                    "Market access has never been easier. I've doubled my sales
                    since joining."
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Michael Brown
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organic Pig Farmer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: COLORS.primaryColor,
          color: "white",
          py: 4,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                PigFarm Connect
              </Typography>
              <Typography variant="body2">
                Empowering pig farmers with best practices and community support
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Features
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Contact
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Connect With Us
              </Typography>
              <Box>
                <IconButton sx={{ color: "white" }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 4, opacity: 0.8 }}
          >
            &copy; {new Date().getFullYear()} PigFarm Connect. All Rights
            Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

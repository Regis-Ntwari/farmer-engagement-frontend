import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/Colors";

const FloatingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        animationDuration: Math.random() * 5 + 3 + "s",
        animationDelay: Math.random() * 3 + "s",
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <>
      {stars.map((star, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            width: "5px",
            height: "5px",
            backgroundColor: COLORS.whiteColor,
            borderRadius: "50%",
            left: star.left,
            top: star.top,
            opacity: 0.8,
            animation: `floatStar ${star.animationDuration} infinite ease-in-out`,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </>
  );
};

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="white">
            Farmer Connect
          </Typography>
          <div>
            <Button style={{ color: COLORS.yellowColor, fontWeight: "bolder" }}>
              Home
            </Button>
            <Button
              style={{ color: COLORS.whiteColor }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          background: COLORS.primaryColor,
          color: "white",
          textAlign: "center",
        }}
      >
        <FloatingStars />
        <Typography variant="h3" sx={{ animation: "fadeIn 3s ease-in-out" }}>
          Empowering Farmers, Connecting Communities
        </Typography>
        <Button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: COLORS.whiteColor,
            color: COLORS.primaryColor,
            marginTop: 10,
            fontWeight: "bolder",
            fontSize: 16,
          }}
        >
          GET STARTED
        </Button>
      </Box>

      {/* Sections */}
      <Container sx={{ py: 8, backgroundColor: COLORS.sectionColor }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1560493676-04071c5f467b"
              width="100%"
              borderRadius={2}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="h4">Enhancing Productivity</Typography>
            <Typography variant="body1">
              Discover modern farming techniques to increase yield and
              efficiency.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 8, backgroundColor: COLORS.sectionColor, mt: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4">Market Access</Typography>
            <Typography variant="body1">
              Connect directly with buyers and expand your reach.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9"
              width="100%"
              borderRadius={2}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          backgroundColor: COLORS.primaryColor,
          color: COLORS.whiteColor,
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Farmer Connect. All Rights Reserved.
        </Typography>
      </Box>
      <style>
        {`
          @keyframes floatStar {
            0% { transform: translateY(0); opacity: 0.8; }
            50% { transform: translateY(-20px); opacity: 0.5; }
            100% { transform: translateY(0); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

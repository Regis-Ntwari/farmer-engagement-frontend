import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../utils/Colors";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { Facebook, Twitter, Instagram, Agriculture } from "@mui/icons-material";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, setData) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ ...loginData });
  };

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
              onClick={() => navigate("/")}
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

      {/* Login Section */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1646218460428-c4cab92c89e4')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pt: 8,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Agriculture
                  sx={{
                    fontSize: 48,
                    color: COLORS.primaryColor,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: COLORS.primaryColor,
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sign in to access your pig farming community
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="normal"
                variant="outlined"
                value={loginData.username}
                onChange={(e) => handleChange(e, setLoginData)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                name="password"
                variant="outlined"
                value={loginData.password}
                onChange={(e) => handleChange(e, setLoginData)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: COLORS.primaryColor,
                  color: "white",
                  padding: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: COLORS.primaryColorDark,
                  },
                }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "text.secondary" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: COLORS.primaryColor,
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </CardContent>
          </Card>
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

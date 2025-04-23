import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { COLORS } from "../utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import { SECTORS } from "../utils/Locations";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth";
import { toast } from "react-toastify";
import { Facebook, Twitter, Instagram, Agriculture } from "@mui/icons-material";

const steps = ["User Details", "Farm Details"];

const districts = [
  "Gisagara",
  "Huye",
  "Kamonyi",
  "Muhanga",
  "Nyamagabe",
  "Nyanza",
  "Nyaruguru",
  "Ruhango",
  "Karongi",
  "Ngororero",
  "Nyabihu",
  "Nyamasheke",
  "Rubavu",
  "Rusizi",
  "Rutsiro",
  "Bugesera",
  "Gatsibo",
  "Kayonza",
  "Kirehe",
  "Ngoma",
  "Nyagatare",
  "Rwamagana",
  "Burera",
  "Gakenke",
  "Gicumbi",
  "Musanze",
  "Rulindo",
  "Gasabo",
  "Kicukiro",
  "Nyarugenge",
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [farmData, setFarmData] = useState({
    name: "",
    district: "",
    sector: "",
  });

  const [sectors, setSectors] = useState([]);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleChange = (event, setData) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Sign Up successful!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ ...userData, ...farmData });
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
              onClick={() => navigate("/login")}
              sx={{
                color: COLORS.primaryColor,
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Signup Section */}
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
                  Join Our Community
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create your account to connect with pig farmers worldwide
                </Typography>
              </Box>

              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <>
                  <TextField
                    fullWidth
                    label="Firstname"
                    name="firstname"
                    value={userData.firstname}
                    onChange={(e) => handleChange(e, setUserData)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Lastname"
                    name="lastname"
                    value={userData.lastname}
                    onChange={(e) => handleChange(e, setUserData)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={userData.username}
                    onChange={(e) => handleChange(e, setUserData)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={(e) => handleChange(e, setUserData)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </>
              )}

              {activeStep === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="Farm Name"
                    name="name"
                    value={farmData.name}
                    onChange={(e) => handleChange(e, setFarmData)}
                    margin="normal"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <FormControl
                    fullWidth
                    margin="normal"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <InputLabel id="location-label">District</InputLabel>
                    <Select
                      labelId="location-label"
                      name="district"
                      value={farmData.district}
                      onChange={(e) => {
                        handleChange(e, setFarmData);
                        setSectors(SECTORS[e.target.value]);
                      }}
                      label="District"
                    >
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <InputLabel id="location-label-1">Sector</InputLabel>
                    <Select
                      labelId="location-label-1"
                      name="sector"
                      value={farmData.sector}
                      onChange={(e) => {
                        handleChange(e, setFarmData);
                      }}
                      label="Sector"
                    >
                      {sectors.map((sector) => (
                        <MenuItem key={sector} value={sector}>
                          {sector.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: COLORS.primaryColor,
                    color: COLORS.primaryColor,
                    "&:hover": {
                      borderColor: COLORS.primaryColorDark,
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={mutation.isPending}
                    sx={{
                      backgroundColor: COLORS.primaryColor,
                      color: "white",
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: COLORS.primaryColorDark,
                      },
                    }}
                  >
                    {mutation.isPending ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      backgroundColor: COLORS.primaryColor,
                      color: "white",
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: COLORS.primaryColorDark,
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
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

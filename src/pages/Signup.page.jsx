import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
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
} from "@mui/material";
import { COLORS } from "../utils/Colors";
import { Link, useNavigate } from "react-router-dom";
import { SECTORS } from "../utils/Locations";

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
    email: "",
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

  const handleSubmit = () => {
    console.log("Submitting", { userData, farmData });
  };

  return (
    <div>
      <AppBar
        position="absolute"
        style={{ backgroundColor: COLORS.primaryColor }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color={COLORS.whiteColor}>
            Farmer Connect
          </Typography>
          <div>
            <Button
              onClick={() => navigate("/")}
              style={{ color: COLORS.whiteColor }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/Login")}
              style={{
                color: COLORS.yellowColor,
                fontWeight: "bolder",
                marginLeft: 3,
              }}
            >
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.greyBackgroundColor,
        }}
      >
        <Card
          sx={{ padding: 4, maxWidth: 500, width: "100%", textAlign: "center" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              mb={2}
              style={{ color: COLORS.primaryColor }}
            >
              SIGN UP
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
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
                />
                <TextField
                  fullWidth
                  label="Lastname"
                  name="lastname"
                  value={userData.lastname}
                  onChange={(e) => handleChange(e, setUserData)}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => handleChange(e, setUserData)}
                  margin="normal"
                  variant="outlined"
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
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="location-label">District</InputLabel>
                  <Select
                    labelId="location-label"
                    name="district"
                    value={farmData.district}
                    onChange={(e) => {
                      handleChange(e, setFarmData);
                      console.log(e.target.value);
                      console.log(SECTORS[e.target.value]);
                      setSectors(SECTORS[e.target.value]);
                    }}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district} value={district}>
                        {district.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="location-label-1">Sector</InputLabel>
                  <Select
                    labelId="location-label-1"
                    name="sector"
                    value={farmData.sector}
                    onChange={(e) => {
                      handleChange(e, setFarmData);
                    }}
                  >
                    {sectors.map((sector) => (
                      <MenuItem key={sector} value={sector.toUpperCase()}>
                        {sector.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                color="secondary"
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ backgroundColor: COLORS.primaryColor }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>

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
    </div>
  );
};

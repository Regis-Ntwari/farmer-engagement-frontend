import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../utils/Colors";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation Bar */}
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
              style={{
                color: COLORS.whiteColor,
              }}
            >
              Home
            </Button>
            <Button
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

      {/* Login Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.greyBackgroundColor,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Card
          sx={{ padding: 4, maxWidth: 400, width: "100%", textAlign: "center" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              mb={2}
              style={{ color: COLORS.primaryColor }}
            >
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              style={{ backgroundColor: COLORS.primaryColor }}
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link
                to={{ pathname: "/signup" }}
                style={{ color: COLORS.primaryColor }}
              >
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>

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
    </div>
  );
};

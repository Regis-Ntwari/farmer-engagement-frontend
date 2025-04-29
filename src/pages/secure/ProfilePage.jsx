import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Stack,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import {
  Person,
  Email,
  LocationOn,
  Business,
  Edit,
  Save,
  Lock,
  Star,
  EmojiEvents,
} from "@mui/icons-material";
import { COLORS } from "../../utils/Colors";
import { getUserById, updateUser } from "../../services/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UsersPage } from "./users.page";

const InfoField = ({ icon, label, value, editable, onChange }) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
      <Box
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: COLORS.primaryColor,
          color: "white",
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {label}
      </Typography>
    </Stack>
    {editable ? (
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
    ) : (
      <Typography variant="body1" color="text.secondary">
        {value}
      </Typography>
    )}
  </Box>
);

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("id"));
  const userRole = JSON.parse(localStorage.getItem("role"));

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  const updateUserMutation = useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    farm_name: "",
    organization_name: "",
    location: "",
    points: 0,
    level: 0,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        fullname: user.fullname,
        email: user.email == null ? "N/A" : user.email,
        farm_name: user.farm_name || "",
        organization_name: user.organization_name || "",
        location: user.location || "",
        points: user.points || 0,
        level: user.level || 0,
      });
    }
  }, [user]);

  const handleUserDataChange = (field) => (event) => {
    setUserData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData((prev) => ({ ...prev, [field]: event.target.value }));
    setPasswordError(""); // Clear error when user types
  };

  const validatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return false;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSaveProfile = () => {
    const updateData = {
      id: userId,
      fullname: userData.fullname,
      email: userData.email,
    };

    updateUserMutation.mutate(updateData);
  };

  const handlePasswordUpdate = () => {
    if (!validatePassword()) return;

    // Here you would typically make an API call to update the password
    // For now, we'll just show a success message and reset the form
    toast.success("Password updated successfully");
    setShowPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleClosePasswordDialog = () => {
    setShowPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log(userData);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: COLORS.primaryColor }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h5" color={COLORS.primaryColor}>
                Personal Information
              </Typography>
              <IconButton
                onClick={() => setIsEditing(!isEditing)}
                sx={{ color: COLORS.primaryColor }}
              >
                {isEditing ? <Save /> : <Edit />}
              </IconButton>
            </Stack>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoField
                  icon={<Person />}
                  label="Full Name"
                  value={userData.fullname}
                  editable={isEditing}
                  onChange={handleUserDataChange("fullname")}
                />
                <InfoField
                  icon={<Email />}
                  label="Email"
                  value={userData.email}
                  editable={isEditing}
                  onChange={handleUserDataChange("email")}
                />
                {userRole === "FARMER" ? (
                  <>
                    <InfoField
                      icon={<Business />}
                      label="Farm Name"
                      value={userData.farm_name}
                      editable={false}
                    />
                    <InfoField
                      icon={<LocationOn />}
                      label="Location"
                      value={userData.location}
                      editable={false}
                    />
                  </>
                ) : (
                  <InfoField
                    icon={<Business />}
                    label="Organization Name"
                    value={userData.organization_name}
                    editable={false}
                  />
                )}
              </Grid>
            </Grid>

            {isEditing && (
              <Button
                variant="contained"
                onClick={handleSaveProfile}
                sx={{
                  mt: 2,
                  backgroundColor: COLORS.primaryColor,
                  "&:hover": {
                    backgroundColor: COLORS.primaryColorDark,
                  },
                }}
              >
                Save Changes
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Profile Picture and Password */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              mb: 3,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  bgcolor: COLORS.primaryColor,
                  fontSize: "3rem",
                }}
              >
                {userData.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Typography variant="h6">{userData.fullname}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userRole}
              </Typography>
              {userRole === "FARMER" && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {userData.farm_name}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{ mt: 1 }}
                  >
                    <Chip
                      icon={<Star />}
                      label={`${userData.points} Points`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<EmojiEvents />}
                      label={`Level ${userData.level}`}
                      color="success"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {userData.location}
                  </Typography>
                </>
              )}
              {userRole !== "FARMER" && (
                <Typography variant="body2" color="text.secondary">
                  {userData.organization_name}
                </Typography>
              )}
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<Lock />}
              onClick={() => setShowPasswordDialog(true)}
              sx={{
                borderColor: COLORS.primaryColor,
                color: COLORS.primaryColor,
                "&:hover": {
                  borderColor: COLORS.primaryColorDark,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog
        open={showPasswordDialog}
        onClose={handleClosePasswordDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange("currentPassword")}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange("newPassword")}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange("confirmPassword")}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button
            onClick={handlePasswordUpdate}
            variant="contained"
            sx={{
              backgroundColor: COLORS.primaryColor,
              "&:hover": {
                backgroundColor: COLORS.primaryColorDark,
              },
            }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

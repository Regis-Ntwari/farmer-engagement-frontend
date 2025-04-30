import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
  TableSortLabel,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Search as SearchIcon,
  VpnKey as VpnKeyIcon,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { COLORS } from "../../utils/Colors";
import {
  addUser,
  getUsers,
  lockUnlockUser,
  resetPassword,
} from "../../services/user";

const CreateUserDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    organization_name: "",
    role: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      organization_name: "",
      role: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="Username"
            value={formData.username}
            onChange={handleChange("username")}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            fullWidth
          />
          <TextField
            label="First Name"
            value={formData.firstname}
            onChange={handleChange("firstname")}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.lastname}
            onChange={handleChange("lastname")}
            fullWidth
          />
          <TextField
            label="Organization Name"
            value={formData.organization_name}
            onChange={handleChange("organization_name")}
            fullWidth
          />
          <TextField
            select
            label="Role"
            value={formData.role}
            onChange={handleChange("role")}
            fullWidth
          >
            <MenuItem value="VET">Veterinarian</MenuItem>
            <MenuItem value="GOVERNMENT">Government</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: COLORS.primaryColor,
            "&:hover": {
              backgroundColor: COLORS.primaryColorDark,
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const UsersPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("username");
  const [order, setOrder] = useState("asc");
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: (userData) => addUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User created successfully");
      setShowCreateDialog(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
  });

  const toggleLockMutation = useMutation({
    mutationFn: (userId) => lockUnlockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user status");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (userId) => resetPassword(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Password reset successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });

  const handleCreateUser = (userData) => {
    createUserMutation.mutate(userData);
  };

  const handleToggleLock = (userId) => {
    toggleLockMutation.mutate(userId);
  };

  const handleResetPassword = (userId) => {
    resetPasswordMutation.mutate(userId);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredAndSortedUsers = React.useMemo(() => {
    if (!users) return [];

    let filteredUsers = users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return fullName.includes(searchLower);
    });

    return filteredUsers.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      const isAsc = order === "asc";

      if (orderBy === "name") {
        const aFullName = `${a.firstname} ${a.lastname}`;
        const bFullName = `${b.firstname} ${b.lastname}`;
        return isAsc
          ? aFullName.localeCompare(bFullName)
          : bFullName.localeCompare(aFullName);
      }

      if (typeof aValue === "string") {
        return isAsc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return isAsc ? aValue - bValue : bValue - aValue;
    });
  }, [users, searchTerm, orderBy, order]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" color={COLORS.primaryColor}>
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowCreateDialog(true)}
          sx={{
            backgroundColor: COLORS.primaryColor,
            "&:hover": {
              backgroundColor: COLORS.primaryColorDark,
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "username"}
                  direction={orderBy === "username" ? order : "asc"}
                  onClick={() => handleRequestSort("username")}
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "userType"}
                  direction={orderBy === "userType" ? order : "asc"}
                  onClick={() => handleRequestSort("userType")}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "nonLocked"}
                  direction={orderBy === "nonLocked" ? order : "asc"}
                  onClick={() => handleRequestSort("nonLocked")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.firstname} {user.lastname}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.userType}
                    color={
                      user.userType === "GOVERNMENT"
                        ? "primary"
                        : user.userType === "VET"
                        ? "success"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.nonLocked ? "Active" : "Locked"}
                    color={user.nonLocked ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => handleToggleLock(user.id)}
                      color={!user.nonLocked ? "success" : "error"}
                    >
                      {!user.nonLocked ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                    <IconButton
                      onClick={() => handleResetPassword(user.id)}
                      color="primary"
                    >
                      <VpnKeyIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUserDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreateUser}
      />
    </Box>
  );
};

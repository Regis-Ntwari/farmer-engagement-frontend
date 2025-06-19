import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Agriculture,
  TrendingUp,
  LocalShipping,
  Group,
  ExpandMore,
  ExpandLess,
  ThumbUp,
  ThumbDown,
  AccessTime,
  Add as AddIcon,
} from "@mui/icons-material";
import { COLORS } from "../../utils/Colors";
import { getContents, addBestPractice } from "../../services/bestpractice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PracticeCard = ({ practice, onViewDetails }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 2,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
      },
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: COLORS.primaryColor,
            color: "white",
          }}
        >
          <Agriculture />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          {practice.title || "Best Practice"}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          mb: 2,
        }}
      >
        {practice.benefits.split("\n")[0] || "No description available"}
      </Typography>
      <Stack direction="row" spacing={1} mb={2}>
        <Chip
          icon={<AccessTime />}
          label={`${practice.implemetationTime} week${
            practice.implemetationTime > 1 ? "s" : ""
          }`}
          size="small"
          sx={{ bgcolor: "primary.light", color: "primary.dark" }}
        />
        <Chip
          icon={<TrendingUp />}
          label={`+${practice.efficiencyIncrease}% efficiency`}
          size="small"
          sx={{ bgcolor: "success.light", color: "success.dark" }}
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>
          {practice.user.firstname[0]}
          {practice.user.lastname[0]}
        </Avatar>
        <Typography variant="caption" color="text.secondary">
          {practice.user.firstname} {practice.user.lastname}
        </Typography>
      </Stack>
    </CardContent>
    <CardActions>
      <Button
        fullWidth
        variant="outlined"
        endIcon={<ExpandMore />}
        onClick={() => onViewDetails(practice)}
        sx={{
          borderColor: COLORS.primaryColor,
          color: COLORS.primaryColor,
          "&:hover": {
            borderColor: COLORS.primaryColorDark,
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        View Details
      </Button>
    </CardActions>
  </Card>
);

const PracticeDialog = ({ open, practice, onClose }) => {
  if (!practice) return null;

  // Split benefits and steps for display
  const benefits = practice.benefits.split("\n").filter((b) => b.trim());
  const steps = practice.steps.split("\n").filter((s) => s.trim());

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: COLORS.primaryColor,
              color: "white",
            }}
          >
            <Agriculture />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            {practice.title || "Best Practice"}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {practice.description && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Description
              </Typography>
              <Typography variant="body1">{practice.description}</Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Key Benefits
            </Typography>
            <Grid container spacing={2}>
              {benefits.map((benefit, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "primary.light",
                      color: "white",
                    }}
                  >
                    <Typography variant="body2">{benefit}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Implementation Steps
            </Typography>
            <Stack spacing={1}>
              {steps.map((step, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Step {index + 1}:</strong> {step}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Results
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "success.light",
                    color: "success.dark",
                  }}
                >
                  <Typography variant="body2">
                    <strong>Efficiency Increase:</strong> +
                    {practice.efficiencyIncrease}%
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "info.light",
                    color: "info.dark",
                  }}
                >
                  <Typography variant="body2">
                    <strong>Implementation Time:</strong>{" "}
                    {practice.implemetationTime} week
                    {practice.implemetationTime > 1 ? "s" : ""}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Added By
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>
                {practice.user.firstname[0]}
                {practice.user.lastname[0]}
              </Avatar>
              <Typography variant="body1">
                {practice.user.firstname} {practice.user.lastname}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: COLORS.primaryColor }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CreatePracticeDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    benefits: "",
    steps: "",
    efficiency_increase: "",
    implementation_time: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      efficiency_increase: parseInt(formData.efficiency_increase),
      implementation_time: parseInt(formData.implementation_time),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          Add New Best Practice
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            variant="outlined"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Benefits (one per line)"
            value={formData.benefits}
            onChange={handleChange("benefits")}
            variant="outlined"
            multiline
            rows={3}
            helperText="Enter each benefit on a new line"
          />
          <TextField
            fullWidth
            label="Implementation Steps (one per line)"
            value={formData.steps}
            onChange={handleChange("steps")}
            variant="outlined"
            multiline
            rows={4}
            helperText="Enter each step on a new line"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Efficiency Increase (%)"
                type="number"
                value={formData.efficiency_increase}
                onChange={handleChange("efficiency_increase")}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Implementation Time (weeks)"
                type="number"
                value={formData.implementation_time}
                onChange={handleChange("implementation_time")}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: COLORS.primaryColor }}>
          Cancel
        </Button>
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

export const BestpracticePage = () => {
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(JSON.parse(role));
    }
  }, []);

  const { data: practices, isLoading } = useQuery({
    queryKey: ["bestPractices"],
    queryFn: getContents,
  });

  const createMutation = useMutation({
    mutationFn: addBestPractice,
    onSuccess: () => {
      queryClient.invalidateQueries(["bestPractices"]);
      toast.success("Best practice added successfully");
      setShowCreateDialog(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add best practice");
    },
  });

  const handleCreatePractice = (practiceData) => {
    createMutation.mutate(practiceData);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" color={COLORS.primaryColor}>
          Best Practices
        </Typography>
        {userRole === "GOVERNMENT" && (
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
            Add Best Practice
          </Button>
        )}
      </Stack>

      {practices?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Best Practices Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {userRole === "government"
              ? "Start by adding a new best practice using the button above."
              : "Check back later for best practices."}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {practices?.map((practice) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={practice.id}>
              <PracticeCard
                practice={practice}
                onViewDetails={setSelectedPractice}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <PracticeDialog
        open={!!selectedPractice}
        practice={selectedPractice}
        onClose={() => setSelectedPractice(null)}
      />

      <CreatePracticeDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreatePractice}
      />
    </Box>
  );
};

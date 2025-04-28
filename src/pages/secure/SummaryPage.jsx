import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Chat,
  Agriculture,
  LocalShipping,
  Group,
  PhoneInTalk,
} from "@mui/icons-material";
import { COLORS } from "../../utils/Colors";

const StatCard = ({ icon, title, value, subtitle }) => (
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
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
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
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Stack>
      <Typography variant="h4" fontWeight="bold" color={COLORS.primaryColor}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

export const SummaryPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: COLORS.primaryColor }}>
        Dashboard Overview
      </Typography>

      {/* Statistics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PhoneInTalk />}
            title="My Conversations"
            value="10"
            subtitle="Started this week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<People />}
            title="Active Farmers"
            value="2,450"
            subtitle="In your network"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<Chat />}
            title="New Insights"
            value="128"
            subtitle="Shared this week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LocalShipping />}
            title="Market Opportunities"
            value="24"
            subtitle="Available now"
          />
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: COLORS.primaryColor }}>
          Recent Activity
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Agriculture sx={{ color: COLORS.primaryColor }} />
                  <Typography variant="h6">Best Practices</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  New feeding strategy increased weight gain by 20% in test
                  group
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Updated 2 days ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Group sx={{ color: COLORS.primaryColor }} />
                  <Typography variant="h6">Community Updates</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  15 new farmers joined the community this week
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Updated 1 day ago
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

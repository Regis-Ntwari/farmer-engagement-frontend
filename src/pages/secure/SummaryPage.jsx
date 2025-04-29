import React, { useEffect, useState } from "react";
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
import { getContents } from "../../services/statistics";

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
  const [statistics, setStatistics] = useState({
    my_conversations: 0,
    new_farmers: 0,
    new_insights: 0,
    active_farmers: 0,
    best_practice_title: "",
    market_opportunities: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getContents();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

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
            value={statistics.my_conversations}
            subtitle="Started this week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<People />}
            title="Active Farmers"
            value={statistics.active_farmers}
            subtitle="In your network"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<Chat />}
            title="New Insights"
            value={statistics.new_insights}
            subtitle="Shared this week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LocalShipping />}
            title="Market Opportunities"
            value={statistics.market_opportunities}
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Agriculture sx={{ color: COLORS.primaryColor }} />
                  <Typography variant="h6">Best Practices</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {statistics.best_practice_title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Updated recently
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Group sx={{ color: COLORS.primaryColor }} />
                  <Typography variant="h6">Community Updates</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {statistics.new_farmers} new farmers joined the community this
                  week
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Updated recently
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

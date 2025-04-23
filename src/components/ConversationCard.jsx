import {
  Category,
  Person,
  ThumbDown,
  ThumbUp,
  AccessTime,
  PriorityHigh,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/Colors";

export const ConversationCard = ({
  priority,
  id,
  title,
  lastname,
  firstname,
  downvotes,
  upvotes,
  createdOn,
  tagTitle,
}) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return { bg: "#FFEBEE", text: "#D32F2F", icon: <PriorityHigh /> };
      case "INTERMEDIATE":
        return { bg: "#FFF3E0", text: "#F57C00", icon: <PriorityHigh /> };
      case "LOW":
        return { bg: "#E8F5E9", text: "#388E3C", icon: <PriorityHigh /> };
      default:
        return { bg: "#F5F5F5", text: "#616161", icon: <PriorityHigh /> };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/dashboard/conversation/${id}`);
  };

  const priorityStyle = getPriorityColor(priority);

  return (
    <Card
      key={id}
      onClick={handleClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          cursor: "pointer",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Priority Chip */}
        <Chip
          icon={priorityStyle.icon}
          label={priority}
          size="small"
          sx={{
            mb: 2,
            bgcolor: priorityStyle.bg,
            color: priorityStyle.text,
            "& .MuiChip-icon": {
              color: priorityStyle.text,
            },
          }}
        />

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: COLORS.primaryColor,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        {/* Author Info */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Person sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {`${firstname} ${lastname}`}
          </Typography>
        </Stack>

        {/* Votes */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Tooltip title="Upvotes">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ThumbUp sx={{ color: "success.main", fontSize: 18 }} />
              <Typography variant="body2" color="success.main">
                {upvotes}
              </Typography>
            </Stack>
          </Tooltip>
          <Tooltip title="Downvotes">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ThumbDown sx={{ color: "error.main", fontSize: 18 }} />
              <Typography variant="body2" color="error.main">
                {downvotes}
              </Typography>
            </Stack>
          </Tooltip>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          pt: 0,
          borderTop: 1,
          borderColor: "divider",
          justifyContent: "space-between",
        }}
      >
        {/* Date */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <AccessTime sx={{ color: "text.secondary", fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(createdOn)}
          </Typography>
        </Stack>

        {/* Tag */}
        <Chip
          icon={<Category sx={{ fontSize: 16 }} />}
          label={tagTitle}
          size="small"
          sx={{
            bgcolor: "primary.light",
            color: "primary.dark",
            "& .MuiChip-icon": {
              color: "primary.dark",
            },
          }}
        />
      </CardActions>
    </Card>
  );
};

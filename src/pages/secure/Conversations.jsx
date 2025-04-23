import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  ThumbUp,
  ThumbDown,
  Reply,
  AccessTime,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { COLORS } from "../../utils/Colors";
import {
  getContentById,
  upvoteDownvoteComment,
  addComment,
} from "../../services/content";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CommentCard = ({ comment, onVote }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris", // This is GMT+2
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: COLORS.primaryColor }}>
          {`${comment.authorName.split(" ")[0][0]}${
            comment.authorName.split(" ")[1][0]
          }`}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              {comment.authorName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(comment.createdOn)}
            </Typography>
          </Stack>
          <Typography variant="body1">{comment.content}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              size="small"
              onClick={() => onVote(comment.id, "UPVOTED")}
              sx={{ color: "success.main" }}
            >
              <ThumbUp fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="success.main">
              {comment.upvotes}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onVote(comment.id, "DOWNVOTED")}
              sx={{ color: "error.main" }}
            >
              <ThumbDown fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="error.main">
              {comment.downvotes}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export const Conversations = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();

  // Fetch content using React Query
  const {
    data: conversationData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContentById(id),
  });

  // Upvote/Downvote mutation
  const voteMutation = useMutation({
    mutationFn: ({ commentId, type }) => upvoteDownvoteComment(commentId, type),
    onSuccess: () => {
      queryClient.invalidateQueries(["content", id]);
      toast.success("Vote recorded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to record vote");
    },
  });

  // Add comment mutation
  const commentMutation = useMutation({
    mutationFn: (comment) => addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["content", id]);
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add comment");
    },
  });

  // Handle errors with toast
  React.useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setCommentText("");
    setOpenDialog(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      commentMutation.mutate(commentText);
      handleDialogClose();
    }
  };

  const handleVote = (commentId, type) => {
    voteMutation.mutate({ commentId, type });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris", // This is GMT+2
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !conversationData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography color="error">
          {error?.message || "Failed to load conversation"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: COLORS.primaryColor }}>
            {`${conversationData.authorName.split(" ")[0][0]}${
              conversationData.authorName.split(" ")[1][0]
            }`}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                {conversationData.authorName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(conversationData.createdOn)}
              </Typography>
            </Stack>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {conversationData.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {conversationData.content}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                size="small"
                onClick={() => handleVote(conversationData.id, "UPVOTED")}
                sx={{ color: "success.main" }}
              >
                <ThumbUp fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="success.main">
                {conversationData.upvotes}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleVote(conversationData.id, "DOWNVOTED")}
                sx={{ color: "error.main" }}
              >
                <ThumbDown fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="error.main">
                {conversationData.downvotes}
              </Typography>
              <Chip
                icon={<Reply fontSize="small" />}
                label="Reply"
                size="small"
                onClick={handleDialogOpen}
                sx={{ ml: "auto" }}
              />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Comments Section */}
      <Typography variant="h6" mb={2}>
        Comments ({conversationData.comments?.length || 0})
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {conversationData.comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} onVote={handleVote} />
      ))}

      {/* Add Comment Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Add a Comment
          </Typography>
        </DialogTitle>
        <form onSubmit={handleCommentSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!commentText.trim() || commentMutation.isPending}
            >
              {commentMutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Comment"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

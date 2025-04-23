import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Fab,
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
  Chip,
  Stack,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { COLORS } from "../../utils/Colors";
import { ConversationCard } from "../../components/ConversationCard";
import { getTags } from "../../services/tag";
import { addContent, getContents } from "../../services/content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", sm: 500 },
  maxHeight: "90vh",
  overflowY: "auto",
};

export const ViewContentPage = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTag, setSelectedTag] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: "",
    tag: "",
  });

  // Fetch Tags
  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
    error: tagsErr,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  // Fetch Conversations
  const {
    data: conversationsData,
    isLoading: convosLoading,
    isError: convosError,
    error: convosErr,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getContents,
  });

  // Handle errors with toast
  useEffect(() => {
    if (tagsError) toast.error(`Tags error: ${tagsErr.message}`);
    if (convosError) toast.error(`Conversations error: ${convosErr.message}`);
  }, [tagsError, convosError, tagsErr, convosErr]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addContent,
    onSuccess: () => {
      toast.success("Conversation created!");
      queryClient.invalidateQueries(["conversations"]);
      handleClose();
      setFormData({
        title: "",
        content: "",
        file: "",
        tag: "",
      });
    },
    onError: (error) => {
      toast.error(`Submission failed: ${error.message}`);
    },
  });

  const tags = tagsData || [];
  const conversations = conversationsData || [];

  // Filter and sort conversations
  const filteredConversations = conversations
    .filter((convo) => {
      const matchesSearch = convo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "all" || convo.tagTitle === selectedTag;
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_on) - new Date(a.created_on);
      } else if (sortBy === "oldest") {
        return new Date(a.created_on) - new Date(b.created_on);
      } else if (sortBy === "priority") {
        const priorityOrder = { HIGH: 0, INTERMEDIATE: 1, LOW: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "background.paper" }}
      >
        <Typography variant="h4" sx={{ color: COLORS.primaryColor, mb: 2 }}>
          Conversations
        </Typography>

        {/* Search and Filter Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Tag</InputLabel>
              <Select
                value={selectedTag}
                label="Filter by Tag"
                onChange={(e) => setSelectedTag(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Tags</MenuItem>
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.title}>
                    {tag.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Content Section */}
      {convosLoading || tagsLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : filteredConversations.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No conversations found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchQuery || selectedTag !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create a new conversation to get started"}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredConversations.map((content) => (
            <Grid item xs={12} sm={6} md={4} key={content.id}>
              <ConversationCard {...content} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal with Form */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={3} sx={{ color: COLORS.primaryColor }}>
            New Conversation
          </Typography>
          <TextField
            required
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            label="Content"
            name="content"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.content || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            required
            label="Tag"
            name="tag"
            fullWidth
            margin="normal"
            value={formData.tag || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.title}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload File (Optional)
            <input
              type="file"
              name="file"
              hidden
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files?.[0] })
              }
            />
          </Button>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={mutation.isPending}
              sx={{ minWidth: 100 }}
            >
              {mutation.isPending ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

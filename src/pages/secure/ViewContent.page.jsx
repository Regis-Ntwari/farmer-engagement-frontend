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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "../../utils/Colors";
import { ConversationCard } from "../../components/ConversationCard";
import { getTags } from "../../services/tag";
import { addContent, getContents } from "../../services/content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const contents = [
  {
    priority: "LOW",
    id: 1,
    title: "Hello Everyone",
    lastname: "Ntwari",
    firstname: "Regis",
    downvotes: 1,
    upvotes: 5,
    created_on: "2024-01-01",
    tagTitle: "Breeding",
  },
  {
    priority: "INTERMEDIATE",
    id: 2,
    title: "Hello Everyone",
    lastname: "Ntwari",
    firstname: "Regis",
    downvotes: 1,
    upvotes: 5,
    created_on: "2024-01-01",
    tagTitle: "Breeding",
  },
  {
    priority: "HIGH",
    id: 3,
    title: "Hello Everyone",
    lastname: "Ntwari",
    firstname: "Regis",
    downvotes: 1,
    upvotes: 5,
    created_on: "2024-01-01",
    tagTitle: "Breeding",
  },
];

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: 400,
};

export const ViewContentPage = () => {
  const [open, setOpen] = useState(false);
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
    console.log("Submitted:", formData);
    mutation.mutate(formData);
    handleClose();
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

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" style={{ color: COLORS.primaryColor }}>
          CONVERSATIONS
        </Typography>

        {/* Loading Indicator */}
        {convosLoading || tagsLoading ? (
          <Box mt={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container mt={3} width="100%" spacing={2}>
            {conversations.map((content) => (
              <Grid key={content.id} size={{ xs: 12, md: 4 }}>
                <ConversationCard {...content} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal with Form */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
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
          >
            {tags.map((tag) => {
              return (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.title}
                </MenuItem>
              );
            })}
          </TextField>
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
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

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

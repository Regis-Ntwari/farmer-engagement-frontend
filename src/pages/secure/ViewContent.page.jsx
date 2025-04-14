import React, { useState } from "react";
import {
  Grid,
  Typography,
  Fab,
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "../../utils/Colors";
import { ConversationCard } from "../../components/ConversationCard";

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
    handleClose();
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" style={{ color: COLORS.primaryColor }}>
          CONVERSATIONS
        </Typography>
        <Grid container mt={3} width="100%" spacing={2}>
          {contents.map((content) => (
            <Grid key={content.id} size={{ xs: 12, md: 4 }}>
              <ConversationCard {...content} />
            </Grid>
          ))}
        </Grid>
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
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
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
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

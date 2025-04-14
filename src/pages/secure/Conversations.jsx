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
  Menu,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";

// Example data
const messages = [
  {
    id: 1,
    sender: "John",
    text: "Hey there!",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Hi John! How are you?",
    isMe: true,
  },
  {
    id: 3,
    sender: "Alice",
    text: "Don't forget the meeting at 3pm.",
    isMe: false,
  },
  {
    id: 4,
    sender: "You",
    text: "Got it, thanks!",
    isMe: true,
  },
];

const ChatBubble = ({ text, sender, isMe, onRightClick, messageId }) => {
  return (
    <Grid
      container
      justifyContent={isMe ? "flex-end" : "flex-start"}
      mb={1}
      spacing={1}
      onContextMenu={
        !isMe
          ? (e) => {
              e.preventDefault();
              onRightClick(e, messageId);
            }
          : undefined
      }
    >
      {!isMe && (
        <Grid item>
          <Avatar>{sender[0]}</Avatar>
        </Grid>
      )}
      <Grid item maxWidth="70%">
        <Paper
          elevation={3}
          sx={{
            padding: 1.5,
            backgroundColor: isMe ? "#DCF8C6" : "#FFF",
            borderRadius: 2,
            borderTopLeftRadius: isMe ? 12 : 0,
            borderTopRightRadius: isMe ? 0 : 12,
          }}
        >
          {!isMe && (
            <Typography variant="caption" color="textSecondary">
              {sender}
            </Typography>
          )}
          <Typography>{text}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export const Conversations = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [formText, setFormText] = useState("");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setFormText("");
    setOpenDialog(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted:", formText);
    handleDialogClose();
  };

  const handleRightClick = (event, messageId) => {
    setSelectedMessageId(messageId);
    setMenuAnchor({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedMessageId(null);
  };

  const handleUpvote = () => {
    console.log(`Upvoted message ID: ${selectedMessageId}`);
    handleMenuClose();
  };

  const handleDownvote = () => {
    console.log(`Downvoted message ID: ${selectedMessageId}`);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        height: "90vh",
        overflowY: "auto",
        padding: 2,
        backgroundColor: "#f0f0f0",
        position: "relative",
      }}
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          messageId={msg.id}
          text={msg.text}
          sender={msg.sender}
          isMe={msg.isMe}
          onRightClick={handleRightClick}
        />
      ))}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleDialogOpen}
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>

      {/* Send Message Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Send a Message</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Your message"
              type="text"
              fullWidth
              variant="outlined"
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Right-click menu */}
      <Menu
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          menuAnchor
            ? { top: menuAnchor.mouseY, left: menuAnchor.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleUpvote}>👍 Upvote</MenuItem>
        <MenuItem onClick={handleDownvote}>👎 Downvote</MenuItem>
      </Menu>
    </Box>
  );
};

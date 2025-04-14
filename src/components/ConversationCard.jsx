import {
  Attachment,
  Category,
  Person,
  ThumbDown,
  ThumbsUpDown,
  ThumbUp,
  VerifiedUser,
} from "@mui/icons-material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

export const ConversationCard = ({
  priority,
  id,
  title,
  lastname,
  firstname,
  downvotes,
  upvotes,
  created_on,
  tagTitle,
}) => {
  return (
    <Card
      key={id}
      style={{
        backgroundColor:
          priority == "LOW" ? "yellow" : priority == "HIGH" ? "red" : "orange",
      }}
    >
      <CardContent>
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Person />
          <Typography variant="subtitle1" textAlign="center">
            {`${firstname} ${lastname}`}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Priority: {priority}</Typography>
          <div style={{ display: "flex" }}>
            <ThumbUp />
            <Typography>{upvotes}</Typography>
            <ThumbDown style={{ marginLeft: 2 }} />
            <Typography>{downvotes}</Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography>Date: {created_on}</Typography>
          <div style={{ display: "flex" }}>
            <Category />
            <Typography>{tagTitle}</Typography>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

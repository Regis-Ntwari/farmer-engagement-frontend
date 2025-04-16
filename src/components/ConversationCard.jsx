import { Category, Person, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const getColorByPriority = (priority) => {
    if (priority === "LOW") return "yellow";
    if (priority === "HIGH") return "red";
    return "orange";
  };

  const handleClick = () => {
    navigate(`/dashboard/conversation/${id}`);
  };
  return (
    <Card
      key={id}
      onClick={handleClick}
      sx={{
        backgroundColor: getColorByPriority(priority),
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "whitesmoke",
          cursor: "pointer",
        },
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
          <div style={{ display: "flex" }}>
            <Typography>Date: </Typography>
            <Typography
              style={{ fontWeight: "bold" }}
            >{` ${createdOn}`}</Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Category />
            <Typography>{tagTitle}</Typography>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

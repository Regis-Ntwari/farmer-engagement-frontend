import React from "react";
import { COLORS } from "../../utils/Colors";
import { Grid, Typography } from "@mui/material";
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

export const ViewContentPage = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" style={{ color: COLORS.primaryColor }}>
        CONVERSATIONS
      </Typography>
      <Grid container mt={3} width="100%" spacing={2}>
        {contents.map((content) => {
          return (
            <Grid key={content.id} size={{ xs: 12, md: 4 }}>
              <ConversationCard
                id={content.id}
                title={content.title}
                created_on={content.created_on}
                downvotes={content.downvotes}
                firstname={content.firstname}
                lastname={content.lastname}
                priority={content.priority}
                tagTitle={content.tagTitle}
                upvotes={content.upvotes}
              ></ConversationCard>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

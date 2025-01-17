// import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardStyles = {
    // If you use Transfrom like docs then get error stretch(UI) => use Translate(keep origin element, not scale)
    // touchAction:'none' //use sendor default of PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined,
  };
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0 ,0 ,0.2)",
        overflow: "unset",
      }}
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
    >
      {card?.cover && (
        <CardMedia sx={{ height: 140 }} image={card.cover} title={card.title} />
      )}
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          {card?.memberIds?.length ? card?.memberIds?.length : 0}
        </Button>

        <Button size="small" startIcon={<CommentIcon />}>
          {card?.comments?.length ? card?.comments?.length : 0}
        </Button>

        <Button size="small" startIcon={<AttachFileIcon />}>
          {card?.attachments?.length ? card?.attachments?.length : 0}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;

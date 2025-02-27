import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Component for a single variant
const VariantItem = ({ variant, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "0px 0px 0px 30px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <DragIndicatorIcon
          style={{ cursor: "grab", color: "grey" }}
          sx={{ fontSize: "28px" }}
        />
        <Box sx={{ width: "550px", marginRight: "10px" }}>
          <TextField
            value={variant.title}
            placeholder="Select Product"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            size="small"
            sx={{
              flexGrow: 1,
              marginRight: "10px",
              marginLeft: "15px",
              borderRadius: "30px",
              backgroundColor: "white",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                "& fieldset": {
                  borderRadius: "30px",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #888",
                  borderRadius: "30px",
                },
              },
            }}
          />
        </Box>

        <CloseIcon
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onRemove(variant.id)}
          fontSize="small"
          sx={{ marginLeft: "20px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default VariantItem;

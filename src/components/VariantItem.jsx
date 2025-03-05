import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, TextField, Button, Select, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Component for a single variant
const VariantItem = ({ variant, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant.id });
  const [showDiscountFields, setShowDiscountFields] = useState(false);
  const [discountType, setDiscountType] = useState("% off");
  const [discountValue, setDiscountValue] = useState("");

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
        <Box sx={{ width: "350px", marginRight: "10px" }}>
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

        {showDiscountFields ? (
          <>
            <TextField
              value={discountValue}
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="0"
              type="number"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                width: "100px",
                borderRadius: "30px",
                marginLeft: "15px",
                marginRight: "10px",
                // "& .MuiOutlinedInput-root": {
                //   "&.Mui-focused fieldset": {
                //     borderColor: "#008060",
                //   },
                // },
                // "& input[type=number]": {
                //   "-moz-appearance": "textfield",
                // },
                // "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                //   {
                //     "-webkit-appearance": "none",
                //     margin: 0,
                //   },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  "& fieldset": {
                    borderRadius: "30px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#008060",
                    borderRadius: "30px",
                  },
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
              }}
            />
            <Select
              value={discountType}
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => setDiscountType(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                width: "100px",
                marginRight: "10px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc !important", // Ensure no default blue outline
                },
              }}
            >
              <MenuItem value="% off">% off</MenuItem>
              <MenuItem value="flat">flat</MenuItem>
            </Select>
          </>
        ) : (
          <Button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setShowDiscountFields(true)}
            sx={{
              backgroundColor: "#008060",
              color: "white",
              height: "40px",
              width: "220px",
              marginLeft: "15px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#006644",
              },
            }}
          >
            Add Discount
          </Button>
        )}

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

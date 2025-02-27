import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Component for a single product
const ProductItem = ({
  product,
  index,
  onToggleVariants,
  onEditProduct,
  isVariants,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });
  const [showDiscountFields, setShowDiscountFields] = useState(false);
  const [discountType, setDiscountType] = useState("% off");
  const [discountValue, setDiscountValue] = useState("");

  // Applying styles to the draggable product
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
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
        {/* Drag Handle */}
        <DragIndicatorIcon
          style={{ cursor: "grab", color: "grey" }}
          sx={{ fontSize: "28px" }}
        />
        <Typography
          sx={{
            marginRight: "10px",
            marginLeft: "10px",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {index + 1}.
        </Typography>
        <Box sx={{ width: "400px", marginRight: "10px" }}>
          <TextField
            value={product.title}
            placeholder="Select Product"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <ModeEditIcon
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag from blocking clicks
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drag from blocking the click
                    onEditProduct(product.id);
                  }}
                  fontSize="small"
                  style={{ color: "#008060", cursor: "pointer" }}
                />
              ),
            }}
            variant="outlined"
            size="small"
            sx={{
              flexGrow: 1,
              marginRight: "10px",
              backgroundColor: "white",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "1px solid #888",
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
                marginRight: "10px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008060",
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
              width: "200px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#006644",
              },
            }}
          >
            Add Discount
          </Button>
        )}
      </div>
      {/* Button to toggle visibility of variants */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {isVariants && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              marginRight: "100px",
              cursor: "pointer",
            }}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag from blocking clicks
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag from blocking the click
              onToggleVariants(product.id);
            }}
          >
            <Typography
              sx={{
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "500",
                color: "#006EFF",
                textDecoration: "underline",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              {product.showVariants ? "Hide Variants" : "Show Variants"}
            </Typography>
            {product.showVariants ? (
              <ExpandLessIcon fontSize="small" sx={{ color: "#006EFF" }} />
            ) : (
              <ExpandMoreIcon fontSize="small" sx={{ color: "#006EFF" }} />
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProductItem;

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

const OfferFunnel = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <WidgetsOutlinedIcon sx={{ fontSize: "20px", color: "#666" }} />
        <Typography sx={{ color: "#202223" }}>video-reviews</Typography>
      </Box>
      <Divider sx={{ marginY: "20px" }} />

      {/* Offer Funnel Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontWeight: 500, fontSize: "24px", color: "#202223" }}
        >
          Offer Funnel
        </Typography>

        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography
            sx={{
              color: "#666",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Support
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "16px",
              width: "2px",
              backgroundColor: "#888",
              marginTop: "10px",
            }}
          />
          <Typography
            sx={{
              color: "#666",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Talk to an Expert
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ marginY: "10px" }} />

      {/* Offer Bundle Info */}
      <Typography
        variant="body2"
        sx={{
          marginBottom: "10px",
          marginTop: "40px",
          fontWeight: "600",
          fontSize: "16px",
          color: "#202223",
        }}
      >
        Add Bundle Products (Max. 4 Products)
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ErrorIcon fontSize="small" sx={{ color: "#f5a623" }} />
        <Typography variant="body2" sx={{ fontWeight: 400, color: "#202223" }}>
          Offer Bundle will be shown to the customer whenever any of the bundle
          products are added to the cart.
        </Typography>
      </Box>
    </>
  );
};

export default OfferFunnel;

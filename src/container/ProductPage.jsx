import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import OfferFunnel from "../components/OfferFunnel";
import ProductList from "./ProductList";

const ProductPage = () => {
  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <OfferFunnel />
      <Box sx={{ marginTop: "30px" }}>
        <ProductList />
      </Box>
      <Box>
        <Typography variant="body2">
          <input type="checkbox" /> Apply discount on compare price.
        </Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          Discount will be applied on compare price of the product.
        </Typography>
      </Box>

      <Divider sx={{ marginY: "20px" }} />

      {/* Advanced Offer Customizations */}
      <Typography variant="body2">
        <strong>Advanced offer customizations</strong>
      </Typography>
      <Typography variant="body2">
        <input type="checkbox" /> Enable timer for this offer.
      </Typography>
    </Box>
  );
};

export default ProductPage;

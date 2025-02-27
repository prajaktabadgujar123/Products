import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Stack,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/productsSlice";

const ProductPicker = React.memo(
  ({
    isOpen,
    onClose,
    onConfirm,
    selectedProducts,
    toggleProductSelection,
    toggleVariantSelection,
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const { products, status, hasMore } = useSelector(
      (state) => state.products
    );
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef(); // value persists across re-renders

    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }, [searchQuery]);

    useEffect(() => {
      dispatch(fetchProducts({ page: 1, searchQuery: debouncedSearchQuery }));
    }, [debouncedSearchQuery, dispatch]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const lastProductElementRef = useCallback(
      (node) => {
        if (status === "loading") return;

        if (observer.current) observer.current.disconnect(); // Disconnect previous observer

        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        });

        if (node) observer.current.observe(node); // Attach observer to node
      },
      [status]
    );

    useEffect(() => {
      dispatch(fetchProducts({ page: pageNumber })); // Load first page initially
    }, [dispatch, pageNumber]);

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="product-picker-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "663px",
            height: "612px",
            maxWidth: "663px",
            maxHeight: "612px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {/* Title & Close Button */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ margin: "15px" }}
          >
            <Typography
              id="product-picker-title"
              sx={{ fontSize: "18px", fontWeight: "500" }}
            >
              Select Products
            </Typography>

            <CloseIcon onClick={onClose} />
          </Stack>

          <Divider sx={{ marginBottom: "10px" }} />

          {/* Search Bar */}
          <Box sx={{ margin: "15px", marginLeft: "30px", marginRight: "30px" }}>
            <TextField
              fullWidth
              placeholder="Search product"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid #888",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#888" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Product List */}
          <Paper
            sx={{
              maxHeight: 410,
              minHeight: 400,
              overflowY: "auto",
              scrollbarWidth: "none", // Hide scrollbar in Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar in Chrome, Safari
              },
            }}
          >
            <List>
              {products?.map((product, index) => {
                const isProductSelected = selectedProducts.some(
                  (p) => p.id === product.id
                );
                const selectedProduct =
                  selectedProducts.find((p) => p.id === product.id) || {};
                const selectedVariants = selectedProduct.variants || [];
                const isLastProduct = index === products.length - 1;

                return (
                  <React.Fragment key={product.id}>
                    {/* Product Item (Checkbox on Left) */}
                    <ListItem
                      ref={isLastProduct ? lastProductElementRef : null}
                    >
                      <Checkbox
                        checked={isProductSelected}
                        onChange={() => toggleProductSelection(product)}
                        sx={{
                          color: "black",
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                      <ListItemAvatar>
                        <Avatar
                          src={product.image}
                          alt={product.name}
                          sx={{ width: 40, height: 40, borderRadius: "4px" }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={product.title} />
                    </ListItem>
                    <Divider sx={{ borderBottomWidth: "2px" }} />
                    {/* Variant Items (Checkbox on Left) */}
                    {product.variants?.map((variant) => {
                      const isVariantSelected = selectedVariants.some(
                        (v) => v.id === variant.id
                      );

                      return (
                        <React.Fragment key={variant.id}>
                          <ListItem sx={{ pl: 5 }}>
                            <Checkbox
                              checked={isVariantSelected}
                              onChange={() =>
                                toggleVariantSelection(variant, product)
                              }
                              sx={{
                                color: "black",
                                "&.Mui-checked": { color: "green" },
                              }}
                            />

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              width="100%"
                            >
                              <Typography
                                sx={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                              >
                                {variant.title}
                              </Typography>
                              <Box sx={{ display: "flex" }}>
                                {variant.inventory_quantity > 0 && (
                                  <Typography
                                    sx={{
                                      marginRight: "20px",
                                      fontWeight: "400",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {variant.inventory_quantity} available
                                  </Typography>
                                )}
                                <Typography
                                  sx={{
                                    marginRight: "20px",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                  }}
                                >
                                  ₹{variant.price}
                                </Typography>
                              </Box>
                            </Stack>
                          </ListItem>

                          {/* Divider after each variant */}
                          <Divider sx={{ borderBottomWidth: "2px" }} />
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>

          {/* Footer Actions */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ margin: "20px" }}
          >
            <Typography variant="body2">
              {selectedProducts.length} product
              {selectedProducts.length !== 1 ? "s" : ""} selected
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ borderRadius: "5px", color: "#888", borderColor: "#888" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={onConfirm}
                sx={{ borderRadius: "5px" }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    );
  }
);

export default ProductPicker;

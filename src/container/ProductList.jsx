import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ProductItem from "../components/ProductItem";
import ProductPicker from "../components/ProductPicker";
import VariantItem from "../components/VariantItem";
import { Button, Box } from "@mui/material";

const ProductList = () => {
  // State to manage products and their variants
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "",
      showVariants: true,
      variants: [],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to handle drag-and-drop events
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // If item is dragged outside, do nothing

    const activeId = active.id;
    const overId = over.id;

    // If a **product** is being dragged
    if (products.some((p) => p.id === activeId)) {
      //find which product is being dragged onto which and then swap their positions
      const oldIndex = products.findIndex((p) => p.id === activeId);
      const newIndex = products.findIndex((p) => p.id === overId);
      setProducts(arrayMove(products, oldIndex, newIndex));
    } else {
      // If a **variant** inside a product is being dragged
      const product = products.find((p) =>
        p.variants.some((v) => v.id === activeId)
      );
      if (!product) return;

      const oldIndex = product.variants.findIndex((v) => v.id === activeId);
      const newIndex = product.variants.findIndex((v) => v.id === overId);

      // Reorder variants inside the product
      const updatedVariants = arrayMove(product.variants, oldIndex, newIndex);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, variants: updatedVariants } : p
        )
      );
    }
  };

  // Function to toggle variant visibility for a product
  const toggleVariants = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, showVariants: !p.showVariants } : p
      )
    );
  };

  const openProductPicker = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === product.id);

      if (isAlreadySelected) {
        // If product is already selected, remove it along with its variants
        return prev.filter((p) => p.id !== product.id);
      } else {
        // If product is selected, add it along with ALL its variants
        return [...prev, { ...product, variants: product.variants || [] }];
      }
    });
  };

  const toggleVariantSelection = (variant, parentProduct) => {
    setSelectedProducts((prev) => {
      let updatedProducts = [...prev];
      const existingProductIndex = updatedProducts.findIndex(
        (p) => p.id === parentProduct.id
      );

      if (existingProductIndex !== -1) {
        // Product already exists in selected list
        let product = { ...updatedProducts[existingProductIndex] };

        // Ensure variants array exists
        product.variants = product.variants ? [...product.variants] : [];

        const variantIndex = product.variants.findIndex(
          (v) => v.id === variant.id
        );

        if (variantIndex !== -1) {
          // Variant exists → Remove it
          product.variants.splice(variantIndex, 1);
        } else {
          // Variant not selected → Add it
          product.variants.push(variant);
        }

        // If no variants are left, unselect the product (but don't remove it)
        if (product.variants.length === 0) {
          product.isSelected = false;
        }

        updatedProducts[existingProductIndex] = product;
      } else {
        // If product is not in the list, add it with selected variant
        updatedProducts.push({
          ...parentProduct,
          variants: [variant],
          isSelected: true,
        });
      }

      return updatedProducts;
    });
  };

  const replaceProduct = () => {
    if (selectedProducts.length === 0) return;

    setProducts((prev) => {
      let updatedProducts;

      // Check if there's a dummy product (empty title)
      const dummyIndex = prev.findIndex((p) => p.title === "");

      if (selectedProductId && prev.some((p) => p.id === selectedProductId)) {
        // Replace the targeted product
        const index = prev.findIndex((p) => p.id === selectedProductId);
        updatedProducts = [
          ...prev.slice(0, index), // Keep products before the replaced one
          ...selectedProducts, // Insert the newly selected products
          ...prev.slice(index + 1), // Keep products after the replaced one
        ];
      } else if (dummyIndex !== -1) {
        // If dummy product exists, replace it
        updatedProducts = [
          ...prev.slice(0, dummyIndex),
          ...selectedProducts,
          ...prev.slice(dummyIndex + 1),
        ];
      } else {
        // Otherwise, just append new products
        updatedProducts = [...prev, ...selectedProducts];
      }

      //keep only the latest 4 products
      return updatedProducts.slice(-4);
    });
    setIsModalOpen(false);
    setSelectedProducts([]);
  };

  // Function to remove a variant from a product
  const onRemove = (variantId) => {
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        variants: product.variants.filter(
          (variant) => variant.id !== variantId
        ),
      }))
    );
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={products}
          strategy={verticalListSortingStrategy}
        >
          <div
            style={{
              padding: "10px",
            }}
          >
            {products?.map((product, index) => (
              <div key={product.id}>
                <ProductItem
                  product={product}
                  index={index}
                  onToggleVariants={toggleVariants}
                  onEditProduct={openProductPicker}
                  isVariants={product.variants && product.variants.length > 0}
                />
                {product.showVariants &&
                  product.variants &&
                  product.variants.length > 0 && (
                    <SortableContext
                      items={product.variants}
                      strategy={verticalListSortingStrategy}
                    >
                      <div style={{ paddingLeft: "20px" }}>
                        {product.variants?.map((variant) => (
                          <VariantItem
                            key={variant.id}
                            variant={variant}
                            onRemove={onRemove}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  )}
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "110px",
        }}
      >
        {products.length < 4 && (
          <Button
            variant="outlined"
            sx={{
              height: "48px",
              width: "193px",
              borderColor: "#008060",
              color: "#008060",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "#006644",
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={openProductPicker}
          >
            Add Product
          </Button>
        )}
      </Box>

      <ProductPicker
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={replaceProduct}
        selectedProducts={selectedProducts}
        toggleProductSelection={toggleProductSelection}
        toggleVariantSelection={toggleVariantSelection}
      />
    </>
  );
};

export default ProductList;

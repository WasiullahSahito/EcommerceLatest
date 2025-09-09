import React from "react";
import ProductSection from "../../common/ProductSection";
// Import the central data source
import { productsData } from "../../../constants/productsData";

const JewellerySection = () => {
  // Filter products from the main data source that belong to the "Jewellery" category.
  // This guarantees that every product has a valid 'id' for its detail page.
  const jewelleryProducts = productsData
    .filter((product) => product.category === "Jewellery")
    .slice(0, 8); // We'll take the first 8 jewellery items to display in the slider

  return (
    <ProductSection
      title="Premium Jewellery"
      subtitle="Elegant designs for every occasion"
      products={jewelleryProducts}
    />
  );
};

export default JewellerySection;

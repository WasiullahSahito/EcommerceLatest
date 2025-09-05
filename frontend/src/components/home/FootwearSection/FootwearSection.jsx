import React from "react";
import ProductSection from "../../common/ProductSection";
// Import the central data source
import { productsData } from "../../../constants/productsData";

const FootwearSection = () => {
  // Filter products from the main data source that belong to the "Footwear" category.
  // This ensures every product has a valid 'id' for navigation.
  const footwearProducts = productsData
    .filter((product) => product.category === "Footwear")
    .slice(0, 8); // We'll take the first 8 footwear items to display in the slider

  return (
    <ProductSection
      title="Trendy Footwear"
      subtitle="Step up your style game"
      products={footwearProducts}
    />
  );
};

export default FootwearSection;
import React from "react";
import ProductSection from "../../common/ProductSection";
import { productsData } from "../../../constants/productsData";

const BestSellers = () => {
  // Filter for products in the "Bags" category to display in this section.
  // We select the first 8 for this example.
  const bestSellerProducts = productsData
    .filter(p => p.category === "Bags")
    .slice(0, 8);

  return (
    <ProductSection
      title="Best Selling Bags"
      subtitle="Top-rated bags loved by our customers"
      products={bestSellerProducts}
    />
  );
};

export default BestSellers;
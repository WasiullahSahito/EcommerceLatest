import ProductSection from "../../common/ProductSection";
import { productsData } from "../../../constants/productsData";

const BestSellers = () => {
  // Filter for products in the "Bags" category and take first 8
  const bestSellerProducts = productsData
    .filter((p) => p.category === "Bags")
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

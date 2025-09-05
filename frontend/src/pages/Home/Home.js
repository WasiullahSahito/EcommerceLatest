import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import BannerCarousel from "../../components/Banner/BannerCarousal";
import JewellerySection from "../../components/home/JewellerySection/JewellerySection";
import FootwearSection from "../../components/home/FootwearSection/FootwearSection";
import ServicesSection from "../../components/serviceSection/ServicesSection";


const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <NewArrivals />
        <Sale />

        <BestSellers />
        <BannerCarousel />

        <JewellerySection />
        <FootwearSection />

        <YearProduct />
        <ServicesSection />
      </div>
    </div>
  );
};

export default Home;

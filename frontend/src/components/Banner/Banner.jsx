import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);

  // Sample banner images 
  const bannerImages = [
    "https://orebishopping.vercel.app/static/media/bannerImgTwo.d93152138c5c9da3de58.webp",
    "https://serviceapi.spicezgold.com/download/1755503364377_1721277298204_banner.jpg",
    "https://serviceapi.spicezgold.com/download/1751685144346_NewProject(11).jpg",
    "https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg",
    "https://serviceapi.spicezgold.com/download/1748955932914_NewProject(1).jpg"
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, bannerImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="pb-3 pt-3 lg:pb-4 lg:pt-4 relative z-40 h-1/2 ">
      <div className="max-w-[84rem] mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          {/* Slider Container */}
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 relative"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt={`Banner slide ${index + 1}`}
                    className="w-full h-56 md:h-72 lg:h-3/4 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/1200x500/cccccc/666666?text=Banner+Image";
                    }}
                  />
                </div>
                
               
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Simple Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-2">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Minimal Slide Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-xs z-10">
            {currentSlide + 1}/{bannerImages.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
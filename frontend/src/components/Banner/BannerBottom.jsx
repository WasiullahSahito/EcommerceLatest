import React from "react";

const categories = [
  {
    id: 1,
    name: "Fashion",
    img: "https://png.pngtree.com/png-vector/20221201/ourmid/pngtree-flat-design-pink-fashion-icon-with-clothing-shoes-and-accessories-vector-png-image_42960724.jpg",
  },
  {
    id: 3,
    name: "Bags",
    img: "https://cdn-icons-png.freepik.com/512/9638/9638882.png",
  },
  {
    id: 4,
    name: "Footwear",
    img: "https://media.istockphoto.com/id/1272854651/vector/running-shoe-icon-isolated-sneaker-symbol-vector.jpg?s=612x612&w=0&k=20&c=TpmX9dw8AHF8UyT-I19LE3UyTlFuzFzOG7KEjH5HA38=",
  },
  {
    id: 6,
    name: "Beauty",
    img: "https://cdn.vectorstock.com/i/1000v/97/89/pink-makeup-icon-eyelashes-lips-vector-1679789.jpg",
  },
  {
    id: 8,
    name: "Jewellery",
    img: "https://cdn.vectorstock.com/i/500p/50/63/collection-of-jewelry-vector-8335063.jpg",
  },
];

const BannerBottom = () => {
  return (
    <div className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center justify-center text-center cursor-pointer transform hover:-translate-y-2 border border-gray-100 w-28 sm:w-32 md:w-36 lg:w-40"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-3 overflow-hidden rounded-full bg-white shadow flex items-center justify-center p-2">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-gray-800 tracking-wide">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBottom;
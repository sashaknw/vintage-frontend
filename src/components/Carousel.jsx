import React, { useState, useEffect } from "react";

const Carousel = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
//   };

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
//   };

  return (
    <div className="relative w-full overflow-hidden ">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${(currentSlide * 100) / items.length}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={item._id || item.id || index}
            className="w-full flex-shrink-0"
            style={{ width: `${100 / items.length}%` }}
          >
            <img
              src={
                item.imageUrl || item.image || (item.images && item.images[0])
              }
              className="w-full object-cover h-96"
              alt={item.name || `Slide ${index + 1}`}
            />

           
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 flex justify-center w-full gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

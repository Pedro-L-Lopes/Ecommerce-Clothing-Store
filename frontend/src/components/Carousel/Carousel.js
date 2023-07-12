import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploads } from "../../utils/config";
import { GrPrevious, GrNext } from "react-icons/gr";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setSelectedThumbnailIndex(index);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setSelectedThumbnailIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedThumbnailIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="flex flex-col items-start mt-2">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={`${uploads}/products/${image}`}
              alt=""
              style={{ width: "100px", height: "auto", cursor: "pointer" }}
              className={`rounded object-cover mb-2 mr-2 ${
                index === selectedThumbnailIndex ? "border border-blue-500" : ""
              }`}
              onClick={() => goToSlide(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        {images && images.length > 0 && (
          <div className="relative">
            <motion.img
              src={`${uploads}/products/${images[currentIndex]}`}
              alt=""
              style={{ width: "500px", height: "700px" }}
              className="rounded object-top object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white rounded-full p-2 opacity-50"
              onClick={goToPreviousSlide}
            >
              <GrPrevious size={50} />
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white rounded-full p-2 opacity-50"
              onClick={goToNextSlide}
            >
              <GrNext size={50} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

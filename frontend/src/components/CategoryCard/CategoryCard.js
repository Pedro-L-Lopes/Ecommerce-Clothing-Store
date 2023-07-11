import React from "react";

// Categories
import acessorios from "../../images/Categories/t-shirt.jpg";
import moleton from "../../images/Categories/moleton.jpg";
import cropped from "../../images/Categories/cropped.jpg";
import saia from "../../images/Categories/saia.jpg";
import vestido from "../../images/Categories/vestido.png";

// Components
import { Link } from "react-router-dom";

const CategoryCard = () => {
  const categories = [
    { id: 1, name: "T-shirt", image: acessorios },
    { id: 2, name: "Moleton", image: moleton },
    { id: 3, name: "Cropped", image: cropped },
    { id: 4, name: "Saias", image: saia },
    { id: 5, name: "Vestidos", image: vestido },
  ];

  return (
    <div className="flex items-center justify-center overflow-hidden">
      {categories.map((category) => (
        <Link
          to={`/search?q=${encodeURIComponent(category.name)}`}
          key={category.id}
        >
          <div className="flex flex-col items-center justify-center mx-4 w-60 h-60 rounded-2xl m-2">
            <img
              className="w-48 h-48 bg-white sm:w-44 rounded-md object-cover object-top shadow-md hover:w-52 hover:object-top transition-all"
              src={category.image}
              alt={category.name}
            />
            <h3>{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;

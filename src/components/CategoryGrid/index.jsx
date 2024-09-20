import React from 'react';
import { Button } from 'components';
import Kids from "../../assets/Child button.svg";
import Men from "../../assets/Man button.svg";
import Woman from "../../assets/Woman button.svg";
import Food from "../../assets/food(supplement) button.svg";
import "./index.css"
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ title, description, imageSrc }) => {
  const navigate = useNavigate();
  return(
  <div className="flex flex-col items-center justify-center p-6 bg-gradient">
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-53 mb-2 font-raleway">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 font-rubik">{description}</p>
      </div>
      <img src={imageSrc} alt={title} className="w-32 h-32 object-cover mb-4" />
      <Button
        className="border-2 border-gray-50 font-medium py-2 px-4 text-gray-50 hover:bg-gray-50 hover:text-gray-900 transition-colors font-raleway"
        onClick={() => {
          sessionStorage.setItem("selectedCategory", title);
          navigate("/shop")
        }}
      >
        Shop Now
      </Button>
    </div>
  </div>)
};

const CategoryGrid = () => {
  const categories = [
    {
      title: "Kids",
      description: "Specialized pediatric formulations to ensure safe and effective treatment for children.",
      imageSrc: Kids
    },
    {
      title: "Men",
      description: "Advanced healthcare solutions addressing male-specific wellness and hormonal balance.",
      imageSrc: Men
    },
    {
      title: "Women",
      description: "Tailored medical products focusing on women's reproductive health, hormonal balance, and wellness.",
      imageSrc: Woman
    },
    {
      title: "Food(Supplement)",
      description: "Clinically approved supplements to enhance nutrition and support overall health.",
      imageSrc: Food
    }
  ];
  

  return (
    <div className="container mx-auto px-4">
      <div className="custom-grid">
        {categories.map((category, index) => (
          <CategoryItem key={index} {...category}
          
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
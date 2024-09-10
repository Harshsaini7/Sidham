import React from 'react';
import { Text } from 'components';

const ProductCategories = ({ allCategory, selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(''); // Deselect if already selected
    } else {
      setSelectedCategory(categoryName); // Select if not already selected
    }
  };

  return (
    <div className="flex flex-col gap-5 items-start justify-start w-full">
      <Text
        className="text-black-900 text-xl w-full"
        size="txtRalewayRomanSemiBold20"
      >
        Product Categories
      </Text>
      <div className="flex flex-col font-poppins gap-5 items-start justify-start w-full">
        {allCategory.map((category) => (
          <Text
            key={category._id}
            className={`text-base ${
              selectedCategory === category.categoryName ? 'text-bluegray-900' : 'text-gray-500'
            } tracking-[-0.50px] w-full cursor-pointer`}
            size="txtPoppinsRegular16"
            onClick={() => handleCategoryClick(category.categoryName)}
          >
            {category.categoryName} ({category.productCount})
          </Text>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
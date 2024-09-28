import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import ReactStars from "react-rating-stars-component";
import { Text, Img } from "components";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // Extend dayjs with relative time plugin

const ReviewSection = ({ reviews }) => {
  useEffect(() => {
    console.log("inside review section", reviews);
  }, [reviews]);

  return (
    <div className="flex flex-col font-rubik gap-[30px] items-start w-full">
      {reviews.map((review, index) => (
        <div key={index} className="flex flex-1 flex-col gap-2.5 items-start justify-start my-0 w-full">
          <div className="flex flex-row sm:gap-10 items-center justify-between w-full">
            {/* User Information */}
            <div className="flex flex-row gap-[15px] items-center justify-start w-auto">
              <Img
                className="h-[54px] md:h-auto rounded-[50%] w-[54px]"
                src="images/img_image_54x54.png"
                alt="user avatar"
              />
              <div className="flex flex-col gap-[5px] items-start justify-start w-auto">
                <Text
                  className="text-black-900 text-sm tracking-[-0.50px] w-auto"
                  size="txtRubikRegular14Black900"
                >
                  {review.user.name}
                </Text>
                <Text
                  className="text-bluegray-400 text-xs tracking-[-0.50px] w-auto"
                  size="txtRubikRegular12"
                >
                  {review.user.email}
                </Text>
                <Text
                  className="text-bluegray-400 text-xs tracking-[-0.50px] w-auto"
                  size="txtRubikRegular12"
                >
                  {dayjs(review.date).fromNow()}
                </Text>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex items-center justify-start">
              <ReactStars
                count={5}
                size={24}
                activeColor="#ffd700"
                edit={false}
                value={review.rating}
              />
            </div>
          </div>

          {/* Review Description (moved to the left) */}
          <div className="w-full">
            <Text
              className="leading-[35.00px] max-w-[565px] md:max-w-full text-black-900 text-sm tracking-[-0.50px]"
              size="txtRubikRegular14Black900"
            >
              {review.review}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;

import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ rating, setRating }) => {
  const handleClickRating = (value) => {
    setRating(value);
  };

  const renderStars = () => {
    const maxRating = 5;
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      const value = i + 1;
      const isSelected = value <= rating;

      if (value === Math.floor(rating) + 1 && rating % 1 !== 0) {
        stars.push(
          <div
            key={i}
            className="star-icon-container"
            onClick={() => handleClickRating(value - 0.5)}
          >
            <FaStar className="full-star-icon" />
            <FaRegStar className="empty-star-icon" />
          </div>
        );
      } else {
        stars.push(
          <div
            key={i}
            className="star-icon-container"
            onClick={() => handleClickRating(value)}
          >
            <FaStar className={isSelected ? "full-star-icon" : "empty-star-icon"} />
          </div>
        );
      }
    }

    return stars;
  };

  return (
    <div className="star-rating-container">
      {renderStars()}
      <span className="rating-value">{rating.toFixed(1) || "0.0"}</span>
    </div>
  );
};

export default StarRating;

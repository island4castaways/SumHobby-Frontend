import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const StarInput = ({ value, isHalf, isSelected, isHalfSelected, onClickRating }) => {
const handleClickRatingInput = () => {
onClickRating(value);
};

const starIconStyle = {
fontSize: "2rem",
color: isSelected || isHalfSelected ? "orange" : "lightgray",
};

const halfStarStyle = {
position: "absolute",
overflow: "hidden",
width: "50%",
color: "orange",
};

return (
<label className="star-input">
<input
     type="radio"
     name="rating"
     value={value}
     onClick={handleClickRatingInput}
   />
<span className="star-icon" style={starIconStyle}>
{isHalf ? <FaStarHalf style={halfStarStyle} /> : <FaStar />}
</span>
</label>
);
};

export default StarInput;
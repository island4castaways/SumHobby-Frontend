import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { call } from "../service/ApiService";

const ShowReview = () => {

  const location = useLocation();
  const item = location.state.classDTO;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    call("/review/showreview", "PATCH", item)
      .then((response) => setReviews(response.data))
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        리뷰 보기
      </Typography>
      <Typography variant="h6" gutterBottom>
        Title: {item.className}
      </Typography>
      <Typography variant="h6" gutterBottom>
        강사명: {item.userId}
      </Typography>
      {/* Render the reviews */}
      {reviews.map((review) => (
        <div key={review.revNum}>
          <Typography variant="h6" gutterBottom>
            내용: {review.revContent}
          </Typography>
          <Typography variant="h6" gutterBottom>
            별점: {review.revRate}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ShowReview;

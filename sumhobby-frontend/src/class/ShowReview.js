import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { call } from "../service/ApiService";

const ShowReview = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    call("/review", "GET", null)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        리뷰 보기
      </Typography>
      <Typography variant="h6" gutterBottom>
        Title: {reviews.classTitle}
      </Typography>
      <Typography variant="h6" gutterBottom>
        강사명: {reviews.userId}
      </Typography>
      {/* Render the reviews */}
      {reviews.map((review) => (
        <div key={reviews.userId}>
          <Typography variant="h6" gutterBottom>
            내용: {reviews.revContent}
          </Typography>
          <Typography variant="h6" gutterBottom>
            별점: {reviews.revRate}
          </Typography>
        </div>
      ))}
      <Box mt={2}>
        <Button component={Link} to="/addreview" variant="contained" color="primary">
          리뷰 작성하기
        </Button>
      </Box>
    </div>
  );
};

export default ShowReview;

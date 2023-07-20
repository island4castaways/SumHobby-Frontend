import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { call } from "../service/ApiService";
import StarRating from "./StarRating";
import "./ShowReview.css";

const ShowReview = () => {
  const location = useLocation();
  const item = location.state.classDTO;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    call("/review/showreview", "PATCH", item).then((response) => {
      setReviews(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="show-review-container">
      <Typography variant="h4" gutterBottom className="review-title">
        리뷰 보기
      </Typography>
      <div className="class-info">
        <Typography variant="h6" gutterBottom className="info-heading">
          강의명: {item.className}
        </Typography>
        <Typography variant="h6" gutterBottom className="info-heading">
          강사명: {item.userId}
        </Typography>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index}>
            <Card className="review-card">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom className="review-author">
                  작성자: {review.userId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom className="review-date">
                  작성 시간: {review.revDate}
                </Typography>
                <Typography variant="body1" gutterBottom className="review-content">
                  내용: {review.revContent}
                </Typography>
                <div className="rating-container">
                  <Typography variant="body1" gutterBottom className="review-rating">
                    별점:
                  </Typography>
                  <StarRating rating={review.revRate} readOnly />
                </div>
              </CardContent>
            </Card>
            {index !== reviews.length - 1 && <Divider variant="middle" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowReview;

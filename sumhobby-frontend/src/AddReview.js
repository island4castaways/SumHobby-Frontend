import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate , Link} from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { call } from "./service/ApiService";

function StarBox({ selected, onClick }) {
  return (
    <span className={`star ${selected ? "selected" : ""}`} onClick={onClick}>
      {selected ? (
        <BsStarFill size="13" color="#BB1628" />
      ) : (
        <BsStarFill size="13" color="#E3E3E3" />
      )}
    </span>
  );
}

const AddReview = () => {
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [reviewContent, setReviewContent] = useState("");
  
  const navigate = useNavigate();

  const location = useLocation();
  const item = location.state;

  const handleRatingChange = (value) => {
    const decimalRating = value - 0.5; // Calculate rating with decimal points
    setRating(decimalRating.toFixed(1)); // Store the rating with one decimal point
  };

  const handleStarClick = (value) => {
    handleRatingChange(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      // Prepare the review data
      const reviewData = {
        className: item.title,
        userId: item.instructorName,
        revContent: reviewContent,
        revRate: rating,
      };

      createReview(reviewData);
  };

  const createReview = (reviewData) => {
      call("/review/addreview", "POST", reviewData)
      .then((response) => setReview(response.data));
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            리뷰 작성
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Title: {item.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">강사명: {item.instructorName}</Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="write_review"
              label="리뷰"
              name="write_review"
              autoComplete="review"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" className="star-rating">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            const isSelected = value <= Math.floor(rating);
            const isHalfSelected = value - 0.5 === Math.floor(rating);

            return (
              <Grid item key={value}>
                {isSelected ? (
                  <StarBox
                    selected={isHalfSelected ? "half" : true}
                    onClick={() => handleStarClick(value)}
                  />
                ) : (
                  <StarBox selected={false} />
                )}
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">별점: {rating}</Typography>
        </Grid>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              작성 완료
            </Button>
          </Grid>

          <Grid item xs={12}>
          <Button
              component={Link}
              to={{
                pathname: "/showreview",
                search: `?title=${item.title}&instructorName=${item.instructorName}`,
              }}
              variant="body2"
            >
              이 강의 리뷰 더 보러가기
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddReview;

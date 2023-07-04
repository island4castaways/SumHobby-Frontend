import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography, Link } from "@mui/material";
import "./AddReview.css";

function StarBox({ selected, onClick }) {
  return (
    <span className={`star ${selected ? "selected" : ""}`} onClick={onClick}>
      ★
    </span>
  );
}

function BackgroundStar() {
  return <span className="star">★</span>;
}

function AddReview({ title, instructorName }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    const decimalRating = value - 0.5; // Calculate rating with decimal points
    setRating(decimalRating.toFixed(1)); // Store the rating with one decimal point
  };

  const handleStarClick = (value) => {
    handleRatingChange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(review);
  };

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
          <Typography variant="subtitle1">Title: {title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">강사명: {instructorName}</Typography>
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
              autoComplete="off"
              value={review}
              onChange={(e) => setReview(e.target.value)}
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
                  <BackgroundStar />
                )}
              </Grid>
            );
          })}
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              작성 완료
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">별점: {rating}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to="/signup" variant="body2">
              이 강의 리뷰 더 보러가기
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddReview;

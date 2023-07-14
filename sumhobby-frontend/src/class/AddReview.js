import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate , Link} from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { call } from "../service/ApiService";

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.classDTO;
  
  const [rating, setRating] = useState(0.0);
  const [reviewContent, setReviewContent] = useState("");
  const [userDTO, setUserDTO] = useState(null);
  useEffect(() => {
    call("/auth/returnUser", "GET", null).then((response) => {
      setUserDTO(response);
    });  
  }, []);

  const handleRatingChange = (value) => {
    const decimalRating = value - 0.5; // Calculate rating with decimal points
    setRating(decimalRating.toFixed(1)); // Store the rating with one decimal point
  };

  const handleStarClick = (value) => {
    value.preventDefault();
    handleRatingChange(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.target);
      // Prepare the review data
  
    const reviewData = {
      classNum: item.classNum,
      userId: userDTO.userId,
      revContent: data.get("revContent"),
      revRate: rating
    };

    createReview(reviewData);
  };

  const createReview = (reviewDTO) => {
    call("/review/addreview", "POST", reviewDTO)
    .then((response) => {
      if(response.data) {
        navigate("/showreview", {
          state: {
            classDTO: item
        }})
      } else {
        alert("리뷰 저장 실패");
      }
    });
  };

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
          <Typography variant="subtitle1">Title: {item.className}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">강사명: {item.userId}</Typography>
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
              id="revContent"
              label="리뷰"
              name="revContent"
              autoComplete="review"
              // value={reviewContent}
              // onChange={(e) => setReviewContent(e.target.value)}
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
        </Grid>
      </form>
    </Container>
  );
}

export default AddReview;

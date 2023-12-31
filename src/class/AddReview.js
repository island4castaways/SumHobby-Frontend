import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import StarRating from "./StarRating";

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.classDTO;

  const [reviewDTO, setReviewDTO] = useState(location.state.reviewDTO ? location.state.reviewDTO : {});
  const [rating, setRating] = useState(location.state.reviewDTO ? reviewDTO.revRate : 0);
  const [userDTO, setUserDTO] = useState({});
  
  useEffect(() => {
    call("/auth/returnUser", "GET", null).then((response) => {
      if(response) {
        setUserDTO(response);
      }
    }).catch((error) => {
      alert("사용자 정보를 확인하는데 실패했습니다.");
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    if(location.state.reviewDTO) {
      const reviewData = {
        revNum: reviewDTO.revNum,
        classNum: item.classNum,
        revContent: data.get("revContent"),
        revRate: rating
      };
      modifyReview(reviewData);
    } else {
      const reviewData = {
        classNum: item.classNum,
        userId: userDTO.userId,
        revContent: data.get("revContent"),
        revRate: rating
      };
      createReview(reviewData);  
    }
  };

  const modifyReview = (reviewDTO) => {
    call("/review/modifyReview", "POST", reviewDTO).then((response) => {
      if(response) {
        alert("리뷰 저장이 완료되었습니다.");
        setReviewDTO(response);
      }
    }).catch((error) => {
      alert("리뷰 저장을 실패했습니다.");
    });
  };

  const createReview = (reviewDTO) => {
    call("/review/addreview", "POST", reviewDTO).then((response) => {
      if (response.data) {
        navigate("/showreview", {
          state: {
            classDTO: item,
          },
        });
      }
    }).catch((error) => {
      alert("리뷰 저장을 실패했습니다.");
    });
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
      {userDTO && (
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">작성자: {userDTO.userId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Title: {item.className}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">강사명: {item.userId}</Typography>
          </Grid>
        </Grid>
      )}
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
              defaultValue={reviewDTO.revContent}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={1} justifyContent="center" className="star-rating">
          <Grid item xs={12}>
            <StarRating rating={rating} setRating={setRating} />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {reviewDTO ? "저장" : "수정"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddReview;

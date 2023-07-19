import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import StarRating from "./StarRating";

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.classDTO;

  const [rating, setRating] = useState(0);
  const [userDTO, setUserDTO] = useState(null);
  
  useEffect(() => {
    call("/auth/returnUser", "GET", null).then((response) => {
      setUserDTO(response);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const reviewData = {
      classNum: item.classNum,
      userId: userDTO.userId,
      revContent: data.get("revContent"),
      revRate: rating,
    };
  
    try {
      const response = await call("/review/addreview", "POST", reviewData);
  
      if (response.data) {
          navigate("/showreview", {
            state: {
              classDTO: item,
            },
          });
        } else {
      alert("리뷰 저장 실패");
      }
    } catch (error) {
      //백엔드에서 badrequest로 보내서
      if (error.response && error.response.status === 400) {
        alert("이미 작성한 리뷰가 있습니다.");
      } 
  else {
        alert("API 요청 중 오류가 발생했습니다.");
      }
    }
  };

  const createReview = (reviewDTO) => {
    call("/review/addreview", "POST", reviewDTO).then((response) => {
      if (response.data) {
        navigate("/showreview", {
          state: {
            classDTO: item,
          },
        });
      } else {
        alert("리뷰 저장 실패");
      }
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
              autoComplete="review"
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
              작성 완료
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddReview;

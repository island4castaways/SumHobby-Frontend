import React, { useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Lecture = () => {
   const [lecItems, setLecItems] = useState([]);

   const addItem = () => {
    // 임의의 항목 데이터 생성 (이 부분은 실제 데이터로 대체해야 합니다)
   }
  return (
    <div className="Lecture">
      <div className="info-container">
        <img
          src={item.img}
          className="class-thumbnail"
          alt="Thumbnail"
          width={300}
          height={150}
        />
        <div className="info-row">
          <Typography component="span" className="lecture-name">
            {item.title}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="instructor-name">
            강사: {item.instructorName}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="rating">
            별점: {item.rating}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="class-intro">
            소개: {item.classIntro}
          </Typography>
        </div>
        <div className="link-container">
          <Link to="/review" variant="body2" className="App-link">
            View Review
          </Link>
        </div>
        <div className="link-container">
          <Link
            to={{
              pathname: "/addreview",
              state: {
                title: item.title,
                instructorName: item.instructorName,
              },
            }}
            variant="body2"
            className="App-link"
          >
            리뷰 작성하기
          </Link>
        </div>
      </div>
      <Grid container spacing={2} justifyContent="center" marginTop={20}>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            장바구니
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
          >
            바로구매
          </Button>
        </Grid>
      </Grid>

      {/* 회차 리스트는 구매자에게만 공개 */}
      {/* <Grid item xs={3} sm={3}>
        <img
          src={item.img}
          className="class-thumbnail"
          alt="Thumbnail"
          width={300}
          height={150}
        />
      </Grid> */}
      
    </div>
  );
};

export default ClassDetail;

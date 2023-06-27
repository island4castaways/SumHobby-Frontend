import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const ClassDetail = ({ item }) => {
  return (
    <div className="ClassDetail">
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
        <Link to="/review" variant="body2" className="App-link">
          View Review
        </Link>
        <p/>
        <Link
            to={{
              pathname: "/addreview",
              state: {
                title: item.title,
                instructorName: item.instructorName
              }
            }}
            variant="body2"
            className="App-link"
          >
            리뷰 작성하기
        </Link>
      </div>
      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            장바구니
          </Button>
        </Grid>
        <Grid item xs={6}>
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
    </div>
  );
};

export default ClassDetail;

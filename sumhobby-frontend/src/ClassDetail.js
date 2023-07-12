import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ClassDetail = ({ item }) => {
  const navigate = useNavigate();
  const handleClass = () => {
    navigate('/addreview', {
      state: {
        title: item.className,
        instructorName: item.userId,
        classRate: item.classRate,
        classDetail: item.classDetail,
        classCategory: item.classCategory
      },
    });
  };

  const [items, setItems] = useState([]);
  useEffect(() =>{
    setItems(item);
  },[]);
  
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
          <Typography component="span" className="class-name">
            제목: {items.className}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="userTk">
            강사: {items.userId}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="rating">
            별점: {items.classRate}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="class-intro">
            소개: {items.classDetail}
          </Typography>
        </div>
        <Link to={`/showreview?title=${encodeURIComponent(item.className)}&instructorName=${encodeURIComponent(item.instructorName)}`} variant="body2" className="App-link">
          View Review
        </Link>
        <Button onClick={handleClass} variant="body2" className="App-link">
          리뷰 작성하기
        </Button>
      </div>
      <Grid container spacing={2} justifyContent="center" marginTop={3}>
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

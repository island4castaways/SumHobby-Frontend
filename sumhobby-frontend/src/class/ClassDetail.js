import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid, Button, Card, CardActionArea, CardContent } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import "./ClassDetail.css";

const ClassDetail = ({ item }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const classDTO = item;

  const handleClass = () => {
    navigate("/addreview", {
      state: {
        classDTO: classDTO
      }
    });
  };
  const handleClassView = () => {
    navigate("/showreview",{
      state:{
        classDTO: classDTO
      }
    })
  }

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(item);
  }, []);

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    call("/lecture", "GET", null)
      .then((response) => setLectures(response.data))
      .catch((error) => console.error(error));
  }, []);

  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    }
  };

  const enterLecture = (lectureDTO) => {
    navigate("/lecture", {
      state: {
        lectureDTO: lectureDTO
      }
    })
  }

  return (
    <div className="ClassDetail">
      <div className="info-container">
        <img src={item.classImg} className="class-thumbnail" alt="Thumbnail" width={300} height={150} />
        <div className="info-row">
          <Typography component="span" className="class-name">
            제목: {item.className}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="userTk">
            강사: {item.userId}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="rating">
            별점: {item.classRate}
          </Typography>
        </div>
        <div className="info-row">
          <Typography component="span" className="class-intro">
            소개: {item.classDetail}
          </Typography>
        </div>
        <Button onClick={() => {handleClassView()}} variant="body2" className="App-link">
          view review
        </Button>
        <Button onClick={() => {handleClass()}} variant="body2" className="App-link">
          리뷰 작성하기
        </Button>
      </div>
      <Grid container spacing={2} justifyContent="center" marginTop={3}>
        <Grid item xs={3}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            장바구니
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button type="button" fullWidth variant="contained" color="primary">
            바로구매
          </Button>
        </Grid>
      </Grid>

      {/* lecture */}
      <div className="lecture-container" ref={scrollContainerRef}>
        <Typography className="lecture-header" component="h5" align="left" marginTop={3}>
          강의 회차
        </Typography>
        <div className="lecture-scroll-container" ref={scrollContainerRef} >
          <Grid container spacing={2} justifyContent="flex-start">
            {lectures.slice(0, 6).map((lecture) => (
              <Grid item xs={12} sm={4} md={2} 
              key={lecture.lectureNum}>
                <div onClick={() => {enterLecture(lecture)}}>
                  <Card>
                    <CardActionArea>
                      <iframe
                        title="YouTube video player"
                        width="100%"
                        height="200"
                        src={lecture.lecUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <CardContent>
                        <Typography gutterBottom variant="subtitle2" component="div">
                          {lecture.lecTitle}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          회차: {lecture.lecNum}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        {lectures.length > 6 && (
          <div className="scroll-buttons">
            <button onClick={handleScrollLeft}>&lt;</button>
            <button onClick={handleScrollRight}>&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetail;

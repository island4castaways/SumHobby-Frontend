import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid, Button, Card, CardActionArea, CardContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import "./ClassDetail.css";

const ClassDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const classDTO = location.state.item;
  const item = classDTO;

  const handleClass = () => {
    navigate("/addreview", {
      state: {
        classDTO: classDTO,
      },
    });
  };

  const handleClassView = () => {
    navigate("/showreview", {
      state: {
        classDTO: classDTO,
      },
    });
  };

  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    call("/lecture", "PATCH", classDTO)
      .then((response) => setLectures(response.data))
      .catch((error) => console.error(error));
  }, []);

  const scrollContainerRef = useRef(null);

  const enterLecture = (lectureDTO) => {
    navigate("/lecture", {
      state: {
        lectureDTO: lectureDTO,
        classDTO : classDTO
      },
    });
  };

  return (
    <div className="ClassDetail">
      <div className="info-container">
        <img src={item.classImg} className="class-thumbnail" alt="Thumbnail" width="400px" />
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
        <Button onClick={handleClassView} variant="body2" className="App-link">
          view review
        </Button>
        <Button onClick={handleClass} variant="body2" className="App-link">
          리뷰 작성하기
        </Button>
      </div>
      <Grid container spacing={2} justifyContent="center" marginTop="200px">
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
      <div className="lecture-container">
        <Typography className="lecture-header" component="h5" align="left" marginTop={3}>
          강의 회차
        </Typography>
        <div className="lecture-scroll-container" ref={scrollContainerRef}>
          <div className="lecture-card-container">
            {lectures.map((lecture) => (
              <div className="lecture-card" key={lecture.lectureNum} onClick={() => enterLecture(lecture)}>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
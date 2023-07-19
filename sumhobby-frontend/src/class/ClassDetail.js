import React, { useEffect, useState, useRef } from "react";
import { Typography, Grid, Button, Card, CardActionArea, CardContent, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";
import "./ClassDetail.css";
import { Container } from "@mui/system";

const ClassDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [lectures, setLectures] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [myReview, setMyReview] = useState({});

  const classDTO = location.state.item;
  const item = classDTO;

  useEffect(() => {
    call("/lecture", "PATCH", classDTO)
      .then((response) => setLectures(response.data))
      .catch((error) => console.error(error));
  }, [classDTO]);

  useEffect(() => {
    call("/cart", "PATCH", classDTO).then((response) => {
      if (response) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    });
  }, [classDTO]);

  useEffect(() => {
    call("/checkout", "PATCH", classDTO).then((response) => {
      if (response) {
        setSubscribe(true);
      } else {
        setSubscribe(false);
      }
    });
  }, [classDTO]);

  useEffect(() => {
    call("/review/checkReview", "PATCH", classDTO).then((response) => {
      if (response) {
        setHasReview(true);
        setMyReview(response);
      } else {
        setHasReview(false);
      }
    });
  }, [classDTO]);

  const handleClass = () => {
    if (subscribe) {
      navigate("/addreview", {
        state: {
          classDTO: classDTO,
        },
      });
    } else {
      alert("구매한 강의만 리뷰 작성이 가능합니다.");
    }
  };

  const handleReview = () => {
    navigate("/addreview", { state: { classDTO: classDTO, reviewDTO: myReview } })
  }

  const handleClassView = () => {
    navigate("/showreview", {
      state: {
        classDTO: classDTO,
      },
    });
  };

  const enterLecture = (lectureDTO) => {
    if (subscribe) {
      navigate("/lecture", {
        state: {
          lectureDTO: lectureDTO,
          classDTO: classDTO
        },
      });
    } else {
      if (window.confirm("강의를 구매한 후에 강의 내용을 볼 수 있습니다.\n강의를 장바구니에 담으시겠습니까?")) {
        addCart();
      }
    }
  };

  const addCart = () => {
    call("/cart", "POST", classDTO).then((response) => {
      if (window.confirm("장바구니에 담기가 완료되었습니다.\n장바구니로 이동하시겠습니까?")) {
        navigate("/cart");
      }
    })
  }

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
        {hasReview && (
          <Button onClick={handleReview} variant="body2" className="App-link">
            작성한 리뷰 보기
          </Button>
        )}
        {(!hasReview && subscribe) && (
          <Button onClick={handleClass} variant="body2" className="App-link">
            리뷰 작성하기
          </Button>
        )}
        {(!inCart && !subscribe) && (
          <Grid container spacing={2} justifyContent="center" margin={1}>
              <Button onClick={() => addCart()} fullWidth variant="contained" color="primary">
                장바구니
              </Button>
          </Grid>
        )}
        </div>

      {/* lecture */}
      <div className="lectureList">
        <Typography className="lecture-header" component="h3" align="center" margin={5} fontSize={30} marginTop={12}>
          강의 회차
        </Typography>
        <Container xs={12} >
          <div >
            <Paper>
              {lectures.map((lecture, index) => (
                <Card key={lecture.lectureNum} onClick={() => enterLecture(lecture)} >
                  <iframe
                    title="YouTube video player"
                    width="600"
                    height="300"
                    src={lecture.lecUrl}
                  ></iframe>
                  <Typography marginBottom={5} fontSize={20} align="center">
                    {index + 1}. {lecture.lecTitle}
                  </Typography>
                </Card>
              ))}
            </Paper>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ClassDetail;
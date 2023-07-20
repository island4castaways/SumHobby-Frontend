import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./LectureDetail.css";
import { call } from "../service/ApiService";

const LectureDetail = () => {
  const location = useLocation();
  const lectureDTO = location.state.lectureDTO
  const classDTO = location.state.classDTO

  const [userDTO, setUserDTO] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    call("/auth/returnUser", "GET", null).then((response) => {
      if(response) {
        setUserDTO(response);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    call("/question", "PATCH", lectureDTO).then((response) => {
      if(response.data) {
        setQuestions(response.data);
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [lectureDTO]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const questionDTO = {
      quesContent: data.get("quesContent"),
      userId: userDTO.userId,
      lecNum: lectureDTO.lecNum,
      classNum: classDTO.classNum,
    };
    createQuestion(questionDTO);
  };

  const createQuestion = (questionDTO) => {
    call("/question/addcomment", "POST", questionDTO).then((response) => {
      if (response.data) {
        setQuestions(response.data);
      }
    }).catch((error) => {
      console.error(error);
      alert("댓글을 저장하는데 실패했습니다.");
    });
  };

  const replysubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const replyDTO = {
      quesNum: data.get("quesNum"),
      quesAnswer: data.get("quesAnswer"),
      userId: userDTO.userId,
      userTk: userDTO.userTk,
      lecNum: lectureDTO.lecNum,
      classNum: classDTO.classNum,
    };
    createReply(replyDTO);
  };

  const createReply = (questionDTO) => {
    call("/question/addreply", "POST", questionDTO).then(
      (response) => {
        if (response.data) {
          setQuestions(response.data);
        }
    }).catch((error) => {
      console.log(error);
      alert("답변을 저장하는데 실패했습니다.");
    });
  };

  return (
    <div className="wrapper">
      <Typography variant="h5" gutterBottom>
        제목: {lectureDTO.lecTitle}
      </Typography>
      <Typography variant="body2" gutterBottom>
        강의 내용: {lectureDTO.lecDetail}
      </Typography>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          강의 영상:
        </Typography>
        <iframe
          title="YouTube video player"
          width="100%"
          height="400"
          src={lectureDTO.lecUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom marginTop={3}>
          Q&A
        </Typography>
          <div className="question-section">
          <form onSubmit={handleSubmit}>
            <TextField
              label="댓글 작성"
              multiline
              variant="outlined"
              id="quesContent"
              name="quesContent"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="question-button"
            >
              댓글 작성
            </Button>
            </form>
          </div>
          {questions.map((question) => (
            <Card key={question.id} className="question-card">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  작성자: {question.userId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  작성 시간: {question.quesDate}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {question.quesContent}
                </Typography>
                {question.quesAnswer && (
                  <div>
                    <Typography variant="body1" gutterBottom>답글: {question.quesAnswer}</Typography>
                  </div>                
                )}

                  {!question.quesAnswer && userDTO.userId === classDTO.userId && ( //현재 로그인된 userId와 userTk같을때 가능
                  <div className="reply-section">
                  <form onSubmit={replysubmit}>
                  <TextField
                    label="답글 작성"
                    multiline
                    variant="outlined"
                    id="quesAnswer"
                    name="quesAnswer"
                    fullWidth
                  />
                  <div hidden="true">
                    <TextField id="quesNum" name="quesNum" value={question.quesNum} />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="reply-button"
                    data-question-id={question.id}
                  >
                    답글 작성
                  </Button>
                  </form>
                  </div>
                  )}
                {question.replies && question.replies.map((reply) => (
                  <Card key={reply.id} className="reply-card">
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        강사명: {reply.userTk}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        작성 시간: {reply.quesAnsDate}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {reply.quesAnswer}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default LectureDetail;

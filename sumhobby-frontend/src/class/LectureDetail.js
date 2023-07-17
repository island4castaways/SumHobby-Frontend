import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./LectureDetail.css";
import { call } from "../service/ApiService";

const LectureDetail = () => {
  const location = useLocation();
  const lectureDTO = location.state.lectureDTO;
  const classDTO = location.state.classDTO;

  const [replyQuestion, setReplyQuestion] = useState([]);
  const [userDTO, setUserDTO] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    call("/auth/returnUser", "GET", null).then((response) => {
      setUserDTO(response);
    });
  }, []);

  useEffect(() => {
    call("/question", "PATCH", lectureDTO).then((response) => {
      setQuestions(response.data);
    });
  }, [lectureDTO]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    if (data.get("quesContent")) {
      const questionDTO = {
        quesContent: data.get("quesContent"),
        userId: userDTO.userId,
        userTk: userDTO.userTk,
        lecNum: lectureDTO.lecNum,
        classNum: classDTO.classNum,
      };

      createQuestion(questionDTO);

    } else if (data.get("quesAnswer")) {
      
      const replyDTO = {
        quesAnswer: data.get("quesAnswer"),
        userId: userDTO.userId,
        userTk: userDTO.userTk,
        lecNum: lectureDTO.lecNum,
        classNum: classDTO.classNum,
      };

      createReply(replyDTO);
    }
  };

  const createQuestion = (questionDTO) => {
    call("/question/addcomment", "POST", questionDTO).then((response) => {
      if (response.data) {
        setQuestions(response.data);
      } else {
        alert("댓글 저장 실패");
      }
    });
  };

  const createReply = ( replyDTO) => {
    call("/question/addreply", "POST", replyDTO).then(
      (response) => {
        if (response.data) {
          setReplyQuestion(response.data);
        } else {
          alert("답글 저장 실패");
        }
      }
    );
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
        <form onSubmit={handleSubmit}>
          <div className="question-section">
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
                <div className="reply-section">
                  <TextField
                    label="답글 작성"
                    multiline
                    variant="outlined"
                    id="quesAnswer"
                    name="quesAnswer"
                    fullWidth
                  />
                  {userDTO.userId === classDTO.userTk && ( //현재 로그인된 userId와 userTk같을때 가능
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="reply-button"
                    data-question-id={question.id}
                  >
                    답글 작성
                  </Button>
                  )}
                </div>
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
        </form>
      </div>
    </div>
  );
};

export default LectureDetail;

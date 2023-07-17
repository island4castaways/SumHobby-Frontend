import React, { useEffect, useState } from "react";
import { Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { call } from "../service/ApiService";
import { useLocation } from "react-router-dom";

const LectureDetail = () => {

  const location = useLocation();

  const lectureDTO = location.state.lectureDTO; 

    // useEffect(() => {
    //     call("/lecture","GET",null)
    //     .then((response) => setLectures(response.data)) 
    // });
    
  return (
    <div>
      <Typography variant="h6" gutterBottom>
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
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          질의응답:
        </Typography>
        {/* Render the Q&A section */}
      </div>
    </div>
  );
};

export default LectureDetail;

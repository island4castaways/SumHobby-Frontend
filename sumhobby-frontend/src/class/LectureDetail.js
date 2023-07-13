import React, { useEffect, useState } from "react";
import { Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { call } from "../service/ApiService";

const LectureDetail = () => {

    const [lecture, setLectures] = useState([]);

    useEffect(() => {
        call("/lecture","GET",null)
        .then((response) => setLectures(response.data)) 
    });
    
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        제목: {lecture.lecTitle}
      </Typography>
      <Typography variant="body2" gutterBottom>
        세부사항: {lecture.lecDetail}
      </Typography>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          강의 영상:
        </Typography>
        <iframe
          title="YouTube video player"
          width="100%"
          height="400"
          src={lecture.lecUrl}
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

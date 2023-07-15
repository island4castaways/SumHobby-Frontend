import React, { useState } from "react";

const Post = ({ title, content }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <li>
      <h3>{title}</h3>
      <button onClick={toggleContent}>
        {showContent ? "내용 닫기" : "내용 보기"}
      </button>
      {showContent && <p>{content}</p>}
    </li>
  );
};

export default Post;

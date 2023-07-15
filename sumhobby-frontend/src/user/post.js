import React, { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const App = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1>리액트 게시판</h1>
      <PostForm onAddPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;

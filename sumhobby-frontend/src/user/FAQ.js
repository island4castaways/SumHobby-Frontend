import React, { useEffect, useState } from "react";
import "./Board.css";
import Header from "./Header";

const Board = () => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newCommentContent, setNewCommentContent] = useState("");
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 상태 추가
    const [userPostsOnly, setUserPostsOnly] = useState(false); // 사용자가 작성한 포스트만 표시할지 여부

    useEffect(() => {
        // 게시글 목록을 가져오는 비동기 함수 호출 또는 API 요청
        // 예시로 정적인 데이터를 사용하겠습니다.
        const fetchPosts = async () => {
            const response = await fetch("https://api.example.com/posts");
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();

        // 새로운 게시글 생성 및 추가
        const newPost = {
            id: Date.now(), // 간단한 예시로 ID를 현재 시간으로 설정
            title: newPostTitle,
            comments: [],
        };

        setPosts((prevPosts) => [...prevPosts, newPost]);

        // 입력 필드 초기화
        setNewPostTitle("");
    };

    const togglePost = (postId) => {
        setExpandedPostId((prevId) => (prevId === postId ? null : postId));
    };

    const handleCommentSubmit = (postId, e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("관리자만 댓글을 달 수 있습니다.");
            return;
        }

        const newComment = {
            id: Date.now(),
            content: newCommentContent,
        };

        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, newComment],
                };
            }
            return post;
        });

        setPosts(updatedPosts);

        setNewCommentContent("");
    };

    const handleUserPostsToggle = () => {
        setUserPostsOnly((prevState) => !prevState);
    };

    // 사용자가 작성한 포스트 필터링
    const filteredPosts = userPostsOnly ? posts.filter((post) => post.user === "사용자") : posts;

    return (
        <div>
            <Header />
            <h1>Q&A</h1>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={userPostsOnly}
                        onChange={handleUserPostsToggle}
                    />
                    내가 쓴 Q&A만 보기
                </label>
            </div>
            {/* 가운데 정렬 */}
            <div className="fqa-parent">
                <div className="post-list">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="faq-card post-card">
                            <h2 className="faq-card-title post-card-title" onClick={() => togglePost(post.id)}>
                                <span className="question-mark">Q.</span>{post.title}
                            </h2>
                            {expandedPostId === post.id && (
                                <>
                                    <div className="faq-card-answer post-card-answer">
                                        {post.comments.map((comment) => (
                                            <p key={comment.id}>{comment.content}</p>
                                        ))}
                                    </div>
                                    {isAdmin && (
                                        <div className="publish">
                                            <form onSubmit={(e) => handleCommentSubmit(post.id, e)}>
                                                <textarea
                                                    placeholder="답변을 입력하세요"
                                                    value={newCommentContent}
                                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                                ></textarea>
                                                <button type="submit">답변 달기</button>
                                            </form>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handlePostSubmit}>
                <div className="publish">
                    <input
                        type="text"
                        placeholder="질문을 입력하세요"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <button type="submit">글쓰기</button>
                </div>
            </form>
        </div>
    );
};

export default Board;
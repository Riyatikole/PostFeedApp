import React, { useState, useEffect } from "react";
import { FaPlus, FaCommentAlt, FaPaperPlane, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [userName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [openComments, setOpenComments] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getposts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({ ...prev, [postId]: text }));
  };

  const submitComment = async (postId) => {
    const commentData = {
      postId,
      content: newComments[postId] || "",
      author: userName,
    };

    if (!commentData.content.trim()) return;

    try {
      await axios.post("http://localhost:8000/api/addcomment", commentData);
      fetchPosts();
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-[500px] bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
        {posts.length === 0 ? (
          <p>🚀 No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="border p-4 mb-4 rounded shadow-sm bg-white text-left"
            >
              <h4 className="font-semibold text-gray-800">{post.author}</h4>
              <p className="text-gray-700">{post.content}</p>

              <div
                className="mt-3 flex items-center cursor-pointer"
                onClick={() => toggleComments(post._id)}
              >
                <FaCommentAlt className="text-gray-600 text-lg mr-2" />
                <span className="text-sm text-gray-600">Comments</span>
              </div>

              {openComments[post._id] && (
                <div className="mt-2 border-t pt-2 text-left">
                  <div className="max-h-32 overflow-y-auto">
                    {post.comments.map((comment) => (
                      <p key={comment._id} className="text-sm text-gray-700 ">
                        <span className="font-semibold">
                          {comment.author}:{" "}
                        </span>{" "}
                        {comment.content}
                      </p>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center border rounded-md px-2 py-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComments[post._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post._id, e.target.value)
                      }
                      className="flex-1 p-1 outline-none"
                    />
                    <button
                      onClick={() => submitComment(post._id)}
                      className="ml-2 text-blue-500"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => window.location.reload()}
        >
          <FaHome className="text-2xl" />
        </button>

        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => navigate("/create-post")}
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

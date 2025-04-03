import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePostPage() {
  const navigate = useNavigate();
  
  
  const [userName] = useState(localStorage.getItem("userName") || "");
  const [content, setContent] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post content cannot be empty!");

    const postData = {
      content,
      author: userName, 
    };

    try {
        const response = await axios.post("http://localhost:8000/api/post", postData, {
            headers: { "Content-Type": "application/json" }, 
          });
          console.log("Post created successfully!", response.data);
      setContent(""); 
      navigate("/"); 
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Post</h2>
        <p className="text-center text-gray-600 mb-2">
          Posting as: <strong>{userName}</strong>
        </p>

        <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
          

          <textarea
            placeholder="Write your post here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Post = require('../models/Post');
const Comment = require("../models/Comment"); // ✅ Import Comment model

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments"); // ✅ This will now work
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllPosts };


module.exports.newPost = async (req, res) => {
    try {
       
        const { content, author } = req.body; 
        
    
        if (!content || !author) {
          return res.status(400).json({ message: "Content and Author are required" });
        }
    
        // Create a new post
        const newPost = new Post({
          content,
          author,
        });
    
        // Save to MongoDB
        await newPost.save();
    
        res.status(201).json({ message: "Post created successfully", post: newPost });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
      }
  };

 module.exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate("comments"); 
      
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports.addComment = async (req, res) => {
    try {
      const { postId, author, content } = req.body;
  
      if (!postId || !author || !content.trim()) {
        return res.status(400).json({ error: "Post ID, author, and content are required." });
      }
  
      // Check if the post exists
      const postExists = await Post.findById(postId);
      if (!postExists) {
        return res.status(404).json({ error: "Post not found." });
      }
  
      // Create new comment
      const newComment = new Comment({ post: postId, author, content });
      const savedComment = await newComment.save();
  
      // Push comment ID to the Post's comments array
      await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });
  
      res.status(201).json({ message: "Comment added successfully!", comment: savedComment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports.search = async (req,res) => {
    try {
        const query = req.query.q; 
        if (!query) return res.status(400).json({ message: "Search query is required" });
    
        const posts = await Post.aggregate([
          {
            $match: {
              $or: [
                { content: { $regex: query, $options: "i" } }, // Search in post content
                { author: { $regex: query, $options: "i" } },  // Search in author name
              ],
            },
          },
          {
            $lookup: {
              from: "comments", 
              localField: "_id",
              foreignField: "post",
              as: "comments",
            },
          }
          
          
        ]);
    
        res.json(posts);
      } catch (error) {
        console.error("Error searching posts:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    
}

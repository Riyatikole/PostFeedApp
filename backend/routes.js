const express = require('express');
const router = express.Router();
const { newPost, getAllPosts, addComment, search } = require('./controllers/PostController');

router.post('/post', newPost);
router.get('/getposts', getAllPosts); 
router.post('/addcomment', addComment);
router.get('/search', search)

module.exports = router;  

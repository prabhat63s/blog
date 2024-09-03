import express from "express";
import { blogPhoto, createBlog, createComment, deleteBlog, deleteComment, getAllBlogs, getComments, getCommentsByBlogId, getSingle, search, updateBlog } from "../controller/blogController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

router.post("/create-blog", formidable(), createBlog);
router.get("/all-blog", getAllBlogs);
router.get("/single-blog/:id", getSingle);
router.get("/photo-blog/:id", blogPhoto);
router.delete("/delete-blog/:id", deleteBlog);
router.put("/update-blog/:id",   formidable(), updateBlog);
router.post('/comment', createComment);
router.get('/all-comments', getComments);
router.get('/comment/:blogId', getCommentsByBlogId);
router.delete('/delete-comment/:commentId', deleteComment);
router.get('/search', search);

export default router;

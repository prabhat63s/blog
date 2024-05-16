import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import fs from "fs";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!title || !content) {
      return res
        .status(500)
        .send({ error: "Title, Content are required." });
    }

    const blog = new Blog({
      title,
      content,
      photo: {},
    });

    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "Image 1 should be less than 1MB." });
    }

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();

    res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating blog",
    });
  }
};

//get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: blogs.length,
      message: "All Blogs found successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting blogs",
      error: error.message,
    });
  }
};

// get single blog
export const getSingle = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).select("-photo");

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single blog fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

// get photo
export const blogPhoto = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting blog",
      error,
    });
  }
};

//delete controller
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

//update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!title || !content) {
      return res
        .status(500)
        .send({ error: "Title, Content are required." });
    }

    const blogs = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    if (photo) {
      blogs.photo.data = fs.readFileSync(photo.path);
      blogs.photo.contentType = photo.type;
    }

    await blogs.save();
    res.status(201).send({
      success: true,
      message: "Blog Updated Successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update blog: ",
    });
  }
};

// Create a new comment
export const createComment = async (req, res) => {
  const { text, blogId } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const newComment = new Comment({ text, blogId });
    await newComment.save();

    // Add comment to blog's comments array
    blog.comments.push(newComment._id);
    await blog.save();

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create comment" });
  }
};

// get comments by id
export const getCommentsByBlogId = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });;
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch comments" });
  }
};

// get comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });;
    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch comments" });
  }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, message: 'Comment deleted successfully', deletedComment });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
};

// search 
export const search = async (req, res) => {
  const { q } = req.query;

  try {
    // Use Mongoose to perform a case-insensitive search
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: new RegExp(q, 'i') } },
        { content: { $regex: new RegExp(q, 'i') } }
      ]
    });

    res.status(200).json({ success: true, results: blogs });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to search blogs' });
  }
};
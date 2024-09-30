import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState("");
  const [error, setError] = useState("");
  const [auth] = useAuth();

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://blog-1-w7yr.onrender.com/api/blog/all-blog"
      );
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          throw new Error("Blog ID is missing in params");
        }

        const response = await axios.get(
          `https://blog-1-w7yr.onrender.com/api/blog/single-blog/${id}`
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://blog-1-w7yr.onrender.com/api/blog/comment`,
        {
          text: newCommentText,
          blogId: blog._id,
        }
      );
      console.log("Comment created:", response.data);
      // Refresh the blog data to display the new comment
      const updatedBlogResponse = await axios.get(
        `https://blog-1-w7yr.onrender.com/api/blog/single-blog/${id}`
      );
      setBlog(updatedBlogResponse.data.blog);
      setNewCommentText("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("Failed to create comment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-1-w7yr.onrender.com/api/blog/comment/${id}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <Layout>
      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Spinner />
          </div>
        ) : blog ? (
          <div className="w-full flex flex-col lg:flex-row gap-8 py-8">
            {/* Main Blog Content */}
            <div className="w-full lg:w-[70%] flex flex-col gap-6">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-white">{blog.title}</h1>
                <p className="text-sm text-gray-500">
                  Published on:{" "}
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              <div className="w-full flex items-center justify-center mb-4">
                <img
                  src={`https://blog-1-w7yr.onrender.com/api/blog/photo-blog/${blog._id}`}
                  alt="Blog Cover"
                  className="rounded-lg border border-neutral-800 w-full lg:w-[600px] h-auto object-cover"
                />
              </div>

              <div
                className="text-neutral-200 leading-8 text-lg"
                dangerouslySetInnerHTML={{ __html: blog && blog.content }}
              ></div>

              {/* Comment Section */}
              <h2 className="text-2xl font-semibold mt-8">Comments</h2>

              {auth?.user ? (
                <form
                  onSubmit={handleCommentSubmit}
                  className="flex gap-4 flex-col lg:flex-row mt-4"
                >
                  <input
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    className="bg-neutral-900 border border-neutral-800 w-full lg:w-96 text-sm rounded-lg p-2.5"
                  />
                  <button
                    type="submit"
                    className="w-fit text-black bg-white hover:bg-neutral-500 gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Post Comment
                  </button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
              ) : (
                <p className="mt-4">
                  Please{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    login
                  </Link>{" "}
                  to post a comment.
                </p>
              )}

              <div className="mt-6 space-y-4">
                {loading ? (
                  <p>Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-neutral-900 w-fit rounded-lg px-4 py-2"
                    >
                      <p className="text-white">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet. Be the first one to comment!</p>
                )}
              </div>
            </div>

            {/* Blog Sidebar */}
            <div className="w-full lg:w-[30%] space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Related Blogs
              </h3>
              <div className="flex flex-col gap-6">
                {blogs.map((blog) => (
                  <Link
                    to={`/blog-detail/${blog._id}`}
                    key={blog._id}
                    className="flex gap-4 items-center bg-neutral-900 hover:bg-neutral-800 rounded-lg p-4"
                  >
                    <img
                      src={`https://blog-1-w7yr.onrender.com/api/blog/photo-blog/${blog._id}`}
                      alt="Blog Cover"
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{blog.title}</h4>
                      <p className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()} -{" "}
                        {new Date(blog.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Blog not found.</p>
        )}
      </div>
    </Layout>
  );
}

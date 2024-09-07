import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState("");
  const [error, setError] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          throw new Error("Blog ID is missing in params");
        }

        const response = await axios.get(`https://blog-1-w7yr.onrender.com/api/blog/single-blog/${id}`);
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
      const response = await axios.post(`https://blog-1-w7yr.onrender.com/api/blog/comment`, {
        text: newCommentText,
        blogId: blog._id,
      });
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
        const response = await axios.get(`https://blog-1-w7yr.onrender.com/api/blog/comment/${id}`);
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
      <div className="container mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Spinner />
          </div>
        ) : blog ? (
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">{blog.title}</h1>
              <p className="text-sm text-gray-500">
                Published on:{" "}
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <div className="w-full flex items-center justify-center">
              <img
                src={`https://blog-1-w7yr.onrender.com/api/blog/photo-blog/${blog._id}`}
                alt="Blog Cover"
                className="rounded-lg border border-neutral-800 w-[600px] h-80 object-cover"
              />
            </div>
            <div
              className="max-w-4xl leading-7 mx-auto text-neutral-200 post-content"
              dangerouslySetInnerHTML={{ __html: blog && blog.content }}
            ></div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Comments</h2>
            {/* Comment Form */}
            {auth?.user ? (
              <form
                onSubmit={handleCommentSubmit}
                className="flex gap-2 flex-col lg:flex-row"
              >
                <input
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write your comment..."
                  className="bg-neutral-900 border border-neutral-800 w-full lg:w-96  text-sm rounded-lg  p-2.5"
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
              <p>
                Please{" "}
                <Link to="/login" className="text-blue-500 underline">
                  login
                </Link>{" "}
                to post a comment.
              </p>
            )}

            {loading ? (
              <p>Loading comments...</p>
            ) : (
              <div className="mt-4 flex gap-4 flex-wrap">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <p
                      key={comment._id}
                      className=" comment-text w-fit bg-neutral-800 px-4 py-1 rounded-md"
                    >
                      {comment.text}
                    </p>
                  ))
                ) : (
                  <p>No comments yet. Be the first one to comment!</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Blog not found.</p>
        )}
      </div>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import Spinner from "../../components/Spinner";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentBlog, setRecentBlog] = useState(null);
  const [recentUser, setRecentUser] = useState(null);
  const [recentComment, setRecentComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get("https://blog-1-w7yr.onrender.com/api/auth/all-users");
        setUsers(usersResponse.data.users);

        // Fetch all blogs
        const blogsResponse = await axios.get("https://blog-1-w7yr.onrender.com/api/blog/all-blog");
        setBlogs(blogsResponse.data.blogs);

        // Fetch all comments
        const commentsResponse = await axios.get("https://blog-1-w7yr.onrender.com/api/blog/all-comments");
        setComments(commentsResponse.data.comments);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update recent blog
    if (blogs.length > 0) {
      setRecentBlog(blogs[0]);
    }

    // Update recent user
    if (users.length > 0) {
      setRecentUser(users[0]);
    }

    // Update recent comment
    if (comments.length > 0) {
      setRecentComment(comments[0]);
    }
  }, [blogs, users, comments]);

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[15%] w-full">
          <AdminNav />
        </div>
        <div className="lg:w-[85%] flex flex-col gap-6">
          {/* dashboard */}
          <h1 className="text-2xl font-semibold mb-4 leading-9">
            Welcome to your dashboard Prabhat Singh!
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Total blogs */}
            <div className="flex flex-col border p-4 rounded-md text-xl font-semibold border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4">Total blogs</h1>
              {loading ? <Spinner /> : <p className="">{blogs.length}</p>}
            </div>
            {/* Total users */}
            <div className="flex flex-col border p-4 rounded-md text-xl font-semibold border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4">Total users</h1>
              {loading ? <Spinner /> : <p className="">{users.length}</p>}
            </div>
            {/* Total comments */}
            <div className="flex flex-col border p-4 rounded-md text-xl font-semibold border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4">Total comments</h1>
              {loading ? <Spinner /> : <p className="">{comments.length}</p>}
            </div>
            {/* Recent user */}
            <div className="flex flex-col border p-4 rounded-md border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4 text-xl font-semibold">Recent user</h1>
              {loading ? (
                <Spinner />
              ) : recentUser ? (
                <p className="">{recentUser.name}</p>
              ) : (
                <p>No recent user found</p>
              )}
            </div>
            {/* Recent comment */}
            <div className="flex flex-col border p-4 rounded-md border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4 text-xl font-semibold">Recent comment</h1>
              {loading ? (
                <Spinner />
              ) : recentComment ? (
                <p className="">{recentComment.text}</p>
              ) : (
                <p>No recent comment found</p>
              )}
            </div>
            {/* Recent blog */}
            <div className="flex flex-col lg:col-span-3 border p-4 rounded-md border-neutral-800 hover:bg-neutral-800">
              <h1 className="mb-4  text-xl font-semibold">Recent blog</h1>
              {loading ? (
                <Spinner />
              ) : recentBlog ? (
                <div className="flex gap-2 justify-between flex-col lg:flex-row">
                  <p className="w-[60%] truncate">{recentBlog.title}</p>
                  <div className="text-sm text-neutral-400">
                    {new Date(recentBlog.createdAt).toLocaleDateString()} {"  "}
                    {new Date(recentBlog.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ) : (
                <p>No recent blog found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
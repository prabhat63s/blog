import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "sonner";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/blog/all-blog");
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

  return (
    <Layout>
      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Spinner />
          </div>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="w-full h-fit border rounded-md border-neutral-800 hover:opacity-80"
              >
                <img
                  src={`http://localhost:5500/api/blog/photo-blog/${blog._id}`}
                  alt="Blog Cover"
                  className="rounded-t-md w-full h-44 object-cover"
                  style={{ minHeight: "150px" }}
                />
                <h2 className="text-xl font-semibold px-4 pt-4">
                  {blog.title}
                </h2>
                <div className="flex justify-between items-center p-4">
                  <Link
                    to={`/blog-detail/${blog._id}`}
                    className="w-fit text-black bg-white hover:bg-neutral-500 gap-2 font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Read more
                  </Link>
                  <p className="text-sm text-neutral-400">
                    {new Date(blog.createdAt).toLocaleDateString()}{" "}
                    {new Date(blog.createdAt).toLocaleTimeString()}{" "}
                  </p>{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

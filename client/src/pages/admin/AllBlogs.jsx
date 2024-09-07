import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch all the blog
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://blog-1-w7yr.onrender.com/api/blog/all-blog");
      if (response.data.success) {
        setBlogs(response.data.blogs);
        toast.success("fetched all blogs.");
      } else {
        toast.error("Failed to fetch blogs. Please try again.");
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

  // delete blog
  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`https://blog-1-w7yr.onrender.com/api/blog/delete-blog/${blogId}`);
      toast.success("Blog Deleted Successfully");
      // After deletion, fetch updated list of blogs
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[15%]">
          <AdminNav />
        </div>
        <div className="lg:w-[85%] flex flex-col gap-6">
          {/* all blogs */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">All blogs</h1>
            {loading ? (
              <div className="flex items-center justify-center h-[40vh]">
                <Spinner />
              </div>
            ) : blogs.length === 0 ? (
              <p>No blog found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800 border border-neutral-800">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-neutral-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`https://blog-1-w7yr.onrender.com/api/blog/photo-blog/${blog._id}`}
                            alt={blog.title}
                            className="rounded-full h-10 w-10 border"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {blog.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            {new Date(blog.createdAt).toLocaleDateString()}{" "}
                            {new Date(blog.createdAt).toLocaleTimeString()}{" "}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/dashboard/update-blog/${blog._id}`
                                )
                              }
                            >
                              <AiOutlineEdit
                                size={20}
                                className="text-blue-500 cursor-pointer"
                              />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm("Are you sure to delete?")) {
                                  handleDelete(blog._id);
                                }
                              }}
                            >
                              <AiOutlineDelete
                                size={20}
                                className="text-red-500 cursor-pointer"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

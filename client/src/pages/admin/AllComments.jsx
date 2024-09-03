import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner";

export default function AllComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/blog/all-comments`);
        setComments(response.data.comments);
        toast.success("Fetched all comments");
      } catch (error) {
        toast.error("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/blog/delete-comment/${commentId}`
      );
      if (response.data.success) {
        // Filter out the deleted comment from the state
        setComments(comments.filter((c) => c._id !== commentId));
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[15%]">
          <AdminNav />
        </div>
        <div className="lg:w-[85%] flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">All comments</h1>
            {loading ? (
              <div className="flex items-center justify-center h-[40vh]">
                <Spinner />
              </div>
            ) : comments.length === 0 ? (
              <p>No comments found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800 border border-neutral-800">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Id
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Comment
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
                    {comments.map((c) => (
                      <tr key={c._id} className="hover:bg-neutral-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{c._id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{c.text}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            {new Date(c.createdAt).toLocaleDateString()}{" "}
                            {new Date(c.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure to delete?")) {
                                handleDeleteComment(c._id);
                              }
                            }}
                          >
                            <AiOutlineDelete
                              size={20}
                              className="text-red-500 cursor-pointer"
                            />
                          </button>
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

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineDelete } from "react-icons/ai";
import Spinner from "../../components/Spinner";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://blog-1-w7yr.onrender.com/api/auth/all-users");
        toast.success("Fetched all users");
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`https://blog-1-w7yr.onrender.com/api/auth/delete-user/${userId}`);
      if (response.data.success) {
        // Filter out the deleted user from the state
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting user: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-[15%]">
          <AdminNav />
        </div>
        <div className="lg:w-[85%] flex flex-col gap-6">
          {/* all users */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">All users</h1>
            {loading ? (
              <div className="flex items-center justify-center h-[40vh]">
                <Spinner />
              </div>
            ) : users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800 border border-neutral-800">
                  <thead className="bg-neutral-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Role
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
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-neutral-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm">
                            {user.role === 1 ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}{" "}
                          {new Date(user.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role !== 1 && (
                            <button
                              onClick={() => {
                                if (window.confirm("Are you sure to delete?")) {
                                  handleDeleteUser(user._id);
                                }
                              }}
                            >
                              <AiOutlineDelete
                                size={20}
                                className="text-red-500 cursor-pointer"
                              />
                            </button>
                          )}
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

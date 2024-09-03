import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    ['code-block'],
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/blog/single-blog/${id}`
        );
        const { title, content } = response.data.blog;
        setTitle(title);
        setContent(content);
        setImagePreview(`http://localhost:5500/api/blog/photo-blog/${id}`);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog. Please try again.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      photo && formData.append("photo", photo);

      const response = await axios.put(
        `http://localhost:5500/api/blog/update-blog/${id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Blog Updated Successfully");
        navigate("/admin/dashboard/all-blogs"); // Redirect to admin dashboard after successful update
      } else {
        toast.error(response.data.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
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
            <h1 className="text-2xl font-semibold mb-4">Update Blog</h1>
            <form
              onSubmit={handleUpdate}
              className="w-full flex flex-col gap-6"
            >
              <div>
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium"
                >
                  Update Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="photo"
                    className="cursor-pointer bg-neutral-900 border border-neutral-800 rounded-lg p-2 flex items-center justify-center w-32 h-32 hover:bg-gray-700"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected Image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Select an image
                      </span>
                    )}
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      className="bg-red-500 text-white py-2 px-4 rounded"
                      onClick={() => {
                        setPhoto(null);
                        setImagePreview(null);
                      }}
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter title"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">
                  Content
                </label>
                <ReactQuill
                  value={content}
                  onChange={(value) => setContent(value)}
                  theme="snow"
                  placeholder="Write something..."
                  className="h-72 mb-12 text-sm w-full"
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>

              <button
                type="submit"
                className="w-fit text-black bg-white hover:bg-neutral-500 gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

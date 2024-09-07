import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const navigate = useNavigate();

  // Handle file input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setPhoto(files[0]); // Only handle the first selected file for simplicity

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("photo", photo);

      const response = await axios.post(
        "https://blog-1-w7yr.onrender.com/api/blog/create-blog",
        formData
      );

      if (response.data.success) {
        toast.success("Blog Created Successfully");
        navigate("/admin/dashboard/all-blogs");
      } else {
        toast.error(response.data.message || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
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
            <h1 className="text-2xl font-semibold mb-4">Create new blog</h1>
            <form
              className="w-full flex flex-col gap-6"
              onSubmit={handleCreate}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="images1"
                  className="block text-sm font-medium mb-2"
                >
                  Select Image
                </label>
                <input
                  type="file"
                  id="images1"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="images1"
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
                Create new blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

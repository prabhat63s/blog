import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlog from "./pages/admin/CreateBlog";
import AllBlogs from "./pages/admin/AllBlogs";
import UpdateBlog from "./pages/admin/UpdateBlog";
import AllUsers from "./pages/admin/AllUsers";
import AllComments from "./pages/admin/AllComments";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog-detail/:id" element={<BlogDetailPage />} />

          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/all-blogs" element={<AllBlogs />} />
            <Route path="dashboard/create-blog" element={<CreateBlog />} />
            <Route path="dashboard/update-blog/:id" element={<UpdateBlog />} />
            <Route path="dashboard/users" element={<AllUsers />} />
            <Route path="dashboard/comments" element={<AllComments />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

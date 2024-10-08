import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";

export default function LoginPage() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }

      setError(""); // Clear the error state if no validation errors

      const res = await axios.post(
        "https://blog-1-w7yr.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen">
      <Layout>
        <div className="w-full lg:max-w-sm m-auto pt-40 lg:pt-24">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium ">Login to news.dev</h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border border-neutral-800  text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Your password
              </label>
              <div className="flex items-center bg-neutral-900 border border-neutral-800  text-sm rounded-lg w-full p-2.5">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none bg-transparent"
                />
                {isShowPassword ? (
                  <IoEyeOutline
                    size={18}
                    onClick={() => toggleShowPassword()}
                    className="text-neutral-600"
                  />
                ) : (
                  <IoEyeOffOutline
                    size={18}
                    onClick={() => toggleShowPassword()}
                    className="text-neutral-600"
                  />
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full text-black bg-white hover:bg-neutral-500 gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
              Not registered yet?{" "}
              <Link
                to="/register"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

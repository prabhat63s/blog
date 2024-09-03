import { Link, useLocation, useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { validateEmail, validatePassword } from "../../utils/helper";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function RegisterPage() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
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

      const res = await axios.post("http://localhost:5500/api/auth/register", {
        name,
        email,
        password,
      });
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 lg:border border-neutral-800 rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium ">Register to news.dev</h5>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg block w-full p-2.5"
              placeholder="Prabhat Singh"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg block w-full p-2.5"
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
            <div className="flex items-center bg-neutral-900 border border-neutral-800 text-sm rounded-lg w-full p-2.5">
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
            Register to your account
          </button>

          <div className="text-sm font-medium text-gray-500">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

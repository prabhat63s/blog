import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 ">
      <div className="h-[10vh] px-4 flex justify-between items-center">
        <Link to="https://prabhat-singh-portfolio.vercel.app" target="_/blank">
          Copyright © {new Date().getFullYear()} News.Dev
        </Link>
        <div className="flex gap-4">
          <Link to="https://www.linkedin.com/in/prabhat-singh-10a134255/">
            <FaLinkedinIn size={16} />
          </Link>
          <Link to="https://www.threads.net/@_frontend.ui_">
            <FaXTwitter size={16} />
          </Link>
          <Link to="https://www.instagram.com/_frontend.ui_">
            <FaInstagram size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

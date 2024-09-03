import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <div className="border-b lg:border-0 pb-5 border-neutral-800 flex justify-between lg:flex-col lg:gap-4">
      <NavLink
        to="/admin/dashboard"
        className="w-fit btn flex flex-col relative group"
      >
        Dashboard
        <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-right transition-transform scale-x-0 group-hover:scale-x-100"></span>
      </NavLink>
      <NavLink
        to="/admin/dashboard/users"
        className="w-fit btn flex flex-col relative group"
      >
        Users
        <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-right transition-transform scale-x-0 group-hover:scale-x-100"></span>
      </NavLink>
      <NavLink
        to="/admin/dashboard/all-blogs"
        className="w-fit btn flex flex-col relative group"
      >
        All blogs
        <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-right transition-transform scale-x-0 group-hover:scale-x-100"></span>
      </NavLink>
      <NavLink
        to="/admin/dashboard/create-blog"
        className="w-fit btn flex flex-col relative group"
      >
        Create blog
        <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-right transition-transform scale-x-0 group-hover:scale-x-100"></span>
      </NavLink>
      <NavLink
        to="/admin/dashboard/comments"
        className="w-fit btn flex flex-col relative group"
      >
        Comments
        <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-right transition-transform scale-x-0 group-hover:scale-x-100"></span>
      </NavLink>
    </div>
  );
}

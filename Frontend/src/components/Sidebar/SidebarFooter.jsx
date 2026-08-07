// SidebarFooter.jsx
import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const SidebarFooter = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("legalmitra_token");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      {open && (
        <div className="absolute bottom-[68px] left-3 right-3 bg-[#252525] border border-white/10 rounded-lg shadow-lg overflow-hidden">
          <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-200 hover:bg-white/5 transition-colors">
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={() => {
              setOpen(false);
              localStorage.removeItem("legalmitra_token");
              navigate("/login");
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-3 p-2 cursor-pointer transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-zinc-700 hover:bg-zinc-800 border-neutral-900 flex items-center justify-center text-slate-200 font-medium text-sm">
          {getInitials(user.name)}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
        </div>

        <ChevronUp
          size={16}
          className={`text-gray-400 transition-transform ${open ? "rotate-0" : "rotate-180"}`}
        />
      </div>
    </div>
  );
};

export default SidebarFooter;
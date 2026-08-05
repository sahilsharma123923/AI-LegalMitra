import React, { useEffect, useState } from "react";
import SideBar from "@/components/Sidebar/SideBar";
import ChatWindow from "@/components/ChatWindow/ChatWindow";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg border border-white/10 bg-[#1c1c1c] px-3 py-2 text-sm text-neutral-200 md:hidden"
      >
        Menu
      </button>

      <div className="flex min-h-screen flex-col md:flex-row">
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ChatWindow onMenuClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
};

export default Home;

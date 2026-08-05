import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-4 gap-3 bg-[#1c1c1c] md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg border border-white/10 p-2 text-neutral-200 md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/signup")}
          className="border-neutral-800 text-sm text-neutral-200 hover:bg-neutral-100 hover:text-black transition-all duration-300"
        >
          Sign Up
        </Button>

        <Button
          onClick={() => navigate("/login")}
          className="text-zinc-800 hover:bg-white border-black bg-white text-sm transition-all duration-300"
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
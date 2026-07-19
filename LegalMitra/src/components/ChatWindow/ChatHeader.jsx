import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-end items-center px-6 py-4 gap-3  bg-[#1c1c1c]">
      <Button
        variant="outline"
        onClick={() => navigate("/signup")}
        className="border-neutral-800 text-sm text-neutral-200 hover:bg-neutral-100 hover:text-black transition-all duration-300"
      >
        Sign Up
      </Button>

      <Button
        onClick={() => navigate("/login")}
        className=" text-zinc-800 hover:bg-white border-black bg-white text-sm transition-all duration-300"
      >
        Login
      </Button>
    </header>
  );
};

export default ChatHeader;
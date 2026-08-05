import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import ChatHistory from "./ChatHistory";

const SideBar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[85%] max-w-72 transform bg-[#1C1C1C] text-white border-r border-neutral-800 transition-transform duration-300 md:static md:z-auto md:w-80 md:translate-x-0 md:max-w-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex flex-col`}
      >
        <SidebarHeader />
        <ChatHistory />

        <div className="mt-auto px-2 pb-1">
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
};

export default SideBar;
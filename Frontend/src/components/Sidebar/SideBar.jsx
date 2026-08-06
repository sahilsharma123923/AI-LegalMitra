import React, { useEffect, useRef, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import ChatHistory from "./ChatHistory";

const MIN_WIDTH = 220;
const MAX_WIDTH = 380;

const SideBar = ({ isOpen = false, onClose = () => {} }) => {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(sidebarWidth);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isResizing) return;
      const deltaX = event.clientX - startXRef.current;
      setSidebarWidth((prev) => {
        const next = startWidthRef.current + deltaX;
        return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, next));
      });
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = (event) => {
    setIsResizing(true);
    startXRef.current = event.clientX;
    startWidthRef.current = sidebarWidth;
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      <aside
        style={{ width: sidebarWidth }}
        className={`fixed inset-y-0 left-0 z-30 transform bg-[#1C1C1C] text-white border-r border-neutral-800 transition-transform duration-300 md:static md:z-auto md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } flex flex-col`}
      >
        <SidebarHeader />
        <ChatHistory />

        <div className="mt-auto px-2 pb-1">
          <SidebarFooter />
        </div>

        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={handleResizeStart}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-white/10"
        />
      </aside>
    </>
  );
};

export default SideBar;
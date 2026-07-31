import React from "react";
import SideBar from "../Sidebar/SideBar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#141414]">
      <SideBar />

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
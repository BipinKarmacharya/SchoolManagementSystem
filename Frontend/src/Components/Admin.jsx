import { useState, useEffect } from "react";

import Header from "./Header";
import { Sidebar } from "./Sidebar";
import PageTitle from "./PageTitle";
import { Outlet } from "react-router-dom";

function Admin() {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 950);
  
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Effect to auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 950);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  return (
    <div className="app">
      <div className="header">
        {/* <Header toggleSidebar={toggleSidebar} /> */}
      </div>
      <div className="main">
        <Sidebar setPageTitle={setPageTitle} isSidebarOpen={isSidebarOpen} />

        {/* Overlay to block clicks when sidebar is open */}
        {isSidebarOpen && window.innerWidth <= 768 && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}

        {/* Content Area */}
        <div className={`content ${isSidebarOpen && window.innerWidth > 768 ? "shifted" : ""}`}>
          <PageTitle title={pageTitle} />
          <div className="content">
            <Outlet /> {/* Loads child routes inside Admin Dashboard */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

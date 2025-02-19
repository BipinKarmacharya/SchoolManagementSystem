import React, { useState, useEffect } from "react";
// import "./App.css";

import Header from "./Components/Header";
import { Sidebar } from "./Components/Sidebar";
import Dashboard from "./Pages/employeeHome";


import PageTitle from "../Components/PageTitle";

const Employee = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [currentPage, setCurrentPage] = useState("dashboard"); // State to track the current page

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

  // Render the current page based on state
  const renderPage = () => {
   
        return <Dashboard />
    
  };

  return (
    <div className="app">
      <div className="header">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="main">
        <Sidebar
          setPageTitle={setPageTitle}
          isSidebarOpen={isSidebarOpen}
          // navigateTo={navigateTo} // Pass the navigation function to Sidebar
        />
        <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
          <PageTitle title={pageTitle} />
          {renderPage()} {/* Render the current page */}
        </div>
      </div>
    </div>
  );
};

export default Employee;
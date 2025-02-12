import { useState } from "react";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import "./App.css";

import Header from "./Header";
import { Sidebar } from "./Sidebar";

import PageTitle from "./PageTitle";

import { Outlet } from "react-router-dom";

function Admin() {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Toggling Menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="app">
      <div className="header">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="main">
        <Sidebar setPageTitle={setPageTitle} isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
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

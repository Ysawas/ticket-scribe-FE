
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../LoadingSpinner";

const MainLayout = ({ requireAuth = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  // Use Navigate component instead of navigate function during render
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={cn(
          "flex-1 pt-16 overflow-auto transition-all",
          sidebarOpen ? "lg:ml-64" : "lg:ml-64"
        )}
      >
        <main className="h-full p-4 md:p-6 mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

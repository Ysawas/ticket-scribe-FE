
import React, { useState, useEffect } from "react";
import { getTickets } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

// Import the new refactored components
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import TicketTabs from "@/components/Dashboard/TicketTabs";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data since we're not actually connecting to the backend yet
        // In a real app, this would be: const data = await getTickets();
        
        const mockTickets = [
          {
            id: 1,
            title: "Application crashes on startup",
            status: "open",
            priority: "high",
            created_at: "2023-04-10",
            assigned_to: "John Doe",
          },
          {
            id: 2,
            title: "Cannot upload profile picture",
            status: "in progress",
            priority: "medium",
            created_at: "2023-04-09",
            assigned_to: "Jane Smith",
          },
          {
            id: 3,
            title: "Error when submitting form",
            status: "open",
            priority: "low",
            created_at: "2023-04-08",
            assigned_to: null,
          },
          {
            id: 4,
            title: "Feature request: dark mode",
            status: "closed",
            priority: "low",
            created_at: "2023-04-07",
            assigned_to: "John Doe",
          },
          {
            id: 5,
            title: "Login page not responsive on mobile",
            status: "open",
            priority: "high",
            created_at: "2023-04-06",
            assigned_to: "Jane Smith",
          },
        ];

        setTickets(mockTickets);
        
        // Calculate stats
        const total = mockTickets.length;
        const open = mockTickets.filter(t => t.status === "open").length;
        const closed = mockTickets.filter(t => t.status === "closed").length;
        const high = mockTickets.filter(t => t.priority === "high").length;
        const medium = mockTickets.filter(t => t.priority === "medium").length;
        const low = mockTickets.filter(t => t.priority === "low").length;
        
        setStats({ total, open, closed, high, medium, low });
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <TicketTabs tickets={tickets} />
    </div>
  );
};

export default Dashboard;

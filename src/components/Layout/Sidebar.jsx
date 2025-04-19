
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  TicketIcon,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home size={20} />,
    },
    {
      name: "Tickets",
      path: "/tickets",
      icon: <TicketIcon size={20} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  const roleBasedItems = () => {
    if (!user) return menuItems.filter(item => ["Dashboard", "Tickets"].includes(item.name));
    if (user.role === "admin") return menuItems;
    return menuItems.filter(item => !["Users", "Settings"].includes(item.name));
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen pt-16 transition-transform bg-white border-r border-gray-200 w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-3 py-4">
        <Button className="w-full mb-6" onClick={() => window.location.href="/tickets/new"}>
          <Plus size={16} className="mr-2" /> New Ticket
        </Button>
        
        <ul className="space-y-1">
          {roleBasedItems().map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 text-base font-medium rounded-lg",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

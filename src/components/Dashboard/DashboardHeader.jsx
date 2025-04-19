
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <Link to="/tickets/new">
        <Button className="mt-4 md:mt-0">
          <Plus size={16} className="mr-2" /> New Ticket
        </Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;


import React from "react";
import { Users } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const AssignedTickets = () => {
  return (
    <EmptyState 
      message="No tickets assigned to you" 
      icon={<Users size={48} />} 
    >
      <p className="text-gray-500 mb-4">Tickets assigned to you will appear here</p>
    </EmptyState>
  );
};

export default AssignedTickets;

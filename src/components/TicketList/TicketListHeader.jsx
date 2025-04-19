
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TicketListHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">
          View and manage all support tickets
        </p>
      </div>
      <Link to="/tickets/new" className="mt-4 sm:mt-0">
        <Button>
          <Plus size={16} className="mr-2" /> New Ticket
        </Button>
      </Link>
    </div>
  );
};

export default TicketListHeader;

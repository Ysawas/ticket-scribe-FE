
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  TicketListHeader,
  TicketFilters,
  TicketTable,
  useMockTicketData
} from "@/components/TicketList";

const TicketList = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { tickets, loading } = useMockTicketData(filters);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TicketListHeader />
      
      <TicketFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <Card>
        <CardContent className="p-0">
          <TicketTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketList;

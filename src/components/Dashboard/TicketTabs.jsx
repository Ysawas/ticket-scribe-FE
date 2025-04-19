
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentTicketsTable from "./RecentTicketsTable";
import AssignedTickets from "./AssignedTickets";
import HighPriorityTable from "./HighPriorityTable";

const TicketTabs = ({ tickets }) => {
  return (
    <Tabs defaultValue="recent">
      <TabsList>
        <TabsTrigger value="recent">Recent Tickets</TabsTrigger>
        <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
        <TabsTrigger value="high">High Priority</TabsTrigger>
      </TabsList>
      <TabsContent value="recent">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTicketsTable tickets={tickets} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="assigned">
        <Card>
          <CardHeader>
            <CardTitle>Tickets Assigned to Me</CardTitle>
          </CardHeader>
          <CardContent>
            <AssignedTickets />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="high">
        <Card>
          <CardHeader>
            <CardTitle>High Priority Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <HighPriorityTable tickets={tickets} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TicketTabs;

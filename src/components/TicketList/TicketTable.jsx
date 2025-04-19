
import React from "react";
import { Link } from "react-router-dom";
import { Filter, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PriorityBadge from "@/components/PriorityBadge";
import EmptyState from "@/components/EmptyState";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

const TicketTable = ({ tickets }) => {
  if (tickets.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          message="No tickets found"
          icon={<Filter size={48} />}
        >
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or create a new ticket
          </p>
          <Link to="/tickets/new">
            <button className="bg-primary text-white px-4 py-2 rounded flex items-center">
              <Plus size={16} className="mr-2" /> New Ticket
            </button>
          </Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>#{ticket.id}</TableCell>
            <TableCell className="font-medium">
              <Link
                to={`/tickets/${ticket.id}`}
                className="text-primary hover:underline"
              >
                {ticket.title}
              </Link>
              <div className="text-sm text-muted-foreground truncate max-w-xs">
                {ticket.description}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.status === "open"
                    ? "bg-yellow-100 text-yellow-800"
                    : ticket.status === "in progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {ticket.status}
              </span>
            </TableCell>
            <TableCell>
              <PriorityBadge priority={ticket.priority} />
            </TableCell>
            <TableCell>
              {ticket.assigned_to || "Unassigned"}
            </TableCell>
            <TableCell>
              {new Date(ticket.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketTable;

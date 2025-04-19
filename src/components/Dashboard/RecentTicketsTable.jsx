
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/EmptyState";

const RecentTicketsTable = ({ tickets }) => {
  return (
    <>
      {tickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Assigned To</th>
                <th className="py-3 px-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.slice(0, 5).map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">#{ticket.id}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-primary hover:underline"
                    >
                      {ticket.title}
                    </Link>
                  </td>
                  <td className="py-2 px-4">
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
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {ticket.assigned_to || "Unassigned"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState message="No tickets found" />
      )}
      <div className="mt-4 flex justify-end">
        <Link to="/tickets">
          <Button variant="outline">View All Tickets</Button>
        </Link>
      </div>
    </>
  );
};

export default RecentTicketsTable;

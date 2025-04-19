
import { useState, useEffect } from "react";

// Mock data function - in a real app this would connect to your API
const useMockTicketData = (filters) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const mockTickets = [
          {
            id: 1,
            title: "Application crashes on startup",
            description: "When opening the app, it immediately crashes with a segmentation fault.",
            status: "open",
            priority: "high",
            created_at: "2023-04-10",
            assigned_to: "John Doe",
            created_by: "Jane Smith",
          },
          {
            id: 2,
            title: "Cannot upload profile picture",
            description: "Users report being unable to upload profile pictures larger than 1MB.",
            status: "in progress",
            priority: "medium",
            created_at: "2023-04-09",
            assigned_to: "Jane Smith",
            created_by: "John Doe",
          },
          {
            id: 3,
            title: "Error when submitting form",
            description: "Users get a 500 error when trying to submit the contact form.",
            status: "open",
            priority: "low",
            created_at: "2023-04-08",
            assigned_to: null,
            created_by: "Admin User",
          },
          {
            id: 4,
            title: "Feature request: dark mode",
            description: "Multiple users have requested adding a dark mode option.",
            status: "closed",
            priority: "low",
            created_at: "2023-04-07",
            assigned_to: "John Doe",
            created_by: "Marketing Team",
          },
          {
            id: 5,
            title: "Login page not responsive on mobile",
            description: "The login form breaks on mobile devices with screens smaller than 375px.",
            status: "open",
            priority: "high",
            created_at: "2023-04-06",
            assigned_to: "Jane Smith",
            created_by: "QA Team",
          },
        ];

        // Filter based on status if set
        let filteredTickets = [...mockTickets];
        
        if (filters.status) {
          filteredTickets = filteredTickets.filter(
            (ticket) => ticket.status === filters.status
          );
        }
        
        // Filter based on priority if set
        if (filters.priority) {
          filteredTickets = filteredTickets.filter(
            (ticket) => ticket.priority === filters.priority
          );
        }
        
        // Filter based on search term if set
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredTickets = filteredTickets.filter(
            (ticket) =>
              ticket.title.toLowerCase().includes(searchLower) ||
              ticket.description.toLowerCase().includes(searchLower)
          );
        }

        setTickets(filteredTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filters]);

  return { tickets, loading };
};

export default useMockTicketData;

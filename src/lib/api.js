import { toast } from "@/components/ui/sonner";

// Use the backend URL from the .env file
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    toast.error(error.message || "An error occurred");
    throw error;
  }
};

// Authentication
export const login = (credentials) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const register = (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Tickets
export const getTickets = (filters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append("status", filters.status);
  if (filters.priority) queryParams.append("priority", filters.priority);
  if (filters.search) queryParams.append("search", filters.search);

  const queryString = queryParams.toString();
  return apiRequest(`/tickets?${queryString}`);
};

export const getTicketById = (id) => {
  return apiRequest(`/tickets/${id}`);
};

export const createTicket = (ticketData) => {
  return apiRequest("/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });
};

export const updateTicket = (id, ticketData) => {
  return apiRequest(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(ticketData),
  });
};

export const deleteTicket = (id) => {
  return apiRequest(`/tickets/${id}`, {
    method: "DELETE",
  });
};

// Users
export const getUsers = () => {
  return apiRequest("/users");
};

export const getUserById = (id) => {
  return apiRequest(`/users/${id}`);
};

// Comments
export const getTicketComments = (ticketId) => {
  return apiRequest(`/tickets/${ticketId}/comments`);
};

export const addComment = (ticketId, commentData) => {
  return apiRequest(`/tickets/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

//OLD Code
/*
import { toast } from "@/components/ui/sonner";

const API_URL = "https://api.ticket-scribe.com"; // Replace with your actual API URL
const USE_MOCK_DATA = true; // Toggle this to switch between real API and mock data

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  try {
    // If we're using mock data, don't make real API calls
    if (USE_MOCK_DATA && options.mockResponse) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return options.mockResponse;
    }
    
    const url = `${API_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    toast.error(error.message || "An error occurred");
    throw error;
  }
};

// Authentication
export const login = (credentials) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    mockResponse: {
      token: "mock-jwt-token",
      user: {
        id: "mock-user-id",
        firstName: credentials.email.split('@')[0],
        lastName: "User",
        email: credentials.email,
        role: "user",
      }
    }
  });
};

export const register = (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
    mockResponse: {
      message: "User registered successfully",
      user: {
        id: "new-user-id",
        ...userData,
        password: undefined // Don't return password
      }
    }
  });
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Tickets
export const getTickets = (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.status) queryParams.append("status", filters.status);
  if (filters.priority) queryParams.append("priority", filters.priority);
  if (filters.search) queryParams.append("search", filters.search);
  
  const queryString = queryParams.toString();
  return apiRequest(`/tickets?${queryString}`);
};

export const getTicketById = (id) => {
  return apiRequest(`/tickets/${id}`);
};

export const createTicket = (ticketData) => {
  return apiRequest("/tickets", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });
};

export const updateTicket = (id, ticketData) => {
  return apiRequest(`/tickets/${id}`, {
    method: "PUT",
    body: JSON.stringify(ticketData),
  });
};

export const deleteTicket = (id) => {
  return apiRequest(`/tickets/${id}`, {
    method: "DELETE",
  });
};

// Users
export const getUsers = () => {
  return apiRequest("/users");
};

export const getUserById = (id) => {
  return apiRequest(`/users/${id}`);
};

// Comments
export const getTicketComments = (ticketId) => {
  return apiRequest(`/tickets/${ticketId}/comments`);
};

export const addComment = (ticketId, commentData) => {
  return apiRequest(`/tickets/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};
*/
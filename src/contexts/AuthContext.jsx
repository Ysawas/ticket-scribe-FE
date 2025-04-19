
import { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin, logout as apiLogout } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await apiLogin(credentials);
      const { token, user } = data;
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login successful");
      return true;
    } catch (error) {
      toast.error("Login failed: " + (error.message || "Unknown error"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout(); // removes localStorage values
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null); // clears context
    toast.success("Logged out successfully");
    window.location.href = "/login"; // Redirect to login page
  };

  // Helper function to check user role
  const hasRole = (roles) => {
    if (!user) return false;
    
    if (typeof roles === 'string') {
      return user.role === roles;
    }
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return false;
  };

  const isAdmin = () => hasRole('admin');
  const isManager = () => hasRole('manager');
  const isSupervisor = () => hasRole('supervisor');
  const isUser = () => hasRole('user');

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole,
    isAdmin,
    isManager,
    isSupervisor,
    isUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

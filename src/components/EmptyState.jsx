
import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({ message = "No data found", icon = <Inbox size={48} />, children }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-gray-400 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      {children}
    </div>
  );
};

export default EmptyState;

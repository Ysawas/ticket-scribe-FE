
import React from "react";

const PriorityBadge = ({ priority }) => {
  let badgeClass = "priority-badge ";

  switch (priority?.toLowerCase()) {
    case "low":
      badgeClass += "priority-low";
      break;
    case "medium":
      badgeClass += "priority-medium";
      break;
    case "high":
      badgeClass += "priority-high";
      break;
    default:
      badgeClass += "bg-gray-100 text-gray-800";
  }

  return <span className={badgeClass}>{priority || "None"}</span>;
};

export default PriorityBadge;

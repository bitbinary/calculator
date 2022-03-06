import React from "react";
import './HistoryItem.css'
export default function HistoryItem({ expression }) {
  return (
    <div className="history-item">
      <p>{expression}</p>
    </div>
  );
}

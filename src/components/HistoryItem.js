import React from "react";
import './HistoryItem.css'
export default function HistoryItem({ expression }) {
  let exp = expression.split('=')
  return (
    <div className="history-item">
      <p>{exp[0]} =</p>
      <p><strong>{exp[1]}</strong></p>
    </div>
  );
}

import React from "react";
import HistoryItem from "./HistoryItem";
import './HistorySection.css'
export default function HistorySection({ title, histories }) {
  return (
    <div className="history-section">
      <p className="title">{title}</p>
      {histories.map((value,key) => (
        <HistoryItem key={key} expression={value}></HistoryItem>
      ))}
    </div>
  );
}

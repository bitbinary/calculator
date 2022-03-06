import React from "react";
import "./Button.css";
export default function Button({
  label,
  handleClick,
  type,
  classTypes,
  style,
  ...rest
}) {
  return (
    <button
      onClick={() => handleClick(type, label)}
      className={`button  ${classTypes || ""}`}
      style={style}
      {...rest}
      type={type}
    >
      {label}
    </button>
  );
}

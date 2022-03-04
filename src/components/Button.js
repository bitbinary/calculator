import React from "react";
import "./Button.css";
export default function Button({ label, handleClick, type, style, ...rest }) {
  return (
    <button className={`button  ${type || ""}`} style={style} {...rest}>
      {label}
    </button>
  );
}

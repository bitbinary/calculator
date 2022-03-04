import React from "react";
import "./ButtonsWrapper.css";
export default function ButtonsWrapper({ children, ...rest }) {
  return <div className="buttons-wrapper" {...rest}>{children}</div>;
}

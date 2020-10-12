import React from "react";
import "./header.css";

export function Header(props) {
  return (
    <div className={`${props.className} header-container`}>
      <div className="size-picture">{props.children}</div>
    </div>
  );
}

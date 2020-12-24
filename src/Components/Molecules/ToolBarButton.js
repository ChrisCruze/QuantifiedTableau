import React, { Component, Fragment, useEffect } from "react";

const ToolBarButton = ({ func, text }) => {
  return (
    <a
      class="navbar-minimalize minimalize-styl-2 btn btn-primary "
      href="#"
      onClick={e => {
        e.preventDefault();
        func();
      }}
    >
      {text}
    </a>
  );
};
export default ToolBarButton;

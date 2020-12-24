import React, { Component, Fragment, useEffect } from "react";

const TableauConnectorButton = ({ func }) => {
  return (
    <a
      class="navbar-minimalize minimalize-styl-2 btn btn-primary "
      href="#"
      onClick={e => {
        e.preventDefault();
        func();
      }}
    >
      Pull Data
    </a>
  );
};
export default TableauConnectorButton;

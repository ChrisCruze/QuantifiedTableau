import React, { Component, Fragment, useEffect } from "react";

const TableauConnectorButton = ({ func }) => {
  return (
    <Fragment>
      <button type="button" id="submitButton" className="btn btn-success" style={{ margin: "10px" }}>
        Get Earthquake Data!
      </button>

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
    </Fragment>
  );
};
export default TableauConnectorButton;

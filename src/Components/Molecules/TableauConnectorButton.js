import React, { Component, Fragment, useEffect } from "react";

const TableauConnectorButton = ({ tableau, connectionName }) => {
  return (
    <a
      class="navbar-minimalize minimalize-styl-2 btn btn-primary "
      href="#"
      onClick={e => {
        e.preventDefault();

        tableau.connectionName = connectionName || "Rumble Capital Visits"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
      }}
    >
      Submit Data
    </a>
  );
};
export default TableauConnectorButton;

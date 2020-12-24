import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";
import TableauConnectorButton from "../Molecules/TableauConnectorButton";

const TableauConnectorRow = () => {
  return (
    <PropsContext.Consumer>
      {({ tableau, connectionName }) => (
        <div class="row">
          <TableauConnectorButton tableau={tableau} connectionName={connectionName} />
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default TableauConnectorRow;

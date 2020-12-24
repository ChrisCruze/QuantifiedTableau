import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";
import TableauConnectorButton from "../Molecules/TableauConnectorButton";

const TableauConnectorRow = () => {
  return (
    <PropsContext.Consumer>
      {({ func }) => (
        <div class="row">
          <TableauConnectorButton func={func} />
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default TableauConnectorRow;

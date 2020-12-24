import React, { Component, useState, Fragment, useEffect } from "react";

import TableauConnectorRow from "../Organisms/TableauConnectorRow";

const TableauConnectorTemplate = () => {
  return (
    <div id="wrapper">
      <div id="page-wrapper1" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <div className="wrapper wrapper-content">
          <TableauConnectorRow />
        </div>
      </div>
    </div>
  );
};

export default TableauConnectorTemplate;

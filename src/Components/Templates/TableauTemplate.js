import React, { Component, useState, Fragment, useEffect } from "react";

import TableauRow from "../Organisms/TableauRow";

const TableauTemplate = () => {
  return (
    <div id="wrapper">
      <div id="page-wrapper1" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <div className="wrapper wrapper-content">
          <TableauRow />
        </div>
      </div>
    </div>
  );
};

export default TableauTemplate;

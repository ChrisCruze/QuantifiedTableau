import React, { Component, useState, Fragment, useEffect } from "react";
import DataTablesRowBnb from "../Organisms/DataTablesRowBnb";

const BnbTemplate = () => {
  return (
    <div id="wrapper">
      <div id="page-wrapper" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <div className="wrapper wrapper-content">
          <DataTablesRowBnb />
        </div>
      </div>
    </div>
  );
};

export default BnbTemplate;

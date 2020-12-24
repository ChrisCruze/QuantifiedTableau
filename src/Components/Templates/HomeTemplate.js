import React, { Component, useState, Fragment, useEffect } from "react";
import MetricsRow from "../Organisms/MetricsRow";
import ToolBar from "../Organisms/ToolBar";
import DataTablesRow from "../Organisms/DataTablesRow";
import ChartsRow from "../Organisms/ChartsRow";
import MaterialSwitch from "../Organisms/MaterialSwitch";
import ExperimentsGoalsRow from "../Organisms/ExperimentsGoalsRow";

const DashboardTemplate = () => {
  return (
    <div id="wrapper">
      <div id="page-wrapper1" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <ToolBar />
        <div className="wrapper wrapper-content">
          <MetricsRow />
          <ChartsRow />
          <DataTablesRow />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;

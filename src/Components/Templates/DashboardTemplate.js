import React, { Component, useState, Fragment, useEffect } from "react";
import MetricsRow from "../Organisms/MetricsRow";
import ToolBar from "../Organisms/ToolBar";
import DataTablesRow from "../Organisms/DataTablesRow";
import ChartsRow from "../Organisms/ChartsRow";
import MaterialSwitch from "../Organisms/MaterialSwitch";
import ExperimentsGoalsRow from "../Organisms/ExperimentsGoalsRow";

const DashboardTemplate = () => {
  const [graphs_switch, updateGraphsSwitch] = useState(false);
  return (
    <div id="wrapper">
      <div id="page-wrapper" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <ToolBar />
        <div className="wrapper wrapper-content">
          <MetricsRow />
          <MaterialSwitch state={graphs_switch} action={updateGraphsSwitch} label="Graphs" />
          {graphs_switch ? <ChartsRow /> : null}
          <ExperimentsGoalsRow />
          <DataTablesRow />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;

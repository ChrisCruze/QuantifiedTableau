import React, { Component, useState, Fragment, useEffect } from "react";
import MetricsRowMonday from "../Organisms/MetricsRowMonday";
import ToolBarMonday from "../Organisms/ToolBarMonday";
import DataTablesRowMonday from "../Organisms/DataTablesRowMonday";
import ChartsRowMonday from "../Organisms/ChartsRowMonday";
import MaterialSwitch from "../Organisms/MaterialSwitch";
import ExperimentsGoalsRow from "../Organisms/ExperimentsGoalsRow";

const MondayTemplate = () => {
  const [graphs_switch, updateGraphsSwitch] = useState(false);
  return (
    <div id="wrapper">
      <div id="page-wrapper" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
        <ToolBarMonday />
        <div className="wrapper wrapper-content">
          <MetricsRowMonday />
          {/* <MaterialSwitch state={graphs_switch} action={updateGraphsSwitch} label="Graphs" />
          {graphs_switch ? <ChartsRow /> : null} */}
          <ExperimentsGoalsRow />
          <ChartsRowMonday />

          <DataTablesRowMonday />
        </div>
      </div>
    </div>
  );
};

export default MondayTemplate;

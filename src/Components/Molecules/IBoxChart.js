import React, { Fragment, useEffect, useState } from "react";
import Chart from "../Atoms/ChartHook";

const IBoxChart = ({ id, title, chart_dict }) => {
  return (
    <div className={"ibox"}>
      <div className={"ibox-title"}>{title}</div>
      <div className={"ibox-content"}>
        <Chart chart_dict={chart_dict} id={id}></Chart>
      </div>
    </div>
  );
};

export default IBoxChart;

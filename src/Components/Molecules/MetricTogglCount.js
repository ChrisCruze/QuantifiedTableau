import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

const MetricTogglCount = ({ list }) => {
  const goal = 10;
  const metric = list.length;
  const color = label_color_calculate(metric, goal);
  const title = "Toggl Count";
  const label = label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricTogglCount;

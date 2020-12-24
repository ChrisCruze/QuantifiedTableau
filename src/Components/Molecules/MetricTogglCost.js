import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

const MetricTogglCost = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const metric = array_sum_from_key_name(list, "cost").toFixed(1);
  const color = "#f0ad4e"; //label_color_calculate(metric, goal);
  const title = "Toggl Cost";
  const label = "Toggl"; // label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricTogglCost;

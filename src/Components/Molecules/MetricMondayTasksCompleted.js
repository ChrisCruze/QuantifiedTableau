import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_completed(list) {
  console.log({ list });
  return list.filter(function(D) {
    return D.status == "Done";
  });
}
const MetricMondayTasksCompleted = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const metric = filter_for_completed(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Completed";
  const label = "Monday"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricMondayTasksCompleted;

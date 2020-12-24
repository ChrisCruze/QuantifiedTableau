import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";
function is_overdue_determine(input_time) {
  return !moment(input_time).isAfter(moment());
}
function filter_for_overdue(list) {
  return list.filter(function(D) {
    const is_overdue = is_overdue_determine(D["Date"]);
    const not_complete = D["Complete"] != true;
    return is_overdue && not_complete;
  });
}
const MetricAirTableGoalsOverdue = ({ list }) => {
  const goal = 10;
  const metric = filter_for_overdue(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Overdue Goals";
  const label = ""; // "AirTable"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricAirTableGoalsOverdue;

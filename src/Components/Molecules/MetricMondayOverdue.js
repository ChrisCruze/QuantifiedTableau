import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_incompleted(list) {
  return list.filter(function(D) {
    return D.completed != "Done";
  });
}

function is_overdue(input_time) {
  return !moment(input_time).isAfter(moment());
}
function filter_for_overdue(list) {
  return list.filter(function(D) {
    return D.completed != "Done" && is_overdue(D["due_date"]) && D["due_date"] != null;
  });
}

const MetricMondayOverdue = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const incomplete_list = filter_for_incompleted(list);
  const metric = filter_for_overdue(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Overdue";
  const label = "Monday"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = incomplete_list.length + " incomplete";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricMondayOverdue;

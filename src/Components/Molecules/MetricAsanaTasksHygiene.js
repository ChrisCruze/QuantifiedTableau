import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function is_hygiene(D) {
  return D["due_on"] != null && D["assignee_name"] != "NULL";
}
function filter_for_incompleted_unhygiene(list) {
  return list.filter(function(D) {
    return !D.completed && !is_hygiene(D);
  });
}

const MetricAsanaTasksHygiene = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const metric = filter_for_incompleted_unhygiene(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Dirty";
  const label = "Asana"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Count";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricAsanaTasksHygiene;

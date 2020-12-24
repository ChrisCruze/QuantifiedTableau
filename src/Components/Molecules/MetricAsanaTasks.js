import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_incompleted(list) {
  return list.filter(function(D) {
    return D.completed != true;
  });
}
const MetricAsanaTasks = ({ list, refresh }) => {
  const label_click = refresh;

  const goal = 10;
  const metric = filter_for_incompleted(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Tasks";
  const label = "Asana"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricAsanaTasks;

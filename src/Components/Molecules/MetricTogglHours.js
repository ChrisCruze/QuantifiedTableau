import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";
function filter_for_today(list) {
  return list.filter(function(D) {
    return moment(D["start"]).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD");
  });
}
const MetricTogglHours = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const total_hours_today = array_sum_from_key_name(list, "hours").toFixed(1);
  const metric = array_sum_from_key_name(filter_for_today(list), "hours").toFixed(1);
  const color = "#f0ad4e"; //label_color_calculate(metric, goal);
  const title = "Toggl Hours";
  const label = "Today"; // label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${metric}/${total_hours_today}`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricTogglHours;

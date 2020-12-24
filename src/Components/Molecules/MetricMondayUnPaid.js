import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_incompleted(list) {
  return list.filter(function(D) {
    return D.status == "Done";
  });
}
const MetricMondayUnPaid = ({ list, refresh }) => {
  const label_click = refresh;
  const fileted_list = filter_for_incompleted(list);
  const goal = 10;
  const metric = array_sum_from_key_name(fileted_list, "dollars").toFixed(1);
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Unpaid";
  const label = "Monday"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${fileted_list.length} items`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricMondayUnPaid;

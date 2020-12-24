import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_dirty(list) {
  return list.filter(function(D) {
    const due_date = D["due_date"];
    const is_empty = due_date == "" || String(D.person) == "";
    return is_empty; //|| String(D.person) == "null";
  });
}

const MetricMondayHygiene = ({ list, refresh }) => {
  const label_click = refresh;
  const goal = 10;
  const dirty_list = filter_for_dirty(list);
  const percentage = (list.length - dirty_list.length) / list.length;
  const percentage_format = format_percentage_to_string_from_decimal(percentage);

  const metric = percentage_format;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Clean";
  const label = "Monday"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${list.length - dirty_list.length}/${list.length}`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color, label_click }} />;
};
export default MetricMondayHygiene;

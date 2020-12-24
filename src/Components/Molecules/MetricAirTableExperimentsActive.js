import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function within_range_determine(start_time, end_time) {
  //console.log({ end_time });
  return moment(end_time).isAfter(moment()) && moment().isAfter(moment(start_time));
}

function filter_for_active(list) {
  return list.filter(function(D) {
    const within_range = within_range_determine(D["Start Date"], D["End Date"]);
    return within_range;
  });
}

const MetricAirTableExperiments = ({ list }) => {
  const goal = 10;
  const metric = filter_for_active(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Active Experiments";
  const label = ""; // "AirTable"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${metric}/${list.length}`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricAirTableExperiments;

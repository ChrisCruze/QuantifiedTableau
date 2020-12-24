import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

function filter_for_complete(list) {
  return list.filter(function(D) {
    const not_complete = D["Complete"] == true;
    return not_complete;
  });
}

const MetricAirTableExperiments = ({ list }) => {
  const goal = 10;
  const metric = filter_for_complete(list).length;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Experiments Done";
  const label = ""; // "AirTable"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${metric}/${list.length}`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricAirTableExperiments;

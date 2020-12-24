import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import PropsContext from "../../PropsContext";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

const MetricAirTableExpenses = ({ list }) => {
  const goal = 10;
  const metric = array_sum_from_key_name(list, "Cost").toFixed(1);
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Expenses";
  const label = "AirTable"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricAirTableExpenses;

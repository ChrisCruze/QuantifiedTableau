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
    return D["Active"] == true;
  });
}
function format_number_to_decimal(num) {
  const num_calc = parseFloat(num) || 0;
  return num_calc.toFixed(1);
}
function calculate_budget_utilization_metric(array) {
  const array_filtered = filter_for_active(array);
  const spent = array_sum_from_key_name(array_filtered, "monday_hours");
  const budget = array_sum_from_key_name(array_filtered, "hours");
  const percentage = spent / budget;
  const percentage_format = format_percentage_to_string_from_decimal(percentage);
  const spent_format = format_number_to_decimal(spent); //format_cell_number(spent);
  const budget_format = format_number_to_decimal(budget); //format_cell_number(budget);
  return { percentage_format, spent_format, budget_format };
}

const MetricAirTableExperimentsActiveBudget = ({ list }) => {
  const goal = 10;
  const { percentage_format, spent_format, budget_format } = calculate_budget_utilization_metric(list); //filter_for_active(list).length;

  const metric = percentage_format;
  const color = ""; //label_color_calculate(metric, goal);
  const title = "Budget Utilization";
  const label = ""; // "AirTable"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = `${spent_format}/${budget_format}`;
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricAirTableExperimentsActiveBudget;

import React, { Component, Fragment, useEffect } from "react";
import MetricBox from "../Atoms/MetricBox";
import { footer_calculate, label_calculate, label_color_calculate } from "./Metric.functions";

const MetricShopifyEvents = ({ list }) => {
  const goal = 10;
  const metric = list.length;
  const color = "#1ab394"; //label_color_calculate(metric, goal);
  const title = "Events";
  const label = "Shopify"; //label_calculate(metric, goal);
  const footer = footer_calculate(metric, goal);
  const sub_title = "Total";
  return <MetricBox {...{ metric, title, label, footer, sub_title, color }} />;
};
export default MetricShopifyEvents;

import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import { chart_attributes_generate } from "./Chart.functions";

function chart_group_by_calculate({ list }) {
  function calculation_func(array) {
    return array_sum_from_key_name(array, "cost");
  }
  var { keys, values } = array_group_by_calculation(list, "tags", calculation_func);
  return { labels: keys, values };
}

const ChartTogglTags = ({ list }) => {
  const { labels, values } = chart_group_by_calculate({ list });
  const chart_dict = chart_attributes_generate({ labels, values });
  const id = "toggl_tags_chart";
  return (
    <div className={"ibox"}>
      <div className={"ibox-title"}>{"Cost by Tag"}</div>
      <div className={"ibox-content"}>
        <ChartHook chart_dict={chart_dict} id={id}></ChartHook>
      </div>
    </div>
  );
};

export default ChartTogglTags;

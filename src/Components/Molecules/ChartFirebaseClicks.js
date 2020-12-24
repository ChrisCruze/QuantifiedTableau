import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import { chart_attributes_generate } from "./Chart.functions";

function chart_group_by_calculate({ list }) {
  function calculation_func(array) {
    return array.length;
  }
  var { keys, values } = array_group_by_calculation(list, "date", calculation_func);
  return { labels: keys, values };
}

const filterClicks = list => {
  return list.filter(function(D) {
    return D.click == true;
  });
};

const ChartFirebaseClicks = ({ list }) => {
  const { labels, values } = chart_group_by_calculate({ list: filterClicks(list) });
  labels.reverse();
  values.reverse();
  const chart_dict = chart_attributes_generate({ labels, values });
  const id = "firebase_clicks_chart";
  return (
    <div className={"ibox"}>
      <div className={"ibox-title"}>{"Clicks by Date"}</div>
      <div className={"ibox-content"}>
        <ChartHook chart_dict={chart_dict} id={id}></ChartHook>
      </div>
    </div>
  );
};

export default ChartFirebaseClicks;

import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import { chart_attributes_generate } from "./Chart.functions";

function resort_labels_values({ keys, values }) {
  const zipped_values = _.zip(keys, values);
  const sorted_zipped_values = _.sortBy(zipped_values, function(tup) {
    return moment(tup[0]).unix();
  });

  const sorted_keys = _.map(sorted_zipped_values, function(tup) {
    return tup[0];
  });
  const sorted_values = _.map(sorted_zipped_values, function(tup) {
    return tup[1];
  });

  return { keys: sorted_keys, values: sorted_values };
}
function chart_group_by_calculate({ list }) {
  function calculation_func(array) {
    return array.length;
  }
  var list_fileted = list.filter(function(D) {
    return D.completed == true;
  });
  var list_formatted = _.map(list_fileted, function(D) {
    return { ...D, date: moment(D["completed_at"]).format("YYYY-MM-DD") };
  });
  var { keys, values } = array_group_by_calculation(list_formatted, "date", calculation_func);
  var { keys, values } = resort_labels_values({ keys, values });
  return { labels: keys, values };
}

const ChartAsanaDates = ({ list }) => {
  const { labels, values } = chart_group_by_calculate({ list });
  const chart_dict = chart_attributes_generate({ labels, values });
  const id = "asana_dates_chart";
  return (
    <div className={"ibox"}>
      <div className={"ibox-title"}>{"Asana Tasks by Date"}</div>
      <div className={"ibox-content"}>
        <ChartHook chart_dict={chart_dict} id={id}></ChartHook>
      </div>
    </div>
  );
};

export default ChartAsanaDates;

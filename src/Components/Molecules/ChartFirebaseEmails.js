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

const filterEmails = list => {
  return list.filter(function(D) {
    return D.email != "null";
  });
};

const ChartFirebaseEmails = ({ list }) => {
  const { labels, values } = chart_group_by_calculate({ list: filterEmails(list) });
  labels.reverse();
  values.reverse();
  const chart_dict = chart_attributes_generate({ labels, values });
  const id = "firebase_emails_chart";
  return (
    <div className={"ibox"}>
      <div className={"ibox-title"}>{"Emails by Date"}</div>
      <div className={"ibox-content"}>
        <ChartHook chart_dict={chart_dict} id={id}></ChartHook>
      </div>
    </div>
  );
};

export default ChartFirebaseEmails;

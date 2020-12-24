import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
import { columns_create } from "./DataTableMonday.functions";
function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

const DataTableMondayCompleted = ({ list }) => {
  const data_filtered = list.filter(function(D) {
    return D.status == "Done"; //|| D.status == "Paid";
  });

  return (
    <DataTable
      {...{
        id: "monday_table_completed",
        columns: columns_create(),
        data: data_filtered
      }}
    />
  );
};

export default DataTableMondayCompleted;

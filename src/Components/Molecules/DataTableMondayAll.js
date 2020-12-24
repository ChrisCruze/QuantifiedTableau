import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
import { columns_create } from "./DataTableMonday.functions";
function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

const DataTableMondayAll = ({ list }) => {
  const data_filtered = list;

  return (
    <DataTable
      {...{
        id: "monday_table_all",
        columns: columns_create(),
        data: data_filtered
      }}
    />
  );
};

export default DataTableMondayAll;

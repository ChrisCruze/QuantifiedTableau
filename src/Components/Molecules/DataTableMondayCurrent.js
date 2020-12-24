import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
import { columns_create } from "./DataTableMonday.functions";

const DataTableMondayCurrent = ({ list }) => {
  const data_filtered = list.filter(function(D) {
    return D.status != "Done" && D.status != "Paid";
  });
  //const columns = datatables_columns_create_from_data(data_filtered);
  return (
    <DataTable
      {...{
        id: "monday_table_current",
        columns: columns_create(),
        data: data_filtered
      }}
    />
  );
};

export default DataTableMondayCurrent;

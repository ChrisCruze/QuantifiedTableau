import React, { Fragment, useEffect, useState } from "react";
import DataTable from "../Atoms/DataTable";

function columns_create() {
  return [
    {
      data: "url",
      name: "url",
      title: "url",
      label: "url",
      visible: true
    },
    {
      data: "date",
      name: "date",
      title: "date",
      label: "date",
      visible: true
    },
    {
      data: "email",
      name: "email",
      title: "email",
      label: "email",
      visible: true
    },
    {
      data: "click",
      name: "click",
      title: "click",
      label: "click",
      visible: true
    }
  ];
}

function sort_data(list) {
  return _.sortBy(list, function(D) {
    return moment(D["data"]).unix();
  });
}
const DataTableFirebaseVisits = ({ data, id }) => {
  const data_sorted = sort_data(data);
  return (
    <DataTable
      {...{
        id: id,
        columns: columns_create(),
        data: data_sorted
      }}
    />
  );
};

export default DataTableFirebaseVisits;

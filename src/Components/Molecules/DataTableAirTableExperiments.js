import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

function url_render(data, type, row, meta) {
  const gid = row.id;
  const url = `https://airtable.com/tblYkGnJpFyFlAUPz/viwhBe6TGjFk7lUyK/${gid}?blocks=hide`;
  return `<a target='_blank' href='${url}'>${data}</a> `;
}
function columns_create() {
  return [
    {
      data: "Name",
      name: "Name",
      title: "name",
      label: "name",
      visible: true,
      render: url_render
    },
    {
      data: "Status",
      name: "Status",
      title: "Status",
      label: "Status",
      visible: true
    },
    {
      data: "Start Date",
      name: "Start Date",
      title: "Start Date",
      label: "Start Date",
      visible: true,
      render: date_render
    },
    {
      data: "End Date",
      name: "End Date",
      title: "End Date",
      label: "End Date",
      visible: true,
      render: date_render
    },
    {
      data: "Notes",
      name: "Notes",
      title: "Notes",
      label: "Notes",
      visible: true
    },
    {
      data: "Complete",
      name: "Complete",
      title: "Complete",
      label: "Complete",
      visible: true
    },
    {
      data: "id",
      name: "id",
      title: "id",
      label: "id",
      visible: false
    }
  ];
}

const DataTableAirTableExperiments = ({ list }) => {
  console.log({ list });
  return (
    <DataTable
      {...{
        id: "airtable_experiments_table",
        columns: columns_create(),
        data: list
      }}
    />
  );
};

export default DataTableAirTableExperiments;

import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

function number_render(data, type, row, meta) {
  const num = parseFloat(data) || 0;
  return num.toFixed(1);
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
      title: "Name",
      label: "name",
      visible: true,
      render: url_render
    },
    {
      data: "Measurement",
      name: "Measurement",
      title: "Measurement",
      label: "Measurement",
      visible: true
    },
    {
      data: "Hypothesis",
      name: "Hypothesis",
      title: "Hypothesis",
      label: "Hypothesis",
      visible: false
    },
    {
      data: "hours",
      name: "hours",
      title: "Budget",
      label: "hours",
      visible: true,
      render: number_render
    },
    {
      data: "monday_hours",
      name: "monday_hours",
      title: "Spent",
      label: "monday_hours",
      visible: true,
      render: number_render
    },
    {
      data: "age",
      name: "Age",
      title: "Age",
      label: "Age",
      visible: false
    },
    {
      data: "last_modified_age",
      name: "last_modified_age",
      title: "last_modified_age",
      label: "last_modified_age",
      visible: false
    },
    {
      data: "Status",
      name: "Status",
      title: "Status",
      label: "Status",
      visible: false
    },
    {
      data: "Last Modified",
      name: "Last Modified",
      title: "Last Modified",
      label: "Last Modified",
      visible: false,
      render: date_render
    },
    {
      data: "Start Date",
      name: "Start Date",
      title: "Start Date",
      label: "Start Date",
      visible: false,
      render: date_render
    },
    {
      data: "End Date",
      name: "End Date",
      title: "End Date",
      label: "End Date",
      visible: false,
      render: date_render
    },
    {
      data: "Notes",
      name: "Notes",
      title: "Notes",
      label: "Notes",
      visible: false
    },
    {
      data: "Complete",
      name: "Complete",
      title: "Complete",
      label: "Complete",
      visible: false
    },
    {
      data: "Active",
      name: "Active",
      title: "Active",
      label: "Active",
      visible: false
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

function age_field_append_array({ list }) {
  return _.map(list, function(D) {
    return {
      ...D,
      age: moment().diff(moment(D["Start Date"]), "days") || 0,
      last_modified_age: moment().diff(moment(D["Last Modified"]), "days") || 0 //moment().diff(moment(D["Last Modified"]), "days")
    };
  });
}

const DataTableAirTableExperimentsActive = ({ list }) => {
  const list_with_age = age_field_append_array({ list });
  const filtered_list = list_with_age.filter(function(D) {
    return D["Active"] == true;
  });
  return (
    <DataTable
      {...{
        id: "airtable_experiments_active_table",
        columns: columns_create(),
        data: filtered_list
      }}
    />
  );
};

export default DataTableAirTableExperimentsActive;

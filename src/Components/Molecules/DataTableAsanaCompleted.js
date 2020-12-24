import React, { Fragment, useEffect, useState } from "react";
import ChartHook from "../Atoms/ChartHook";
import DataTable from "../Atoms/DataTable";
function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

function url_render(data, type, row, meta) {
  const project_id = row.project_id;
  const gid = row.gid;
  const url = `https://app.asana.com/0/${project_id}/${gid}`;
  return `<a target='_blank' href='${url}'>${data}</a> `;
}
function columns_create() {
  return [
    {
      data: "name",
      name: "name",
      title: "name",
      label: "name",
      visible: true,
      render: url_render
    },
    {
      data: "assignee_name",
      name: "assignee_name",
      title: "assignee_name",
      label: "assignee_name",
      visible: true
    },
    {
      data: "project_name",
      name: "project_name",
      title: "project_name",
      label: "project_name",
      visible: true
    },
    {
      data: "completed_at",
      name: "completed_at",
      title: "completed_at",
      label: "completed_at",
      visible: true,
      render: date_render
    },
    {
      data: "liked",
      name: "liked",
      title: "liked",
      label: "liked",
      visible: false,
      mData: "liked",
      sName: "liked",
      sTitle: "liked",
      bVisible: false
    },
    {
      data: "gid",
      name: "gid",
      title: "gid",
      label: "gid",
      visible: false,
      mData: "gid",
      sName: "gid",
      sTitle: "gid",
      bVisible: false
    },
    {
      data: "assignee",
      name: "assignee",
      title: "assignee",
      label: "assignee",
      visible: false,
      mData: "assignee",
      sName: "assignee",
      sTitle: "assignee",
      bVisible: false
    },
    {
      data: "assignee_status",
      name: "assignee_status",
      title: "assignee_status",
      label: "assignee_status",
      visible: false,
      mData: "assignee_status",
      sName: "assignee_status",
      sTitle: "assignee_status",
      bVisible: false
    },
    {
      data: "completed",
      name: "completed",
      title: "completed",
      label: "completed",
      visible: false,
      mData: "completed",
      sName: "completed",
      sTitle: "completed",
      bVisible: false
    },

    {
      data: "created_at",
      name: "created_at",
      title: "created_at",
      label: "created_at",
      visible: false,
      mData: "created_at",
      sName: "created_at",
      sTitle: "created_at",
      bVisible: false
    },
    {
      data: "due_at",
      name: "due_at",
      title: "due_at",
      label: "due_at",
      visible: false,
      mData: "due_at",
      sName: "due_at",
      sTitle: "due_at",
      bVisible: false
    },
    {
      data: "due_on",
      name: "due_on",
      title: "due_on",
      label: "due_on",
      visible: false,
      mData: "due_on",
      sName: "due_on",
      sTitle: "due_on",
      bVisible: false
    },
    {
      data: "followers",
      name: "followers",
      title: "followers",
      label: "followers",
      visible: false,
      mData: "followers",
      sName: "followers",
      sTitle: "followers",
      bVisible: false
    },
    {
      data: "hearted",
      name: "hearted",
      title: "hearted",
      label: "hearted",
      visible: false,
      mData: "hearted",
      sName: "hearted",
      sTitle: "hearted",
      bVisible: false
    },
    {
      data: "hearts",
      name: "hearts",
      title: "hearts",
      label: "hearts",
      visible: false,
      mData: "hearts",
      sName: "hearts",
      sTitle: "hearts",
      bVisible: false
    },

    {
      data: "likes",
      name: "likes",
      title: "likes",
      label: "likes",
      visible: false,
      mData: "likes",
      sName: "likes",
      sTitle: "likes",
      bVisible: false
    },
    {
      data: "memberships",
      name: "memberships",
      title: "memberships",
      label: "memberships",
      visible: false,
      mData: "memberships",
      sName: "memberships",
      sTitle: "memberships",
      bVisible: false
    },
    {
      data: "modified_at",
      name: "modified_at",
      title: "modified_at",
      label: "modified_at",
      visible: false,
      mData: "modified_at",
      sName: "modified_at",
      sTitle: "modified_at",
      bVisible: false
    },

    {
      data: "notes",
      name: "notes",
      title: "notes",
      label: "notes",
      visible: false,
      mData: "notes",
      sName: "notes",
      sTitle: "notes",
      bVisible: false
    },
    {
      data: "num_hearts",
      name: "num_hearts",
      title: "num_hearts",
      label: "num_hearts",
      visible: false,
      mData: "num_hearts",
      sName: "num_hearts",
      sTitle: "num_hearts",
      bVisible: false
    },
    {
      data: "num_likes",
      name: "num_likes",
      title: "num_likes",
      label: "num_likes",
      visible: false,
      mData: "num_likes",
      sName: "num_likes",
      sTitle: "num_likes",
      bVisible: false
    },
    {
      data: "parent",
      name: "parent",
      title: "parent",
      label: "parent",
      visible: false,
      mData: "parent",
      sName: "parent",
      sTitle: "parent",
      bVisible: false
    },
    {
      data: "projects",
      name: "projects",
      title: "projects",
      label: "projects",
      visible: false,
      mData: "projects",
      sName: "projects",
      sTitle: "projects",
      bVisible: false
    },
    {
      data: "resource_type",
      name: "resource_type",
      title: "resource_type",
      label: "resource_type",
      visible: false,
      mData: "resource_type",
      sName: "resource_type",
      sTitle: "resource_type",
      bVisible: false
    },
    {
      data: "start_on",
      name: "start_on",
      title: "start_on",
      label: "start_on",
      visible: false,
      mData: "start_on",
      sName: "start_on",
      sTitle: "start_on",
      bVisible: false
    },
    {
      data: "tags",
      name: "tags",
      title: "tags",
      label: "tags",
      visible: false,
      mData: "tags",
      sName: "tags",
      sTitle: "tags",
      bVisible: false
    },
    {
      data: "resource_subtype",
      name: "resource_subtype",
      title: "resource_subtype",
      label: "resource_subtype",
      visible: false,
      mData: "resource_subtype",
      sName: "resource_subtype",
      sTitle: "resource_subtype",
      bVisible: false
    },
    {
      data: "workspace",
      name: "workspace",
      title: "workspace",
      label: "workspace",
      visible: false,
      mData: "workspace",
      sName: "workspace",
      sTitle: "workspace",
      bVisible: false
    },

    {
      data: "age",
      name: "age",
      title: "age",
      label: "age",
      visible: false,
      mData: "age",
      sName: "age",
      sTitle: "age",
      bVisible: false
    }
  ];
}

function sort_data(list) {
  return _.sortBy(list, function(D) {
    return moment(D["completed_at"]).unix();
  });
}
const DataTableAsanaCompleted = ({ list }) => {
  const data_filtered = list.filter(function(D) {
    return D.completed == true;
  });
  const data_sorted = sort_data(data_filtered);
  console.log({ data_sorted });
  return (
    <DataTable
      {...{
        id: "asana_table_completed",
        columns: columns_create(),
        data: data_sorted
      }}
    />
  );
};

export default DataTableAsanaCompleted;

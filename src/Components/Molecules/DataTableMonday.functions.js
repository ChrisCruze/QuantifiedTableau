function date_render(data, type, row, meta) {
  return moment(data).format("MM/DD/YY hh:mmA (dd)");
}

function url_render(data, type, row, meta) {
  const project_id = row.board_id;
  const gid = row.id;
  const url = `https://cruz-enterprise-team.monday.com/boards/${project_id}/pulses/${gid}`;

  return `<a target='_blank' href='${url}'>${data}</a> `;
}

function number_render(data, type, row, meta) {
  const num = parseFloat(data) || 0;
  return num.toFixed(1);
}
export function columns_create() {
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
      data: "status",
      name: "status",
      title: "status",
      label: "status",
      visible: true
    },
    {
      data: "group_title",
      name: "group_title",
      title: "group_title",
      label: "group_title",
      visible: true
    },
    {
      data: "person",
      name: "person",
      title: "person",
      label: "person",
      visible: true
    },
    {
      data: "due_date",
      name: "due_date",
      title: "due_date",
      label: "due_date",
      visible: true
    },
    {
      data: "minutes",
      name: "minutes",
      title: "minutes",
      label: "minutes",
      visible: true,
      render: number_render
    },
    {
      data: "dollars",
      name: "dollars",
      title: "dollars",
      label: "dollars",
      visible: true,
      render: number_render
    },
    {
      data: "seconds",
      name: "seconds",
      title: "seconds",
      label: "seconds",
      visible: false
    },

    {
      data: "hours",
      name: "hours",
      title: "hours",
      label: "hours",
      visible: false
    },
    {
      data: "priority",
      name: "priority",
      title: "priority",
      label: "priority",
      visible: false
    },

    {
      data: "age",
      name: "age",
      title: "age",
      label: "age",
      visible: false
    },
    {
      data: "column_values",
      name: "column_values",
      title: "column_values",
      label: "column_values",
      visible: false
    },
    {
      data: "board",
      name: "board",
      title: "board",
      label: "board",
      visible: false
    },
    {
      data: "id",
      name: "id",
      title: "id",
      label: "id",
      visible: false
    },
    {
      data: "board_id",
      name: "board_id",
      title: "board_id",
      label: "board_id",
      visible: false
    },
    {
      data: "created_at",
      name: "created_at",
      title: "created_at",
      label: "created_at",
      visible: false
    },
    {
      data: "updated_at",
      name: "updated_at",
      title: "updated_at",
      label: "updated_at",
      visible: true,
      render: date_render
    },
    {
      data: "state",
      name: "state",
      title: "state",
      label: "state",
      visible: false
    },
    {
      data: "__typename",
      name: "__typename",
      title: "__typename",
      label: "__typename",
      visible: false
    },

    {
      data: "check",
      name: "check",
      title: "check",
      label: "check",
      visible: false
    },

    {
      data: "date4",
      name: "date4",
      title: "date4",
      label: "date4",
      visible: false
    },
    {
      data: "status1",
      name: "status1",
      title: "status1",
      label: "status1",
      visible: false
    },
    {
      data: "time_tracking",
      name: "time_tracking",
      title: "time_tracking",
      label: "time_tracking",
      visible: false
    },
    {
      data: "tags",
      name: "tags",
      title: "tags",
      label: "tags",
      visible: false
    },
    {
      data: "board_name",
      name: "board_name",
      title: "board_name",
      label: "board_name",
      visible: false
    }
  ];
}

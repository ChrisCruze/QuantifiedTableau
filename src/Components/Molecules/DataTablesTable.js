import React, { Component, Fragment, useEffect } from "react";

function datatables_firebase_react_editor_function_actions_create(data, editor_create_function) {
  const items_to_add = Object.values(data.data);
  items_to_add.forEach(function(item) {
    editor_create_function(item);
  });
}

function datatables_firebase_react_editor_function_actions_edit(json, editor_update_function) {
  const json_array = json.data;
  json_array.forEach(function(D) {
    editor_update_function(D);
  });
}

function datatables_firebase_react_editor_function_actions_remove(data, editor_delete_function) {
  const items_to_delete = Object.values(data.data);
  items_to_delete.forEach(function(D) {
    editor_delete_function(D);
  });
}

function datatables_firebase_react_editor_function_actions_apply(
  editor_object,
  editor_create_function,
  editor_update_function,
  editor_delete_function
) {
  editor_object.on("postSubmit", function(e, json, data, action, xhr) {
    if (action == "create") {
      return datatables_firebase_react_editor_function_actions_create(data, editor_create_function);
    } else if (action == "edit") {
      return datatables_firebase_react_editor_function_actions_edit(json, editor_update_function);
    } else if (action == "remove") {
      return datatables_firebase_react_editor_function_actions_remove(data, editor_delete_function);
    } else {
      return false;
    }
  });
  return editor_object;
}

function datatables_config_buttons_create_base_editor(editor) {
  const button_params = [
    {
      extend: "excel",
      title: document.title
    },
    {
      extend: "colvis",
      title: document.title
    },
    {
      extend: "create",
      editor: editor,
      text: "Create"
    },
    {
      extend: "remove",
      editor: editor
    },
    {
      extend: "edit",
      editor: editor
    },
    {
      text: "Clear",
      name: "Clear",
      action: function(e, dt, node, config) {
        dt.columns("")
          .search("")
          .draw();
        $.fn.dataTable.ext.search = [];
        dt.draw();
      }
    }
  ];
  return button_params;
}

function datatables_config_create_base({ data, columns, buttons }) {
  const config = {
    dom: '<"html5buttons"B>lTfgitp',
    data: data,
    columns: columns,
    select: true,
    paging: false,
    scrollX: true,
    buttons: buttons
  };
  return config;
}

function datatables_column_create_from_field_name(field_name) {
  result_dict = {
    data: field_name,
    name: field_name,
    title: field_name,
    label: field_name,
    visible: false
  };
  return result_dict;
}

function datatables_columns_create_from_field_names(field_names) {
  columns = _.map(field_names, function(field_name) {
    return datatables_column_create_from_field_name(field_name);
  });
  return columns;
}

function editor_object_create({ id, idSrc, fields }) {
  return new $.fn.dataTable.Editor({
    table: "#" + id,
    idSrc: idSrc,
    fields: fields
  });
}

function datatables_determine_create_update({ selector, config, data }) {
  if (!$.fn.DataTable.isDataTable(selector)) {
    $(selector).DataTable(config);
  } else {
    $(selector)
      .DataTable()
      .rows()
      .remove()
      .draw();
    $(selector)
      .DataTable()
      .rows.add(data)
      .draw();
  }
}

function datatables_determine_create_update_with_editor({ selector, config, data }) {
  if (!$.fn.DataTable.isDataTable(selector)) {
    $(selector).DataTable(config);
  } else {
    $(selector)
      .DataTable()
      .rows()
      .remove()
      .draw();
    $(selector)
      .DataTable()
      .rows.add(data)
      .draw();
  }
}

function implement_inline_click({ id, editor }) {
  $("#" + id).on("click", "tbody td:not(:first-child)", function(e) {
    editor.inline(this);
  });
}

function implement_click_event(editor_object) {
  function editor_create_function() {
    console.log("create");
  }
  function editor_update_function() {
    console.log("update");
  }

  function editor_delete_function() {
    console.log("delete");
  }
  datatables_firebase_react_editor_function_actions_apply(
    editor_object,
    editor_create_function,
    editor_update_function,
    editor_delete_function
  );
}
const DataTablesTable = ({ id, idSrc, fields, data, columns }) => {
  try {
    const editor = editor_object_create({ id, idSrc, fields });
    const buttons = datatables_config_buttons_create_base_editor(editor);
    const config = datatables_config_create_base({ data, columns: columns || datatables_columns_create_from_data(data), buttons });
    implement_inline_click({ id, editor });
    implement_click_event(editor);

    datatables_determine_create_update({ selector: "#" + id, config, data });
  } catch (err) {
    console.log({ err });
  }
  return <table className="table table-striped" id={id} style={{ width: "100%" }}></table>;
};

export default DataTablesTable;

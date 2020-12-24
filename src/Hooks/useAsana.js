import React, { Fragment, useState, useEffect } from "react";
import { local_storage_pull_run_data, local_storage_get, local_storage_save } from "./localStorage.functions";

function asana_users_me_get() {
  const result = $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/users/me",
    dataType: "json",
    async: false,
    data: {
      access_token: "0/b2cf1e0b1b07fc536cea4914aa3d488d"
    }
  });
  return result.responseJSON;
}

function asana_workspaces_get() {
  const result = $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/workspaces",
    dataType: "json",
    async: false,
    data: {
      access_token: "0/b2cf1e0b1b07fc536cea4914aa3d488d"
    }
  });
  return result.responseJSON;
}

function asana_projects_get(callback) {
  const result = $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/projects",
    dataType: "json",
    async: false,
    data: {
      access_token: "0/b2cf1e0b1b07fc536cea4914aa3d488d",
      workspace: 1155421684873369
    }
  });
  result.then(response => {
    console.log({ response });
    callback(response["data"]);
  });
  console.log({ result });
  return result.responseJSON["data"];
}

function asana_tasks_get(project_id) {
  const result = $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/projects/" + project_id + "/tasks",
    dataType: "json",
    async: false,
    data: {
      access_token: "0/b2cf1e0b1b07fc536cea4914aa3d488d"
    }
  });
  return result.responseJSON["data"];
  //
}

function asana_task_get(task_id) {
  const result = $.ajax({
    type: "GET",
    url: "https://app.asana.com/api/1.0/tasks/" + task_id,
    dataType: "json",
    async: false,
    data: {
      access_token: "0/b2cf1e0b1b07fc536cea4914aa3d488d"
    }
  });
  return result.responseJSON["data"];
}

function combine_grouped_lists_to_one(grouped_list) {
  return _.reduce(
    grouped_list,
    function(memo, num) {
      return memo.concat(num);
    },
    []
  );
}
function asana_tasks_get_from_projects(projects_array) {
  var tasks_group_together = _.map(projects_array, function(D) {
    var tasks_group = asana_tasks_get(D["gid"]);
    return tasks_group;
  });
  return combine_grouped_lists_to_one(tasks_group_together);
}

function asana_task_detail_custom_fields_apply_dictionary_project_name(D) {
  var project_list = D["projects"];
  if (project_list.length > 0) {
    var project_name = project_list[0]["name"];
  } else {
    var project_name = "NULL";
  }
  return project_name;
}

function asana_task_detail_custom_fields_apply_dictionary_project_id(D) {
  var project_list = D["projects"];
  if (project_list.length > 0) {
    var project_name = project_list[0]["gid"];
  } else {
    var project_name = "NULL";
  }
  return project_name;
}

function asana_task_detail_custom_fields_apply_dictionary_assigne_name(D) {
  var assignee_dict = D["assignee"];
  if (assignee_dict != undefined) {
    var assignee_name = assignee_dict["name"];
  } else {
    var assignee_name = "NULL";
  }
  return assignee_name;
}

function asana_task_detail_custom_fields_apply_dictionary(D) {
  D["assignee_name"] = asana_task_detail_custom_fields_apply_dictionary_assigne_name(D);
  D["project_name"] = asana_task_detail_custom_fields_apply_dictionary_project_name(D);
  D["project_id"] = asana_task_detail_custom_fields_apply_dictionary_project_id(D);
  D["age"] = moment().diff(moment(D["created_at"]), "days");
  return D;
}

function asana_task_detail_custom_fields_apply_list(array) {
  var l = [];
  array.forEach(function(D) {
    var new_dict = asana_task_detail_custom_fields_apply_dictionary(D);
    l.push(new_dict);
  });
  return l;
}

function projects_from_local_storage() {
  return local_storage_pull_run_data({ func: asana_projects_get, name: "projects" });
}

function projects_from_local() {
  return [
    {
      gid: "1155421685999369",
      name: "Dropshipping",
      resource_type: "project"
    },
    {
      gid: "1155421685999374",
      name: "Bnb",
      resource_type: "project"
    },
    {
      gid: "1155714771303825",
      name: "XYZ",
      resource_type: "project"
    }
  ];
}

function asana_tasks_detail_pull() {
  const projects_array = projects_from_local(); //projects_from_local_storage(); //asana_projects_get();
  var full_array = asana_tasks_get_from_projects(projects_array);
  var task_details = _.map(full_array, function(D) {
    return asana_task_get(D["gid"]);
  });
  return asana_task_detail_custom_fields_apply_list(task_details);
}

function filter_for_only_need_to_pull(local_asana_tasks, full_array) {
  const local_asana_tasks_completed = local_asana_tasks.filter(function(D) {
    return D["completed"] == true;
  });
  const local_asana_tasks_completed_gid = _.map(local_asana_tasks_completed, "gid");
  const uncompleted_tasks = full_array.filter(function(D) {
    return local_asana_tasks_completed_gid.indexOf(D["gid"]) == -1;
  });
  return uncompleted_tasks;
}

//this combines the result of completed tasks with the results of it
function todoist_completed_combine(todoist_loaded_new_array, todoist_loaded_old_array) {
  const todoist_loaded_new = array_groupby_flat(todoist_loaded_new_array, "gid");
  const todoist_loaded_old = array_groupby_flat(todoist_loaded_old_array, "gid");
  const todoist_complete_dict = Object.assign({}, todoist_loaded_old, todoist_loaded_new);
  const todoist_data = Object.values(todoist_complete_dict);
  return todoist_data;
}
function filter_asana_cache_for_not_in_full_array({ local_asana_tasks, full_array }) {
  const full_array_gid = _.map(full_array, "gid");
  const local_asana_tasks_filtered_for_deleted = local_asana_tasks.filter(function(D) {
    return full_array_gid.indexOf(D["gid"]) > -1;
  });
  return local_asana_tasks_filtered_for_deleted;
}
function combined_query_list({ local_asana_tasks, full_array }) {
  var full_array_to_pull = filter_for_only_need_to_pull(local_asana_tasks, full_array);

  var task_details_pulled = _.map(full_array_to_pull, function(D) {
    return asana_task_get(D["gid"]);
  });
  const local_asana_tasks_filtered = filter_asana_cache_for_not_in_full_array({ local_asana_tasks, full_array });
  const combined_list = todoist_completed_combine(task_details_pulled, local_asana_tasks_filtered);
  return combined_list;
}

function asana_tasks_detail_pull_with_local_storage() {
  const local_asana_tasks = local_storage_get("asana");
  const projects_array = asana_projects_get(); // projects_from_local(); //projects_from_local_storage(); //asana_projects_get();
  var full_array = asana_tasks_get_from_projects(projects_array);
  const combined_list = combined_query_list({ local_asana_tasks, full_array });

  local_storage_save("asana", combined_list);
  return asana_task_detail_custom_fields_apply_list(combined_list);
}

const useAsana = () => {
  const [asana_list, updateAsanaList] = useState(local_storage_get("asana"));
  const [time_stamp, updateTimeStamp] = useState(local_storage_get("asana_time_stamp"));

  function refreshAsana() {
    const data = asana_tasks_detail_pull_with_local_storage();
    updateAsanaList(data);
    local_storage_save("asana", data);
    updateTimeStamp(moment().format("MM/DD/YY hh:mmA (dd)"));
    local_storage_save("asana_time_stamp", moment().format("MM/DD/YY hh:mmA (dd)"));
  }

  useEffect(() => {
    //refreshAsana();
  }, []);
  return { asana_list, refreshAsana, time_stamp };
};
export default useAsana;

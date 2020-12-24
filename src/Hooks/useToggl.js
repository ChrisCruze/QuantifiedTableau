import React, { Fragment, useState, useEffect } from "react";
import { local_storage_get, local_storage_save } from "./localStorage.functions";

function toggl_time_fields(dur) {
  var minutes = parseFloat(dur) / 1000 / 60;
  var hours = minutes / 60;
  var cost = hours * 15;
  return { minutes, hours, cost };
}

function toggl_list_to_time_fields(list) {
  return _.map(list, function(obj) {
    return { ...obj, ...toggl_time_fields(obj.dur), date: moment(obj.end).format("YYYY-MM-DD") };
  });
}

function pullToggl({ updateData, api_token, user_agent, workspace_id }) {
  // var api_token = "4c2e7a7083b4434da3fda4fef989f353";
  return $.ajax({
    type: "GET",
    url: "https://toggl.com/reports/api/v2/details",
    headers: {
      Authorization: "Basic " + btoa(api_token + ":" + "api_token")
    },
    dataType: "json",
    async: false,
    data: {
      user_agent: user_agent || "vdermwcc@gmail.com",
      workspace_id: workspace_id || "2429477"
    }
  }).then(response => {
    var response_data = response.data;
    var response_data_with_time = toggl_list_to_time_fields(response_data);
    updateData(response_data_with_time);
  });
}

function pullTogglPage({ updateData, api_token, user_agent, workspace_id, since, page, toggl_list }) {
  const result = $.ajax({
    type: "GET",
    url: "https://toggl.com/reports/api/v2/details",
    headers: {
      Authorization: "Basic " + btoa(api_token + ":" + "api_token")
    },
    dataType: "json",
    async: false,
    data: {
      user_agent: user_agent || "vdermwcc@gmail.com",
      workspace_id: workspace_id || "2429477",
      since: since,
      page: page
    }
  });
  console.log({ result });
  return result.responseJSON.data;
  //.responseJSON.data;
}

function pullTogglPageAll({ updateData, api_token, user_agent, workspace_id, toggl_list }) {
  const since = "2019-12-01";
  var todoist_tasks_pulled = [];
  var iterator = 0;
  var master_list = [];
  while (todoist_tasks_pulled.length == 50 || iterator == 0) {
    const page = iterator + 1; //this will go into the todoist completed tasks query
    console.log({ page });
    var todoist_tasks_pulled = pullTogglPage({ updateData, api_token, user_agent, workspace_id, since, page, toggl_list });
    master_list = master_list.concat(todoist_tasks_pulled);
    iterator += 1; //this will be 1 in the first loop, 2 in the second loop, etc.
  }
  console.log({ master_list });
  return master_list;
}

const useToggl = ({ api_token, user_agent, workspace_id }) => {
  const [toggl_list, updateToggl] = useState(local_storage_get("toggl_" + user_agent));
  function refreshToggl() {
    var toggl_data = pullTogglPageAll({ updateData: updateToggl, api_token, user_agent, workspace_id, toggl_list });
    var response_data_with_time = toggl_list_to_time_fields(toggl_data);
    local_storage_save("toggl_" + user_agent, response_data_with_time);
    updateToggl(response_data_with_time);
    // pullToggl({ updateToggl, api_token, user_agent, workspace_id });
  }
  useEffect(() => {
    //refreshToggl();
  }, []);
  return { toggl_list, refreshToggl };
};
export default useToggl;

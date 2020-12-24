import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";
import ToolBarButton from "../Molecules/ToolBarButton";
function airtable_array(toggl_list) {
  function airtable_object_convert(obj) {
    return {
      description: obj.description,
      toggl_id: String(obj.id),
      dur: obj.dur,
      start: obj.start,
      end: obj.end
    };
  }
  return _.map(toggl_list, airtable_object_convert);
}

function filter_toggl_for_updated(toggl_list, airtable_data) {
  const uploaded_toggl_ids = _.map(airtable_data, "toggl_id");
  return toggl_list.filter(function(obj) {
    return uploaded_toggl_ids.indexOf(String(obj.id)) == -1;
  });
}

function sync_airtable_data({ airtable_toggl_list, toggl_list }) {
  const toggl_list_filtered = filter_toggl_for_updated(toggl_list, airtable_toggl_list);
  console.log({ toggl_list_filtered });
  const toggl_list_converted = airtable_array(toggl_list_filtered);
  if (toggl_list_converted.length > 0) {
    console.log({ toggl_list_converted });
    createAirTable(toggl_list_converted);
  }
}
const ToolBarMonday = () => {
  return (
    <PropsContext.Consumer>
      {({ sync_toggl_airtable, monday_dict, asana_time_stamp, refreshAsana, refresh_data, local_storage_time_stamp, asana_list }) => (
        <div class="row border-bottom">
          <nav class="navbar navbar-static-top" role="navigation" style={{ marginBottom: "0" }}>
            <div class="navbar-header">
              <a
                class="navbar-minimalize minimalize-styl-2 btn btn-primary "
                href="#"
                onClick={e => {
                  e.preventDefault();
                  refresh_data();
                }}
              >
                Refresh
                {/* <i class="fa fa-bars"></i> */}
              </a>

              <ToolBarButton
                text="Refresh Monday"
                func={() => {
                  monday_dict.refetch();
                  toastr_notify("Monday Refreshed");
                }}
              />
              <form role="search" class="navbar-form-custom" action="search_results.html">
                <div class="form-group">
                  <input type="text" placeholder="" class="form-control" name="top-search" id="top-search" />
                </div>
              </form>
            </div>
            <ul class="nav navbar-top-links navbar-right">
              <li>
                <span class="m-r-sm text-muted welcome-message">{local_storage_time_stamp}</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default ToolBarMonday;

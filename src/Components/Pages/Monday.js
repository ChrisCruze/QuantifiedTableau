import React, { Component, Fragment, useEffect, useState } from "react";
import useAirTable from "../../Hooks/useAirTable";
import useToggl from "../../Hooks/useToggl";
import useAsana from "../../Hooks/useAsana";
import useShopify from "../../Hooks/useShopify";
import useIP from "../../Hooks/useIP";
import { slack_message } from "../../Hooks/useSlack";

import MondayTemplate from "../Templates/MondayTemplate";
import useMonday, { useMondayQuery } from "../../Hooks/useMonday";
import PropsContext from "../../PropsContext";
import { local_storage_get, local_storage_save } from "../../Hooks/localStorage.functions";
import { airtable_expenses_monday_merge } from "./Monday.functions";
function airtable_array(toggl_list) {
  function airtable_object_convert(obj) {
    return {
      description: obj.description,
      toggl_id: String(obj.id),
      dur: obj.dur,
      start: obj.start,
      end: obj.end,
      cost: obj.cost,
      hours: obj.hours,
      minutes: obj.minutes
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

const MondayWithProvider = ({
  monday_dict,
  refreshToggl,
  airtableExpenses,
  airtableGoals,
  airtableExperiments,
  refresh_data,
  toggl_list,
  airtableToggl
}) => {
  const airtable_experiments_list = airtable_expenses_monday_merge({
    airtable_experiments_list: airtableExperiments.airtable_list,
    monday_list: monday_dict["data"]
  });
  return (
    <Fragment>
      <PropsContext.Provider
        value={{
          refreshToggl: refreshToggl,
          monday_list: monday_dict["data"],
          monday_dict,
          monday_refresh: monday_dict["refetch"],
          airtable_goals_list: airtableGoals.airtable_list,
          airtable_experiments_list,
          refresh_data: refresh_data,
          toggl_list,
          airtable_toggl_list: airtableToggl.airtable_list,
          airtable_expenses_list: airtableExpenses.airtable_list
        }}
      >
        <MondayTemplate />
      </PropsContext.Provider>
    </Fragment>
  );
};
//airtable update data
//airtable create data
//filter toggle for those that are in the toggle id of airtable and then create
const Monday = () => {
  const { toggl_list, refreshToggl } = useToggl({
    api_token: "4c2e7a7083b4434da3fda4fef989f353",
    user_agent: "vdermwcc@gmail.com",
    workspace_id: "2429477"
  });

  const { asana_list, refreshAsana, time_stamp } = useAsana();
  // const { airtable_list, updateAirTable, base, refreshAirTable, createAirTable } = useAirTable({
  //   id: "appeAwIP72LKu9UgT",
  //   name: "Toggl",
  //   keys: ["description", "start", "end", "toggl_id", "dur"]
  // });
  const [local_storage_time_stamp, updateLocalStorageTimeStamp] = useState(local_storage_get("time_stamp"));

  const { ip_object, refreshIP } = useIP();
  const airtableToggl = useAirTable({
    id: "appeAwIP72LKu9UgT",
    name: "Toggl",
    keys: ["description", "start", "end", "toggl_id", "dur"]
  });
  const airtableExpenses = useAirTable({
    id: "appeAwIP72LKu9UgT",
    name: "Expenses",
    keys: ["Name", "Cost", "Date"]
  });
  const airtableGoals = useAirTable({
    id: "appeAwIP72LKu9UgT",
    name: "Goals",
    keys: ["Name", "Notes", "Date", "Complete"]
  });

  const airtableExperiments = useAirTable({
    id: "appeAwIP72LKu9UgT",
    name: "Experiments",
    keys: ["Name", "Measurement", "Hypothesis", "Complete", "Start Date", "End Date", "Notes", "Status", "Active", "Last Modified", "hours"]
  });

  const monday_dict = useMondayQuery();

  function refresh_data() {
    // localStorage.setItem("asana", JSON.stringify([]));

    updateLocalStorageTimeStamp(moment().format("MM/DD/YY hh:mmA (dd)"));
    local_storage_save("time_stamp", moment().format("MM/DD/YY hh:mmA (dd)"));

    //refreshAsana();
    // toastr_notify("asana refreshed");
    airtableToggl.refreshAirTable();
    toastr_notify("AirTable Toggl");

    airtableExpenses.refreshAirTable();
    toastr_notify("AirTable Expenses");

    airtableGoals.refreshAirTable();
    toastr_notify("AirTable Goals");

    airtableExperiments.refreshAirTable();
    toastr_notify("AirTable Experiments");

    refreshToggl();
    toastr_notify("toggle refreshed");
  }
  useEffect(() => {
    if (local_storage_time_stamp.length == 0) {
      refresh_data();
    }
  }, [local_storage_time_stamp]);

  function createAirTableData() {
    const toggl_list_filtered = filter_toggl_for_updated(toggl_list, airtableToggl.airtable_list);
    console.log({ toggl_list_filtered });
    const toggl_list_converted = airtable_array(toggl_list_filtered);
    if (toggl_list_converted.length > 0) {
      console.log({ toggl_list_converted });
      airtableToggl.createAirTable(toggl_list_converted.slice(0, 9));
    }
  }

  return (
    <Fragment>
      <MondayWithProvider
        {...{ monday_dict, refreshToggl, airtableGoals, airtableExperiments, refresh_data, toggl_list, airtableToggl, airtableExpenses }}
      />
      {/* <PropsContext.Provider
        value={{
          local_storage_time_stamp: local_storage_time_stamp,
          refreshToggl: refreshToggl,
          asana_time_stamp: time_stamp,
          refreshAsana: refreshAsana,
          monday_list: monday_dict["data"],
          monday_dict,
          monday_refresh: monday_dict["refetch"],
          airtable_goals_list: airtableGoals.airtable_list,
          airtable_experiments_list: airtableExperiments.airtable_list,
          refresh_data: refresh_data,
          sync_toggl_airtable: createAirTableData,
          toggl_list,
          airtable_toggl_list: airtableToggl.airtable_list,
          airtable_expenses_list: airtableExpenses.airtable_list,
          asana_list
        }}
      >
        <MondayTemplate />
      </PropsContext.Provider> */}
    </Fragment>
  );
};

export default Monday;

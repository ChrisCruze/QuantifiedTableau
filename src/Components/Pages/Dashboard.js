import React, { Component, Fragment, useEffect, useState } from "react";
import useAirTable from "../../Hooks/useAirTable";
import useToggl from "../../Hooks/useToggl";
import useAsana from "../../Hooks/useAsana";
import useShopify from "../../Hooks/useShopify";
import useIP from "../../Hooks/useIP";
import { slack_message } from "../../Hooks/useSlack";

import DashboardTemplate from "../Templates/DashboardTemplate";
import useMonday, { useMondayQuery } from "../../Hooks/useMonday";
import PropsContext from "../../PropsContext";
import { local_storage_get, local_storage_save } from "../../Hooks/localStorage.functions";
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
//airtable update data
//airtable create data
//filter toggle for those that are in the toggle id of airtable and then create
const Dashboard = () => {
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
    keys: ["Name", "Measurement", "Hypothesis", "Complete", "Start Date", "End Date", "Notes", "Status", "Active", "Last Modified"]
  });

  const monday_result = useMonday();
  console.log({ monday_result });
  const monday_dict = useMondayQuery();

  // const shopifyOrders = useShopify({
  //   name: "orders"
  // });

  // const shopifyProducts = useShopify({
  //   name: "products"
  // });
  // const shopifyCustomers = useShopify({
  //   name: "customers"
  // });
  // const shopifyEvents = useShopify({
  //   name: "events"
  // });
  console.log({ monday_dict, toggl_list, asana_list, airtableToggl });
  // function sync() {
  //   refreshToggl();
  //   refreshAirTable();
  // }
  function refresh_data() {
    // localStorage.setItem("asana", JSON.stringify([]));

    updateLocalStorageTimeStamp(moment().format("MM/DD/YY hh:mmA (dd)"));
    local_storage_save("time_stamp", moment().format("MM/DD/YY hh:mmA (dd)"));

    refreshToggl();
    toastr_notify("toggle refreshed");

    refreshAsana();
    toastr_notify("asana refreshed");
    airtableToggl.refreshAirTable();
    toastr_notify("AirTable Toggl");

    airtableExpenses.refreshAirTable();
    toastr_notify("AirTable Expenses");

    airtableGoals.refreshAirTable();
    toastr_notify("AirTable Goals");

    airtableExperiments.refreshAirTable();
    toastr_notify("AirTable Experiments");
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
      <PropsContext.Provider
        value={{
          //shopify_orders: shopifyOrders.shopify_list,
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
          //shopify_products: shopifyProducts.shopify_list,
          //shopify_customers: shopifyCustomers.shopify_list,
          // shopify_events: shopifyEvents.shopify_list,
          sync_toggl_airtable: createAirTableData,
          toggl_list,
          airtable_toggl_list: airtableToggl.airtable_list,
          airtable_expenses_list: airtableExpenses.airtable_list,
          asana_list
        }}
      >
        <DashboardTemplate />
      </PropsContext.Provider>
      {/* <div id="wrapper">
        <div id="page-wrapper" class="gray-bg dashbard-1" style={{ minHeight: "764px" }}>
          <button
            onClick={e => {
              e.preventDefault();
              sync();
            }}
          >
            Refresh
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              createAirTableData();
            }}
          >
            Upload
          </button>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Dashboard;

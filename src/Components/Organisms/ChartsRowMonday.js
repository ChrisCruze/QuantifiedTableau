import React, { Component, Fragment, useEffect } from "react";
import DataTablesTable from "../Molecules/DataTablesTable";
import PropsContext from "../../PropsContext";
import ChartTogglTags from "../Molecules/ChartTogglTags";
import ChartTogglDates from "../Molecules/ChartTogglDates";
import ChartAsanaDates from "../Molecules/ChartAsanaDates";

const ChartsRowMonday = ({ toggl_list, airtable_list, asana_list }) => {
  return (
    <PropsContext.Consumer>
      {({
        airtable_expenses_list,
        toggl_list,
        airtable_toggl_list,
        asana_list,
        shopify_orders,
        shopify_events,
        shopify_customers,
        shopify_products,
        airtable_experiments_list,
        airtable_goals_list,
        refreshToggl,
        refreshAsana
      }) => {
        return (
          <div class="row">
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartTogglTags list={toggl_list} />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartTogglDates list={toggl_list} />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PropsContext.Consumer>
  );
};

export default ChartsRowMonday;

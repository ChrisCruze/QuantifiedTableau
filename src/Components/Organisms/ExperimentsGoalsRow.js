import React, { Component, Fragment, useEffect } from "react";
import DataTablesTable from "../Molecules/DataTablesTable";
import PropsContext from "../../PropsContext";
import DataTable from "../Atoms/DataTable";
import DataTableAsanaCompleted from "../Molecules/DataTableAsanaCompleted";
import DataTableAsanaCurrent from "../Molecules/DataTableAsanaCurrent";
import DataTableAirTableGoals from "../Molecules/DataTableAirTableGoals";
import DataTableAirTableExperimentsActive from "../Molecules/DataTableAirTableExperimentsActive";
import DataTableAirTableGoalsActive from "../Molecules/DataTableAirTableGoalsActive";

const DataTablesRow = ({ toggl_list, airtable_list, asana_list }) => {
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
          <div className="row">
            <div className="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-title">Experiments</div>
                <div className="ibox-content">
                  <DataTableAirTableExperimentsActive list={airtable_experiments_list} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-title">Goals</div>
                <div className="ibox-content">
                  <DataTableAirTableGoalsActive list={airtable_goals_list} />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PropsContext.Consumer>
  );
};

export default DataTablesRow;

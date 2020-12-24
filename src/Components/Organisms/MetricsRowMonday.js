import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";
import MetricAsanaTasks from "../Molecules/MetricAsanaTasks";
import MetricAirTableTogglCount from "../Molecules/MetricAirTableTogglCount";
import MetricTogglCount from "../Molecules/MetricTogglCount";
import MetricTogglHours from "../Molecules/MetricTogglHours";
import MetricShopifyCustomers from "../Molecules/MetricShopifyCustomers";
import MetricShopifyEvents from "../Molecules/MetricShopifyEvents";
import MetricShopifyOrders from "../Molecules/MetricShopifyOrders";
import MetricShopifyProducts from "../Molecules/MetricShopifyProducts";
import MetricAsanaTasksCompleted from "../Molecules/MetricAsanaTasksCompleted";
import MetricAirTableExpenses from "../Molecules/MetricAirTableExpenses";
import MetricAsanaTasksOverdue from "../Molecules/MetricAsanaTasksOverdue";
import MetricAsanaTasksAge from "../Molecules/MetricAsanaTasksAge";
import MetricAsanaTasksHygiene from "../Molecules/MetricAsanaTasksHygiene";
import MetricTogglCost from "../Molecules/MetricTogglCost";
import MetricAirTableExperiments from "../Molecules/MetricAirTableExperiments";
import MetricAirTableGoals from "../Molecules/MetricAirTableGoals";
import MetricAirTableGoalsOverdue from "../Molecules/MetricAirTableGoalsOverdue";

import MetricAirTableExperimentsActive from "../Molecules/MetricAirTableExperimentsActive";

import MetricMondayTasksCompleted from "../Molecules/MetricMondayTasksCompleted";
import MetricMondayCost from "../Molecules/MetricMondayCost";
import MetricMondayHours from "../Molecules/MetricMondayHours";
import MetricMondayOverdue from "../Molecules/MetricMondayOverdue";
import MetricMondayAge from "../Molecules/MetricMondayAge";
import MetricAirTableExperimentsActiveBudget from "../Molecules/MetricAirTableExperimentsActiveBudget";

import MetricMondayTasks from "../Molecules/MetricMondayTasks";
import MetricMondayUnPaid from "../Molecules/MetricMondayUnPaid";
import MetricMondayHygiene from "../Molecules/MetricMondayHygiene";

const MetricsRowMonday = ({ toggl_list, airtable_list, asana_list }) => {
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
        refreshToggl,
        refreshAsana,
        airtable_goals_list,
        airtable_experiments_list,
        monday_list
      }) => (
        <div class="row">
          <MetricAirTableExperimentsActiveBudget list={airtable_experiments_list} />
          <MetricMondayUnPaid list={monday_list} />

          <MetricMondayCost list={monday_list} />
          <MetricMondayHygiene list={monday_list} />
          <MetricMondayAge list={monday_list} />
          <MetricTogglHours list={toggl_list} />

          {/* <MetricMondayAge list={monday_list} />
          <MetricAirTableExpenses list={airtable_expenses_list} />
          <MetricMondayTasks list={monday_list} />
          <MetricMondayTasksCompleted list={monday_list} />
          <MetricMondayCost list={monday_list} />
          <MetricMondayHours list={monday_list} /> */}

          {/* <MetricMondayOverdue list={monday_list} /> */}

          {/* <MetricAirTableExperiments list={airtable_experiments_list} />
          <MetricAirTableExperimentsActive list={airtable_experiments_list} />
          <MetricAirTableGoals list={airtable_goals_list} />
          <MetricAirTableGoalsOverdue list={airtable_goals_list} /> */}
          {/* <MetricAirTableTogglCount list={airtable_toggl_list} /> */}
          {/* <MetricTogglCount list={toggl_list} /> */}
          {/* <MetricShopifyCustomers list={shopify_customers} />
          <MetricShopifyEvents list={shopify_events} />
          <MetricShopifyOrders list={shopify_orders} />
          <MetricShopifyProducts list={shopify_products} /> */}
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default MetricsRowMonday;

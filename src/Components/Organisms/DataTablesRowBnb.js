import React, { Component, Fragment, useEffect } from "react";
import DataTablesTable from "../Molecules/DataTablesTable";
import PropsContext from "../../PropsContext";
import DataTable from "../Atoms/DataTable";
import DataTableMondayCompleted from "../Molecules/DataTableMondayCompleted";
import DataTableMondayCurrent from "../Molecules/DataTableMondayCurrent";
import DataTableAirTableGoals from "../Molecules/DataTableAirTableGoals";
import DataTableAirTableExperiments from "../Molecules/DataTableAirTableExperiments";
import DataTableMondayAll from "../Molecules/DataTableMondayAll";

const DataTablesRowBnb = () => {
  return (
    <PropsContext.Consumer>
      {({ monday_list }) => {
        return (
          <div class="row">
            <div className="ibox float-e-margins">
              <div className="ibox-content">
                <div className="tabs-container">
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-monday-all">
                        All ({monday_list.length})
                      </a>
                    </li>
                    <li class="">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-monday-completed">
                        Unpaid (
                        {
                          monday_list.filter(function(D) {
                            return D.status == "Done";
                          }).length
                        }
                        )
                      </a>
                    </li>
                    <li class="">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-monday">
                        Current (
                        {
                          monday_list.filter(function(D) {
                            return D.status != "Done" && D.status != "Paid";
                          }).length
                        }
                        )
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="tab-monday-all">
                      <div className="panel-body active">
                        <DataTableMondayAll list={monday_list} />
                      </div>
                    </div>
                    <div className="tab-pane " id="tab-monday-completed">
                      <div className="panel-body active">
                        <DataTableMondayCompleted list={monday_list} />
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-monday">
                      <div className="panel-body">
                        <DataTableMondayCurrent list={monday_list} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PropsContext.Consumer>
  );
};

export default DataTablesRowBnb;

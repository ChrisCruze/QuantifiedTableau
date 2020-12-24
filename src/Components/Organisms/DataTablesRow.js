import React, { Component, Fragment, useEffect } from "react";
import DataTablesTable from "../Molecules/DataTablesTable";
import PropsContext from "../../PropsContext";
import DataTable from "../Atoms/DataTable";
import DataTableAsanaCompleted from "../Molecules/DataTableAsanaCompleted";
import DataTableAsanaCurrent from "../Molecules/DataTableAsanaCurrent";
import DataTableAirTableGoals from "../Molecules/DataTableAirTableGoals";
import DataTableAirTableExperiments from "../Molecules/DataTableAirTableExperiments";
import DataTableFirebaseVisits from "../Molecules/DataTableFirebaseVisits";

const DataTablesRow = () => {
  return (
    <PropsContext.Consumer>
      {({ firebase_list }) => {
        const firebase_emails = firebase_list.filter(function(D) {
          return D.email != "null";
        });
        const firebase_clicks = firebase_list.filter(function(D) {
          return D.click == true;
        });

        console.log({ firebase_emails, firebase_clicks });
        return (
          <div class="row">
            <div className="ibox float-e-margins">
              <div className="ibox-content">
                <div className="tabs-container">
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-firebase-visits">
                        Visits (
                        {
                          firebase_list.filter(function(D) {
                            return true;
                          }).length
                        }
                        )
                      </a>
                    </li>
                    <li class="">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-firebase-emails">
                        Emails ({firebase_emails.length})
                      </a>
                    </li>
                    <li class="">
                      <a aria-expanded="true" data-toggle="tab" href="#tab-firebase-clicks">
                        Clicks ({firebase_clicks.length})
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="tab-firebase-visits">
                      <div className="panel-body active">
                        <DataTableFirebaseVisits
                          {...{
                            id: "firebase_visits_table",
                            data: firebase_list
                          }}
                        />
                      </div>
                    </div>
                    <div className="tab-pane" id="tab-firebase-emails">
                      <div className="panel-body">
                        <DataTableFirebaseVisits
                          {...{
                            id: "firebase_emails_table",
                            data: firebase_emails
                          }}
                        />
                      </div>
                    </div>
                    <div className="tab-pane " id="tab-firebase-clicks">
                      <div className="panel-body">
                        <DataTableFirebaseVisits
                          {...{
                            id: "firebase_clicks_table",
                            data: firebase_clicks
                          }}
                        />
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

export default DataTablesRow;

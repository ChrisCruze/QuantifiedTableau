import React, { Component, Fragment, useEffect } from "react";
import DataTablesTable from "../Molecules/DataTablesTable";
import PropsContext from "../../PropsContext";
import ChartTogglTags from "../Molecules/ChartTogglTags";
import ChartTogglDates from "../Molecules/ChartTogglDates";
import ChartAsanaDates from "../Molecules/ChartAsanaDates";
import ChartFirebaseVisits from "../Molecules/ChartFirebaseVisits";
import ChartFirebaseClicks from "../Molecules/ChartFirebaseClicks";
import ChartFirebaseEmails from "../Molecules/ChartFirebaseEmails";
import ChartFirebaseVisitsURL from "../Molecules/ChartFirebaseVisitsURL";

const ChartsRow = () => {
  return (
    <PropsContext.Consumer>
      {({ firebase_list }) => {
        return (
          <div class="row">
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartFirebaseVisits list={firebase_list} />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartFirebaseClicks list={firebase_list} />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartFirebaseEmails list={firebase_list} />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <ChartFirebaseVisitsURL list={firebase_list} />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </PropsContext.Consumer>
  );
};

export default ChartsRow;

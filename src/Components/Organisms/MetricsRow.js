import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";
import MetricAsanaTasks from "../Molecules/MetricAsanaTasks";
import MetricAirTableTogglCount from "../Molecules/MetricAirTableTogglCount";
import MetricTogglCount from "../Molecules/MetricTogglCount";
import MetricTogglHours from "../Molecules/MetricTogglHours";
import MetricFirebaseVisits from "../Molecules/MetricFirebaseVisits";
import MetricFirebaseClicks from "../Molecules/MetricFirebaseClicks";
import MetricFirebaseEmails from "../Molecules/MetricFirebaseEmails";

const MetricsRow = () => {
  return (
    <PropsContext.Consumer>
      {({ firebase_list, refreshFirebase }) => (
        <div class="row">
          <MetricFirebaseVisits list={firebase_list} refresh={refreshFirebase} />
          <MetricFirebaseClicks list={firebase_list} refresh={refreshFirebase} />
          <MetricFirebaseEmails list={firebase_list} refresh={refreshFirebase} />
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default MetricsRow;

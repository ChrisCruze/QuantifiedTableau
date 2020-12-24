import React, { Component, Fragment, useEffect, useState } from "react";
import PropsContext from "../../PropsContext";
import useFirebase from "../../Hooks/useFirebase";
import TableauTemplate from "../Templates/TableauTemplate";

const Tableau = () => {
  function refresh_data() {}

  useEffect(() => {
    refresh_data();
  }, []);

  return (
    <Fragment>
      <PropsContext.Provider value={{}}>
        <TableauTemplate />
      </PropsContext.Provider>
    </Fragment>
  );
};

export default Tableau;

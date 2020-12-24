import React, { Component, Fragment, useEffect, useState } from "react";
import PropsContext from "../../PropsContext";
import useFirebase from "../../Hooks/useFirebase";
import HomeTemplate from "../Templates/HomeTemplate";

const Home = () => {
  const { firebase_list, refreshFirebase } = useFirebase();

  function refresh_data() {
    refreshFirebase();
  }

  useEffect(() => {
    refresh_data();
  }, []);

  return (
    <Fragment>
      <PropsContext.Provider
        value={{
          firebase_list: firebase_list,
          refreshFirebase: refreshFirebase
        }}
      >
        <HomeTemplate />
      </PropsContext.Provider>
    </Fragment>
  );
};

export default Home;

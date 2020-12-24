import React, { Component, Fragment, useEffect, useState } from "react";
import useAirTable from "../../Hooks/useAirTable";
import useToggl from "../../Hooks/useToggl";
import useAsana from "../../Hooks/useAsana";
import useShopify from "../../Hooks/useShopify";
import useIP from "../../Hooks/useIP";
import { slack_message } from "../../Hooks/useSlack";

import MondayTemplate from "../Templates/MondayTemplate";
import useMonday, { useMondayQuery } from "../../Hooks/useMonday";
import PropsContext from "../../PropsContext";
import { local_storage_get, local_storage_save } from "../../Hooks/localStorage.functions";
import { airtable_expenses_monday_merge } from "./Monday.functions";
import BnbTemplate from "../Templates/BnbTemplate";
// import airbnb from "airbnbapijs";
const ListingAirTablePull = () => {
  const ListingAirTable = useAirTable({
    id: "appHQzB00YVvLTeEt",
    name: "Listing Checkilist",
    keys: ["Name", "Created Time", "Last Modified"]
  });
  return ListingAirTable;
};

//Inventory Checklist

const Bnb = () => {
  const monday_dict = useMondayQuery();
  const ListingAirTable = ListingAirTablePull();
  console.log({ ListingAirTable, monday_dict });
  return (
    <Fragment>
      <PropsContext.Provider
        value={{
          monday_list: monday_dict["data"],
          monday_dict,
          monday_refresh: monday_dict["refetch"]
        }}
      >
        <BnbTemplate />
      </PropsContext.Provider>
    </Fragment>
  );
};

export default Bnb;

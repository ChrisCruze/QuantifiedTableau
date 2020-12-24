import React, { Component, Fragment, useEffect, useState } from "react";
import useAirTable from "../../Hooks/useAirTable";
import useToggl from "../../Hooks/useToggl";
import useAsana from "../../Hooks/useAsana";
import useShopify from "../../Hooks/useShopify";
import useIP from "../../Hooks/useIP";
import { slack_message } from "../../Hooks/useSlack";

import DashboardTemplate from "../Templates/DashboardTemplate";
import { ApolloProvider } from "@apollo/react-hooks";

import PropsContext from "../../PropsContext";
import { local_storage_get, local_storage_save } from "../../Hooks/localStorage.functions";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "apollo-boost";

function MondayClient() {
  const httpLink = new HttpLink({ uri: "https://api.monday.com/v2/" });
  const authLink = new ApolloLink((operation, forward) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMyNzc1MTg0LCJ1aWQiOjEyMjAwNDUyLCJpYWQiOiIyMDIwLTAxLTE4IDIyOjQzOjQyIFVUQyIsInBlciI6Im1lOndyaXRlIn0.E9Q4KMwWcNG_sozMWUJsqyqN9x1QJLupAO7uhp9pEOA";
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache()
  });

  return client;
}
const EXCHANGE_RATES = gql`
  query {
    boards {
      items {
        id
      }
    }
  }
`;

const CruzTemplate = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  console.log({ data });
  return <Fragment>Cruz</Fragment>;
};

const Cruz = () => {
  const client = MondayClient();
  return (
    <ApolloProvider client={client}>
      <PropsContext.Provider value={{}}>
        <CruzTemplate></CruzTemplate>;
      </PropsContext.Provider>
    </ApolloProvider>
  );
};

export default Cruz;

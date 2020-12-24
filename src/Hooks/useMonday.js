import React, { Fragment, useState, useEffect } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";
import { monday_parse_data } from "./useMonday.functions";
import { local_storage_pull_run_data, local_storage_get, local_storage_save } from "./localStorage.functions";

// const MONDAY_QUERY = gql`
//   query {
//     boards {
//       name
//       items {
//         id
//         name
//         created_at
//         updated_at
//         state
//         updates {
//           creator {
//             name
//           }
//         }
//         column_values {
//           id
//           text
//           additional_info
//         }
//       }
//     }
//   }
// `;
const MONDAY_QUERY = gql`
  query {
    items(limit: 1000, newest_first: true) {
      column_values {
        id
        text
        title
        value
      }
      board {
        name
        id
      }
      group {
        id
        title
      }
      id
      name
      created_at
      updated_at
      state
    }
  }
`;

export const useMondayQuery = () => {
  //local_storage_save("monday", data);

  // const data = local_storage_get("monday");
  // const transformed_data = monday_parse_data(data);
  // return {
  //   loading: false,
  //   error: false,
  //   data: transformed_data,
  //   refetch: function() {
  //     console.log("refresh");
  //   }
  // };

  const { loading, error, data, refetch } = useQuery(MONDAY_QUERY);
  // local_storage_save("monday", data);
  // console.log({ data });
  const transformed_data = monday_parse_data(data);
  return { loading, error, data: transformed_data, refetch };
};

//https://www.apollographql.com/docs/react/get-started/
export function MondayClient() {
  const httpLink = new HttpLink({ uri: "https://api.monday.com/v2/" });
  const authLink = new ApolloLink((operation, forward) => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMyNzc1MTg0LCJ1aWQiOjEyMjAwNDUyLCJpYWQiOiIyMDIwLTAxLTE4IDIyOjQzOjQyIFVUQyIsInBlciI6Im1lOndyaXRlIn0.E9Q4KMwWcNG_sozMWUJsqyqN9x1QJLupAO7uhp9pEOA";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2MjkwOTEzLCJ1aWQiOjEyNDI0ODAyLCJpYWQiOiIyMDIwLTAyLTAxIDA0OjMzOjA3IFVUQyIsInBlciI6Im1lOndyaXRlIn0.8R3tB6wfioPh6P6fv-CgO8tdCybdarQ5vJ5FOM6XQZo";
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
    return forward(operation);
  });

  const DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  };
  const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
    defaultOptions: DefaultOptions
  });

  return client;
}

const useMonday = () => {
  const client = MondayClient();
  const [monday_list, updateMondayList] = useState([]);

  function refresh_monday_data() {
    client
      .query({
        query: MONDAY_QUERY
      })
      .then(result => updateMondayList(result));
  }

  useEffect(() => {
    refresh_monday_data();
    //refreshMonday();
  }, []);

  return { monday_list, refresh_monday_data };
};

//eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMyNzc1MTg0LCJ1aWQiOjEyMjAwNDUyLCJpYWQiOiIyMDIwLTAxLTE4IDIyOjQzOjQyIFVUQyIsInBlciI6Im1lOndyaXRlIn0.E9Q4KMwWcNG_sozMWUJsqyqN9x1QJLupAO7uhp9pEOA
// const useMonday = () => {
//   const [monday_client, updateMonday] = useState({});

//   function refreshMonday() {
//     const client = MondayClient();
//     updateMonday(client);
//   }
//   useEffect(() => {
//     refreshMonday();
//   }, []);

//   return { monday_client, refreshMonday };
// };
export default useMonday;

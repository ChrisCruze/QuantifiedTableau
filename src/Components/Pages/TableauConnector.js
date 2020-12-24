import React, { Component, Fragment, useEffect, useState } from "react";
import PropsContext from "../../PropsContext";
import TableauConnectorTemplate from "../Templates/TableauConnectorTemplate";

const TableauConnector = () => {
  // Create the connector object
  var myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function(schemaCallback) {
    var cols = [
      {
        id: "id",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "url",
        alias: "url",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "email",
        alias: "email",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "click",
        alias: "click",
        dataType: tableau.dataTypeEnum.bool
      },
      {
        id: "date_string",
        alias: "date_string",
        dataType: tableau.dataTypeEnum.string
      },
      {
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
      },
      {
        id: "datetime",
        alias: "datetime",
        dataType: tableau.dataTypeEnum.datetime
      }
    ];

    var tableSchema = {
      id: "rumbleVisits",
      alias: "Rumble Capital Visits",
      columns: cols
    };

    schemaCallback([tableSchema]);
  };

  // Download the data
  myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://rumble-signup.firebaseio.com/.json", function(resp) {
      var feat = _.map(_.zip(Object.keys(resp), Object.values(resp)), function(subl) {
          return Object.assign({}, subl[1], { id: subl[0] });
        }),
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
          id: feat[i].id,
          url: feat[i].url,
          click: feat[i].click,
          email: feat[i].email,
          date_string: moment(feat[i].time).format("YYYY-MM-DD"),
          date: moment(feat[i].time).format("YYYY-MM-DD"),
          datetime: moment(feat[i].time).format("YYYY-MM-DD HH:mm:ss")
        });
      }

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  function refresh_data() {}

  useEffect(() => {
    refresh_data();
  }, []);

  return (
    <Fragment>
      <PropsContext.Provider value={{ tableau, connectionName: "Rumble Data" }}>
        <TableauConnectorTemplate />
      </PropsContext.Provider>
    </Fragment>
  );
};

export default TableauConnector;

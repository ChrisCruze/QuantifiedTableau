import React, { Fragment, useState, useEffect } from "react";
import airtable from "airtable";
import _ from "underscore";
import { local_storage_get, local_storage_save } from "./localStorage.functions";

function airtable_base_define({ id }) {
  airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyIffg4q9CmdItjv"
  });
  var base = airtable.base(id);
  return base;
}

function dict_from_record(record) {
  return {
    name: record.get("Name")
  };
}
function dict_from_record_keys(record, keys) {
  var D = {};
  keys.forEach(function(k) {
    D[k] = record.get(k);
  });
  D["id"] = record.id;
  return D;
}
function update_airtable_data({ base, name, updateAirtableData, keys }) {
  var l = [];
  base(name)
    .select({
      view: "Grid view"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          const response_dict = dict_from_record_keys(record, keys);
          l.push(response_dict);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error({ err });
          return;
        } else {
          // console.log({ base, name, l });
          updateAirtableData(l);
        }
      }
    );
}

function update_airtable_data_complete({ base, name, updateAirtableData, keys }) {
  update_airtable_data({ base, name, updateAirtableData, keys });
}

function exclude_key_from_dict(D, exclude_keys) {
  var keys = Object.keys(D);
  var new_dict = {};
  keys.forEach(function(key) {
    var is_exclude_key = exclude_keys.indexOf(key) > -1;
    if (!is_exclude_key) {
      new_dict[key] = D[key];
    }
  });
  return new_dict;
}
function update_array_from_standard_array(array) {
  function update_to_aritable_dict(airtable_dict) {
    const id = airtable_dict.id;
    const fields = exclude_key_from_dict(airtable_dict, ["id"]);
    return {
      id,
      fields
    };
  }
  return _.map(array, update_to_aritable_dict);
}
function update_array_airtable({ base, array, name, refreshAirTable }) {
  const airtable_array = update_array_from_standard_array(array);
  base(name).update(airtable_array, function(err, records) {
    if (err) {
      console.error(err);
      return;
    } else {
      refreshAirTable();
    }
    records.forEach(function(record) {
      console.log("success");
    });
  });
}
function create_array_from_standard_array(array) {
  function update_to_aritable_dict(airtable_dict) {
    const fields = airtable_dict;
    return {
      fields
    };
  }
  return _.map(array, update_to_aritable_dict);
}

function create_array_airtable({ base, array, name, refreshAirTable }) {
  const airtable_array = create_array_from_standard_array(array);
  base(name).create(airtable_array, function(err, records) {
    if (err) {
      console.error(err);
      return;
    } else {
      refreshAirTable();
    }
    records.forEach(function(record) {
      console.log("success");
    });
  });
}
//appeAwIP72LKu9UgT
const useAirTable = ({ id, name, keys }) => {
  var base = airtable_base_define({ id });

  const [airtable_list, updateAirtableData] = useState(local_storage_get("airtable_" + name));

  function updateAirtableDataCache(data) {
    local_storage_save("airtable_" + name, data);
    updateAirtableData(data);
  }

  function refreshAirTable() {
    update_airtable_data_complete({ base, name, updateAirtableData: updateAirtableDataCache, keys });
  }

  useEffect(() => {
    if (local_storage_get("airtable_" + name).length == 0) {
      console.log("run");
      refreshAirTable();
    }
  }, [id, name]);

  function updateAirTable(array) {
    update_array_airtable({ base, array, name, refreshAirTable });
  }

  function createAirTable(array) {
    create_array_airtable({ base, array, name, refreshAirTable });
  }
  return { airtable_list, updateAirTable, base, refreshAirTable, createAirTable };
};

export default useAirTable;

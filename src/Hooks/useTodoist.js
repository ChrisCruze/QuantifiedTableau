import React, { Fragment, useState, useEffect } from "react";
import { todoist_array_customize } from "./updateTodoist.functions.js";

const pre_pend_url = "";

//remove promise
const updateTodoistOffset = value =>
  new Promise(resolve =>
    $.ajax({
      type: "GET",
      url: pre_pend_url + "https://todoist.com/api/v8/completed/get_all",
      dataType: "json",
      async: false,
      data: {
        token: "a14f98a6b546b044dbb84bcd8eee47fbe3788671",
        limit: "50",
        offset: value.length * 50
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log({ error, type: "updateTodoistOffset" });
      })
  );

function todoist_result_flatten(final_response) {
  var all_items = [];
  final_response.forEach(function(single_response) {
    const single_response_customized = todoist_array_customize(single_response.items);
    all_items = all_items.concat(single_response_customized);
  });
  return all_items;
}

//determine if it qualifies for a certain number of days back
function todoist_determine_if_result_qualifies_for_earliest_date({ items, days_back_required }) {
  var earliest_completed_date = array_pull_last_date(items, "completed_date");
  //determine how far back it is
  var days_back_completed = moment_difference_hours(moment(earliest_completed_date), moment()) / 24;
  //want it to be true if greater than 45 days
  //console.log({ days_back_completed, items });
  return days_back_completed > days_back_required; //|| 45;
}

const pullTodoistCompleted = value =>
  updateTodoistOffset(value).then(result => {
    var earliest_date_is_sufficient = todoist_determine_if_result_qualifies_for_earliest_date({
      items: result.items,
      days_back_required: 30
    });
    if (earliest_date_is_sufficient) {
      localStorage.setItem("completed_tasks", JSON.stringify(todoist_result_flatten(value)));
      return value;
    } else {
      value.push(result);
      return pullTodoistCompleted(value);
    }
  });

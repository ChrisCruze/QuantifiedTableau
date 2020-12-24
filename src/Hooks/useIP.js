import React, { Fragment, useState, useEffect } from "react";
import { slack_message } from "./useSlack";

function ip_object_format(response) {
  return JSON.stringify(response, undefined, 4); //string_from_json_prettified_result(response);
}
function determine_if_local() {
  return window.location.href.indexOf("localhost") > -1;
}
function get_ip(updateIP) {
  $.getJSON("https://ipapi.co/json/", function(response) {
    updateIP(response);
    if (!determine_if_local()) {
      slack_message(ip_object_format(response));
    }
  });
}

const useIP = () => {
  const [ip_object, updateIP] = useState([]);
  function refreshIP() {
    get_ip(updateIP);
  }
  useEffect(() => {
    refreshIP();
  }, []);
  return { ip_object, refreshIP };
};
export default useIP;

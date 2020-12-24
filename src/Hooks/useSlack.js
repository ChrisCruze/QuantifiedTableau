import React, { Fragment, useState, useEffect } from "react";

function slack_channels(chat_id, message) {
  $.ajax({
    type: "GET",
    url: "https://slack.com/api/channels.list",
    dataType: "json",
    async: false,
    data: {
      token: "xoxp-892618223655-880522656721-890879825200-7ff2aa257bf00e6414b317cf682b555a"
    }
  });
}

export function slack_message(message) {
  $.ajax({
    type: "POST",
    url: "https://slack.com/api/chat.postMessage",
    dataType: "json",
    async: false,
    data: {
      channel: "CS92L16AJ",
      username: "Chat",
      text: message,
      token: "xoxp-892618223655-880522656721-890879825200-7ff2aa257bf00e6414b317cf682b555a"
    }
  });
}


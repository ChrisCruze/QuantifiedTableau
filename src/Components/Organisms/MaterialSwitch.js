import React, { Component, useState, Fragment, useEffect } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const MaterialSwitch = ({ state, action, label }) => (
  <ListItem button>
    <ListItemText primary={label} />
    <Switch
      checked={state}
      onChange={() => {
        action(!state);
      }}
    />
  </ListItem>
);
export default MaterialSwitch;

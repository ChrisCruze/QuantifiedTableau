import React, { Component, Fragment, useEffect } from "react";
import PropsContext from "../../PropsContext";

const ToolBar = () => {
  return (
    <PropsContext.Consumer>
      {({ refreshFirebase }) => (
        <div class="row border-bottom">
          <nav class="navbar navbar-static-top" role="navigation" style={{ marginBottom: "0" }}>
            <div class="navbar-header">
              <a
                class="navbar-minimalize minimalize-styl-2 btn btn-primary "
                href="#"
                onClick={e => {
                  e.preventDefault();
                  refreshFirebase();
                }}
              >
                Refresh
              </a>
            </div>
          </nav>
        </div>
      )}
    </PropsContext.Consumer>
  );
};

export default ToolBar;

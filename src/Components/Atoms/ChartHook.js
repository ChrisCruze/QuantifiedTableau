import React, { Fragment, useEffect } from "react";

//chart_dict {type: type, data: data, options:options}
const ChartHook = ({ chart_dict, id }) => {
  useEffect(() => {
    try {
      var ctx5 = document.getElementById(id).getContext("2d");
      new Chart(ctx5, chart_dict);
    } catch (err) {
      console.log({ err });
    }
  }, [chart_dict]);
  return (
    <Fragment>
      <div style={{ height: "320px" }}>
        <canvas id={id} />
      </div>
    </Fragment>
  );
};
export default ChartHook;

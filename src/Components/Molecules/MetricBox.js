import React, { Component, Fragment, useEffect } from "react";
// const MetricBox = ({ metric, title, label, footer, sub_title }) => {
//   return (
//     <div class="col-lg-3">
//       <div class="ibox float-e-margins">
//         <div class="ibox-title">
//           <span class="label label-success pull-right">{label || "label"}</span>
//           <h5>{title || "title"}</h5>
//         </div>
//         <div class="ibox-content">
//           <h1 class="no-margins">{metric || "metric"}</h1>
//           <div class="stat-percent font-bold text-success">
//             {footer || "footer"} <i class="fa fa-bolt"></i>
//           </div>
//           <small>{sub_title || "sub_title"}</small>
//         </div>
//       </div>
//     </div>
//   );
// };
const MetricBox = ({ metric, title, label, footer, sub_title }) => {
  return (
    <div class="col-lg-3">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <span class="label label-success pull-right">{label}</span>
          <h5>{title}</h5>
        </div>
        <div class="ibox-content">
          <h1 class="no-margins">{metric}</h1>
          <div class="stat-percent font-bold text-success">
            {footer}
            {/* <i class="fa fa-bolt"></i> */}
          </div>
          <small>{sub_title}</small>
        </div>
      </div>
    </div>
  );
};

export default MetricBox;

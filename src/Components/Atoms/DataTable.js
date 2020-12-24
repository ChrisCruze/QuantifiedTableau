import React, { Fragment, useEffect } from "react";

function datatable_formulate({ data, columns, id }) {
  var buttons = datatables_config_buttons_create_base();
  var determined_columns = columns || datatables_columns_create_from_data(data);
  var config = datatables_config_create_base(data, determined_columns, buttons);

  var checked_data = array_dictionary_check_keys_list_ensure(data, _.map(determined_columns, "data"));
  datatables_determine_create_update("#" + id, config, checked_data);
}

const DataTable = ({ data, columns, id }) => {
  useEffect(() => {
    try {
      datatable_formulate({ id: id, data, columns });
    } catch (err) {
      console.log({ err });
    }
  }, [data, columns]);
  return (
    <Fragment>
      <table className="table table-striped table-bordered table-hover" style={{ width: "100%" }} id={id}></table>
    </Fragment>
  );
};
export default DataTable;

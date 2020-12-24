function column_value_to_dict(column_values) {
  var base_dict = {};
  _.map(column_values, function(column_value_dict) {
    base_dict[column_value_dict["id"]] = column_value_dict["text"];
  });
  return base_dict;
}

function board_item_parse_additional_group(item_dict) {
  const board_name = item_dict["board"]["name"];
  const board_id = item_dict["board"]["id"];
  const group_id = item_dict["group"]["id"];
  const group_title = item_dict["group"]["title"];
  return { board_name, board_id, group_id, group_title };
}
function board_item_parse(item_dict) {
  //item_dict["updates"];
  const column_values_dict = column_value_to_dict(item_dict["column_values"]);
  const additional_param_dict = board_item_parse_additional_group(item_dict);
  const combined_dict = { ...item_dict, ...column_values_dict, ...additional_param_dict };
  return combined_dict;
}
function items_from_board_dict(board_dict) {
  const board_name = board_dict["name"];
  const board_items = board_dict["items"];
  const array = _.map(board_items, function(item_dict) {
    return board_item_parse(item_dict, board_name);
  });
  return array;
}

function array_flatten(array_of_array) {
  return _.reduce(
    array_of_array,
    function(memo, num) {
      return memo.concat(num);
    },
    []
  );
}

function monday_parse_data_boards(array) {
  // const boards_list = array["boards"];
  // const array_of_array = _.map(boards_list, function(board_dict) {
  //   return items_from_board_dict(board_dict);
  // });
  // const array_flattened = array_flatten(array_of_array);

  const array_transformed = _.map(array, function(item_dict) {
    return board_item_parse(item_dict);
  });

  return array_transformed;
}

function monday_parse_data_boards_rename_fields_obj(obj) {
  return {
    seconds: moment.duration(obj["time_tracking"]).asSeconds(),
    minutes: moment.duration(obj["time_tracking"]).asMinutes(),
    hours: moment.duration(obj["time_tracking"]).asHours(),
    dollars: (moment.duration(obj["time_tracking"]).asMinutes() / 60) * 15,
    priority: obj["status1"],
    due_date: obj["date4"],
    age: moment().diff(moment(obj["created_at"].replace(" UTC", "")), "days"),
    ...obj
  };
}
function monday_parse_data_boards_rename_fields(array) {
  return _.map(array, monday_parse_data_boards_rename_fields_obj);
}
function monday_parse_data_boards_condition(array) {
  const has_boards = array != undefined && array["items"] != undefined;
  if (has_boards) {
    const parsed_data = monday_parse_data_boards(array["items"]);
    return monday_parse_data_boards_rename_fields(parsed_data);
  } else {
    return [];
  }
}

function monday_remove_deleted(array) {
  return array.filter(function(D) {
    return D["state"] != "deleted";
  });
}

export function monday_parse_data(array) {
  const array_transformed = monday_parse_data_boards_condition(array);
  const array_filtered = monday_remove_deleted(array_transformed);
  return array_filtered;
}

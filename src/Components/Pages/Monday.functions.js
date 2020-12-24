function airtable_experiments_merge_dict({ airtable_experiments_dict, monday_dict_lookup }) {
  const monday_data = monday_dict_lookup[airtable_experiments_dict["Name"]] || [];
  console.log({ monday_data });
  const monday_hours = array_sum_from_key_name(monday_data, "hours") || 0;
  return { monday_hours, monday_data };
}
function airtable_experiments_merge_array({ airtable_experiments_list, monday_list }) {
  const monday_dict_lookup = _.groupBy(monday_list, "group_title"); //array_groupby_flat(monday_list, "group_title");
  const airtable_experiments_list_transformed = _.map(airtable_experiments_list, function(airtable_experiments_dict) {
    const monday_dict = airtable_experiments_merge_dict({ airtable_experiments_dict, monday_dict_lookup });
    const combined_dict = dictionary_combine(airtable_experiments_dict, monday_dict);
    return combined_dict;
  });
  return airtable_experiments_list_transformed;
}

export function airtable_expenses_monday_merge({ airtable_experiments_list, monday_list }) {
  const airtable_experiments_list_transformed = airtable_experiments_merge_array({ airtable_experiments_list, monday_list });
  return airtable_experiments_list_transformed;
}

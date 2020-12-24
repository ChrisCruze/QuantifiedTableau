export function local_storage_get(name) {
  var local_storage_completed_tasks = localStorage.getItem(name);
  if (local_storage_completed_tasks != null) {
    const array = JSON.parse(local_storage_completed_tasks);
    // console.log({ array, name });
    return array;
  } else {
    return [];
  }
}
export function local_storage_save(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
function determine_if_local_storage(name) {
  return local_storage_get(name).length > 0;
}

function local_storage_clear(name) {
  localStorage.setItem(name, JSON.stringify([]));
}

//func needs to take a callback for saving the data
export function local_storage_pull_run_data({ func, name }) {
  const local_storage_exists = determine_if_local_storage(name);
  // console.log({ local_storage_exists });
  if (local_storage_exists) {
    return local_storage_get(name);
  } else {
    function callback(data) {
      local_storage_save(name, data);
    }
    return func(callback);
  }
}

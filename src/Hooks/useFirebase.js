import React, { Fragment, useState, useEffect } from "react";

function formatFirebaseDict(D) {
  return {
    date: moment(D["time"]).format("YYYY-MM-DD")
  };
}

function formatFirebaseArray(l) {
  return _.map(l, i => {
    const formatted_dict = formatFirebaseDict(i);
    return Object.assign({}, i, formatted_dict);
  });
}
function pullFirebaseData({ updateData }) {
  $.ajax({
    type: "GET",
    url: "https://rumble-signup.firebaseio.com/.json",
    dataType: "json",
    async: false
  }).then(resp => {
    const array = _.map(_.zip(Object.keys(resp), Object.values(resp)), function(subl) {
      return Object.assign({}, subl[1], { id: subl[0] });
    });
    const formatted_array = formatFirebaseArray(array);
    return updateData(formatted_array);
  });
}

const useFirebase = () => {
  const [firebase_list, updateFirebase] = useState([]);
  function refreshFirebase() {
    pullFirebaseData({ updateData: updateFirebase });
  }
  useEffect(() => {}, []);
  return { firebase_list, refreshFirebase };
};
export default useFirebase;

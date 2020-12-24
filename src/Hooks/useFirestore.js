import React, { Fragment, useState, useEffect } from "react";
import { firebase } from "../firebase";

function document_data_from_snapshot(snapshot) {
  const downloadedDocuments = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  return downloadedDocuments;
}

function document_state_update_if_change({ documents, downloadedDocuments, setDocuments }) {
  if (JSON.stringify(documents) != JSON.stringify(downloadedDocuments)) {
    setDocuments(downloadedDocuments);
  }
}
function firebase_collection_define(collection_name) {
  let unsubscribe = firebase.firestore().collection(collection_name); //.where("uid", "==", undefined);
  return unsubscribe;
}

export function firestore_load({ documents, setDocuments, collection_name }) {
  let unsubscribe = firebase_collection_define(collection_name);
  unsubscribe.onSnapshot(snapshot => {
    const downloadedDocuments = document_data_from_snapshot(snapshot);
    document_state_update_if_change({ documents, downloadedDocuments, setDocuments });
  });
  return () => unsubscribe();
}

function delete_firebase_firestore({ id, setDocuments, documents, collection_name }) {
  return firebase.firestore
    .collection(collection_name)
    .doc(id)
    .delete()
    .then(() => {
      var filtered_documents = documents.filter(function(D) {
        return D.id != id;
      });
      setDocuments([...filtered_documents]);
    })
    .catch(err => {});
}

function deleteFirestoreDocument({ id, setDocuments, documents, collection_name }) {
  return delete_firebase_firestore({ id, setDocuments, documents, collection_name });
}

function add_firebase_firestore({ update_dict, id, setDocuments, documents, collection_name }) {
  // setDocuments([...documents, update_dict]);
  return firebase.firestore
    .collection(collection_name)
    .doc(id)
    .set(update_dict)
    .then(() => {
      //setDocuments([...documents, update_dict]);
    })
    .catch(err => {});
}

function addFirestoreDocument({ documents, setDocuments, uid, collection_name }) {
  const id = moment().unix();
  const update_dict = {
    uid: uid,
    createdAt: new Date(),
    time_stamp: moment().format()
  };
  add_firebase_firestore({ update_dict, id, setDocuments, documents, collection_name });
}

export function set_firebase_firestore({ update_dict, id, collection_name }) {
  // setDocuments([...documents, update_dict]);
  return firebase
    .firestore()
    .collection(collection_name)
    .doc(id)
    .set(update_dict)
    .then(() => {
      //setDocuments([...documents, update_dict]);
    })
    .catch(err => {});
}
function setFirestoreDocument({ documents, setDocuments, uid, collection_name, id }) {
  const item_id = id || moment().unix();
  const update_dict = {
    uid: uid,
    createdAt: new Date(),
    time_stamp: moment().format()
  };
  add_firebase_firestore({ update_dict, id: item_id, setDocuments, documents, collection_name });
}

// function document_data_from_snapshot(snapshot) {
//   const downloadedDocuments = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
//   return downloadedDocuments;
// }

// function document_state_update_if_change({ documents, downloadedDocuments, setDocuments }) {
//   if (JSON.stringify(documents) != JSON.stringify(downloadedDocuments)) {
//     setDocuments(downloadedDocuments);
//   }
// }
// function firebase_collection_define(collection_name) {
//   let unsubscribe = firebase.firestore().collection(collection_name || "documents"); //.where("uid", "==", undefined);
//   return unsubscribe;
// }

function pull_firestore_data_set({ documents, setDocuments, collection_name }) {
  let unsubscribe = firebase_collection_define(collection_name);
  unsubscribe.onSnapshot(snapshot => {
    const downloadedDocuments = document_data_from_snapshot(snapshot);
    document_state_update_if_change({ documents, downloadedDocuments, setDocuments });
  });
  return () => unsubscribe();
}

const default_firestore_list = [{ time_stamp: "2019-11-02T03:39:47-04:00" }];

export const useFirestoreBase = (uid, collection_name) => {
  const [documents, setDocuments] = useState(default_firestore_list);

  function deleteDocument(id) {
    deleteFirestoreDocument({ documents, setDocuments, uid, collection_name, id });
  }
  function addDocument(id) {
    addFirestoreDocument({ documents, setDocuments, uid, collection_name, id });
  }
  useEffect(() => {
    return pull_firestore_data_set({ documents, setDocuments, collection_name });
  }, [uid, collection_name]);

  return { documents, setDocuments, addDocument };
};

export const useFirestore = () => {
  const [applications, updateApplications] = useState([]);
  const [programs, updatePrograms] = useState([]);
  const [statuses, updateStatuses] = useState([]);

  function updateApplication({ update_dict, id }) {
    set_firebase_firestore({ update_dict, id, collection_name: "applications" });
  }
  function updateProgram({ update_dict, id }) {
    set_firebase_firestore({ update_dict, id, collection_name: "programs" });
  }
  function updateStatus({ update_dict, id }) {
    set_firebase_firestore({ update_dict, id, collection_name: "statuses" });
  }
  useEffect(() => {
    return firestore_load({ documents: applications, setDocuments: updateApplications, collection_name: "applications" });
  }, []);

  useEffect(() => {
    return firestore_load({ documents: programs, setDocuments: updatePrograms, collection_name: "programs" });
  }, []);

  useEffect(() => {
    return firestore_load({ documents: statuses, setDocuments: updateStatuses, collection_name: "statuses" });
  }, []);

  return { applications, programs, statuses, updateApplication, updateProgram, updateStatus };
};

//export default useFirestore;

// export const useFirestore = (uid, collection_name) => {
//   const [documents, setDocuments] = useState(default_firestore_list);

//   function deleteDocument(id) {
//     deleteFirestoreDocument({ documents, setDocuments, uid, collection_name, id });
//   }
//   function addDocument(id) {
//     addFirestoreDocument({ documents, setDocuments, uid, collection_name, id });
//   }
//   useEffect(() => {
//     return pull_firestore_data_set({ documents, setDocuments, collection_name });
//   }, [uid, collection_name]);

//   return { documents, setDocuments, addDocument };
// };

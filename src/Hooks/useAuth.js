import React, { Fragment, useState, useEffect } from "react";
import { firebase } from "../firebase";
// import {firebaseui} from firebaseui;
import { firebaseui } from "firebaseui";

function is_authenticated_check() {
  return firebase.auth.uid != undefined;
}
function firebase_authenticate() {
  try {
    return {
      is_authenticated: true,
      firebase,
      firebase_auth: firebase.auth(),
      currentUser: firebase.auth().currentUser,
      uid: firebase.auth().currentUser.uid
    };
  } catch (err) {
    return { firebase, firebase_auth: undefined, currentUser: undefined, uid: undefined };
  }
}
function firebase_sign_in_google(update_is_authenticated) {
  console.log({ firebase, firebaseui });
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  console.log({ ui, firebase });

  var provider = firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      update_is_authenticated(true);
    })
    .catch(err => {
      console.log({ err });
    });
}

function firebase_sign_out(update_is_authenticated) {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      update_is_authenticated(false);
    })
    .catch(err => {
      console.log({ err });
    });
}

function firebase_sign_in_anonymous(update_is_authenticated) {
  return firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      update_is_authenticated(true);
    })
    .catch(err => {
      console.log({ err });
    });
}
function firebase_auth_dict_create() {
  const firebase_dict = firebase_authenticate();
  return firebase_dict;
}

const useAuth = () => {
  const [firebase_auth, updateFirebaseAuth] = useState({});

  function firebase_check_update() {
    updateFirebaseAuth(firebase_auth_dict_create());
  }

  useEffect(() => {
    if (firebase_auth.is_authenticated == undefined) {
      firebase_check_update();
    }
  }, [firebase_auth]);

  function sign_in_anonymous() {
    return firebase_sign_in_anonymous(firebase_check_update);
  }

  function sign_in_google() {
    return firebase_sign_in_google(firebase_check_update);
  }

  function sign_out() {
    return firebase_sign_out(firebase_check_update);
  }

  return { firebase_auth, firebase_check_update, sign_in_anonymous, sign_in_google, sign_out };
};

export default useAuth;

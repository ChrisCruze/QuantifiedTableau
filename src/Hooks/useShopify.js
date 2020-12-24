import React, { Fragment, useState, useEffect } from "react";
import { local_storage_get, local_storage_save } from "./localStorage.functions";

function pullShopify(updateShopify, name) {
  $.ajax({
    type: "GET",
    url: `https://cors-anywhere.herokuapp.com/https://phillycnctools.myshopify.com/admin/api/2019-10/${name}.json`,
    headers: {
      Authorization: "Basic " + btoa("0b9bbbcd3995bee9de785cf17cd33259" + ":" + "afb215aa056283ec959d534b689d6ff7")
    },
    dataType: "json",
    crossDomain: true,
    async: false
  }).then(response => {
    updateShopify(response[name]);
  });
}

const useShopify = ({ name }) => {
  const [shopify_list, updateShopify] = useState(local_storage_get("shopify_" + name));
  function updateShopifyCache(data) {
    local_storage_save("shopify_" + name, data);
    updateShopify(data);
  }

  function refreshShopify() {
    pullShopify(updateShopifyCache, name);
  }
  useEffect(() => {
    // refreshShopify();
  }, [name]);
  return { shopify_list, refreshShopify };
};
export default useShopify;

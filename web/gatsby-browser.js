import React from "react";
import Layout from "./src/containers/layout";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function onClientEntry() {
  window.addEventListener("load", () => {
    document.body.className = document.body.className.replace(/\bno-js\b/, "");
  });
}

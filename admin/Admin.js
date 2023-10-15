"use client";
import React, { useState, useEffect } from "react";
let componentsContext;
try {
  // Dynamically require all components under /plugin/*/admin folders.
  componentsContext = require.context("../module", true, /\/admin\/\w+\.js$/);
} catch (error) {
  console.error("Failed to load components:", error);
}

function getComponent(plugin, name) {
  try {
    let componentPath;

    if (plugin) {
      componentPath = componentsContext
        .keys()
        .find((path) => path.includes(`/${plugin}/admin/${name}.js`));
    } else {
      componentPath = componentsContext
        .keys()
        .find((path) => path.endsWith(`/admin/${name}.js`));
    }

    if (!componentPath) return null;
    return componentsContext(componentPath).default;
  } catch (error) {
    console.error(
      `Failed to load component ${name} from plugin ${plugin || "any"}:`,
      error
    );
    return null;
  }
}

const Admin = ({ plugin, Name, ...props }) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (Name) {
      const LoadedComponent = getComponent(plugin, Name);
      setComponent(() => LoadedComponent);
    }
  }, [plugin, Name]);

  if (!Component) return null;
  return <Component {...props} />;
};

export default Admin;

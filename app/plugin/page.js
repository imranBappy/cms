"use client";
import { useState, useEffect } from "react";
import Plugin from "../../components/Plugin";

export default function Index() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function fetchPlugins() {
      const pluginContext = require.context(
        "../../module",
        true,
        /package\.json$/
      );

      const loadedPlugins = [];
      pluginContext.keys().forEach((filePath) => {
        const pluginPackage = pluginContext(filePath);
        if (!loadedPlugins.some((p) => p["ID"] === pluginPackage["ID"])) {
          loadedPlugins.push(pluginPackage);
        }
      });

      setPlugins(loadedPlugins);
    }

    fetchPlugins();
  }, []);

 

  return (
    <div>
      <h1>Plugins list</h1>
      <ul>
        {plugins.map((plugin, idx) => (
          <Plugin plugins={plugins} key={idx} plugin={plugin} />
        ))}
      </ul>
    </div>
  );
}

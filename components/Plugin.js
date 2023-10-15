import React, { useEffect, useState } from "react";
import pluginList from "../app/pluginList.json";
import axios from "axios";

const Plugin = ({ plugin, plugins }) => {
  const [update, setUpdate] = useState(null);

  const handleUpload = async (e) => {
    axios
      .post("http://localhost:5000/update", {
        name: `${update["url"]}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    for (let i = 0; i < pluginList.length; i++) {
      const p = pluginList[i];
      if (plugin.ID === p.ID) {
        if (plugin["version"] !== p["version"]) {
          setUpdate(p);
        }
      }
    }
  }, []);
  return (
    <li>
      <div className="flex items-center mb-2 py-1 border-b">
        <div className="flex flex-col pl-2">
          <h2>{plugin["Plugin Name"]}</h2>

          <p>{plugin.Description}</p>
          <div className="flex gap-2">
            <p>version: {plugin.version}</p>
            <p>
              Author By: <a href={plugin["Author URI"]}>{plugin.Author}</a>
            </p>
          </div>
        </div>
      </div>
      {update && (
        <button
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "15px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px",
            cursor: "pointer",
          }}
          onClick={handleUpload}
        >
          Update
        </button>
      )}
    </li>
  );
};

export default Plugin;

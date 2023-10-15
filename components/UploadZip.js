"use client";
import React, { useState } from "react";
import { useEffect } from 'react';
import io from 'socket.io-client';

const UploadZip = () => {
  const [zip, setZip] = useState([]);

  const handleChange = (e) => {
    setZip(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("zip", zip);

    fetch("http://localhost:5000/zip", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };



 const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const socket = io();

    socket.on("reload-component", () => {
      console.log("Reloading component...");
      setReloadKey(prevKey => prevKey + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div>
          <div>
            <label htmlFor="">Upload your zip file</label>
            <input onChange={handleChange} type="file" name="zip" />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadZip;

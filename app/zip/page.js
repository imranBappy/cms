"use client";
import React, { useState } from "react";

const page = () => {
  const [zip, setZip] = useState([]);

  const handleChange = (e) => {
    setZip(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("zip", zip);
    console.log({ zip });

    fetch("http://localhost:5000/zip", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

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

export default page;

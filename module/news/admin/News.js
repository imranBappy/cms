import React from "react";

const News = ({ handleChanage }) => {
  return (
    <div className=" w-full  mb-3">
      <input
        style={{
          color: "#000",
        }}
        onChange={handleChanage}
        className=" w-full py-2  text-black"
        type="text"
        name="News"
        placeholder="News"
      />
    </div>
  );
};

export default News;

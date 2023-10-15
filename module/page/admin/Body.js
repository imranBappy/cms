import React from 'react';

const Body = ({ handleChanage }) => {
  return (
    <div className=" w-full  mb-3">
      <input
        onChange={handleChanage}
        className=" w-full py-2  text-black"
        type="text"
        name="body"
        placeholder="body"
      />
    </div>
  );
};

export default Body;
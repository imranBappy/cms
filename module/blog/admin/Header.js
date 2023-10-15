import React from "react";

const Header = ({ handleChanage }) => {
  return (
    <div className=" w-full  mb-3">
      <input
        style={{
          color: "#000",
        }}
        onChange={handleChanage}
        className=" w-full py-2  text-black"
        type="text"
        name="header"
        placeholder="header"
      />
    </div>
  );
};

export default Header;

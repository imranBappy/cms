import React from "react";

const Footer = ({ handleChanage }) => {
  return (
    <div className=" w-full  mb-3">
      <input
        onChange={handleChanage}
        className=" w-full py-2  text-black"
        type="text"
        name="footer"
        placeholder="footer"
      />
    </div>
  );
};

export default Footer;

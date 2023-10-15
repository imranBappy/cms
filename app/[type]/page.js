/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../../admin/Admin";

const getComponentName = (path = "") => {
  const parts = path?.split("/");
  return parts[parts?.length - 1].replace(".js", "");
};

export default function Home({ params }) {
  const { type: postType } = params;
  const [content, setContent] = useState({});
  const [setting, setSetting] = useState([]);

  const handleChanage = (e) => {
    const name = e.target.name,
      value = e.target.value;
    setContent({ ...content, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/post/${postType}`, {
        title: content.title,
        content: JSON.stringify({ content }),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/setting/${postType}`)
      .then((res) => {
        console.log(res.data);
        setSetting(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSetting = () => {
    axios
      .post("http://localhost:5000/setting")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-center my-5 "> {postType}</h1>
      <div className="container m-auto">
        <button onClick={handleSetting}>JSON POST</button>
        <form
          className="w-full"
          onSubmit={handleSubmit}
          action="/post"
          method="post"
        >
          {setting.map((item, index) => {
            const Component = getComponentName(item.componentLocation);
            return (
              <Admin
                handleChanage={handleChanage}
                key={index}
                Name={Component}
                {...item}
              />
            );
          })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

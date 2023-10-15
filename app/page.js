"use client";
import dynamic from "next/dynamic";

export default function Home() {
  // const compLoc = "../../module/pages/admin/Header";
  // const components = {
  //   header: dynamic(() => import(`${compLoc}`), {
  //     ssr: false,
  //   }),
  // };

  // const compLoc = "../../module/pages/admin/Header";

  // const Component = dynamic(() => import(compLoc + ""), {
  //   ssr: false,
  // }).then((module) => module.Header);

  // const Component = components["header"];
  return (
    <div>
      {/* <Component /> */}
      <h1>Welcome to out cms</h1>
    </div>
  );
}

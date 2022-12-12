import React from "react";
import { Header } from "../container";

function HomeLayout({ children }) {
  return (
    <>
      <Header isInHomePage={true} />
      <div>{children}</div>
    </>
  );
}

export default HomeLayout;

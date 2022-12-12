import React, { Suspense } from "react";
import { Footer, Header } from "../container";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading ...</div>}>{children}</Suspense>
    </>
  );
}

export default DefaultLayout;

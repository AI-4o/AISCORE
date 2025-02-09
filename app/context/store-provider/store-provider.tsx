"use client"; // This directive tells Next.js that this is a client component

import { Provider } from "react-redux";
import { store } from "store/store";
import React from "react";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

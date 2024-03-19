"use client";

import Counter from "@/components/Counter";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function page() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
}

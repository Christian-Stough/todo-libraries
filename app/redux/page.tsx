"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import React from "react";
import AddTodo from "@/components/redux/AddTodo";
import TodoView from "@/components/redux/TodoView";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-col gap-4 px-6 py-4">
        <AddTodo />
        <TodoView />
      </div>
    </Provider>
  );
}

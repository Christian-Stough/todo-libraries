import React, { useState, useRef, FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { add, remove } from "@/app/redux/redux/features/todo/todoSlice";
import { Button } from "../ui/button";

export default function AddTodo() {
  const [value, setValue] = useState<string>("");

  const todos = useAppSelector((state) => state.todo.list);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();

    if (!value) return;

    dispatch(add(value));
    setValue("");
    inputRef.current?.focus();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo) => {
      dispatch(remove(todo.id));
    });
  };

  return (
    <form className="flex gap-4 items-end" onSubmit={handleClick}>
      <div className="flex flex-col gap-1">
        <Input
          ref={inputRef}
          id="todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button type="submit">Add</Button>
      <Button variant="destructive" onClick={handleDelete}>
        Remove Completed
      </Button>
    </form>
  );
}

import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toggle } from "@/app/redux/redux/features/todo/todoSlice";

export default function TodoView() {
  const todos = useAppSelector((state) => state.todo.list);
  const dispatch = useAppDispatch();

  const handleToggle = (id: number) => {
    dispatch(toggle(id));
  };

  return (
    <div className="flex flex-col gap-2 w-[550px]">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          onClick={() => handleToggle(todo.id)}
          className={`${todo.completed && "bg-green-100 border-green-500"}`}
        >
          <CardHeader>
            <CardTitle className="capitalize">{todo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {todo.completed ? <p>Completed</p> : <p>Not Completed</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

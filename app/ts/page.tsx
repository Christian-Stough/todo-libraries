"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import { Card, CardDescription } from "@/components/ui/card";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  const [value, setValue] = useState("");

  const enterKey = useKeyPress("Enter");

  useLayoutEffect(() => {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(items);
  }, []);

  useEffect(() => {
    if (enterKey) {
      handleClick();
    }
  }, [enterKey]);

  const handleClick = () => {
    const newItems = [
      ...items,
      { id: items.length, name: value, completed: false },
    ];

    setItems(newItems);

    localStorage.setItem("items", JSON.stringify(newItems));
    setValue("");
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  const toggleCompleted = (index: number) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleReset = () => {
    setItems([]);
    localStorage.setItem("items", "[]");
  };

  return (
    <main className="mx-3 my-4 min-h-screen">
      <div className="flex flex-col gap-8 max-w-[1920px]">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter New Item..."
            value={value}
            className="w-[300px]"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="w-[100px]" onClick={handleClick}>
            Add
          </Button>
          <Button
            variant="destructive"
            className="w-[100px]"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {items.length > 0 ? (
            items
              .sort((a: Item, b: Item) => {
                return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
              })
              .map((item, index) => (
                <TodoCard
                  key={item.id}
                  item={item}
                  index={index}
                  removeItem={removeItem}
                  toggleCompleted={toggleCompleted}
                />
              ))
          ) : (
            <div className="text-xl text-zinc-400">No items to display</div>
          )}
        </div>
      </div>
    </main>
  );
}

interface TodoCardProps {
  item: Item;
  index: number;
  removeItem: Function;
  toggleCompleted: Function;
}

const TodoCard = ({
  item,
  index,
  removeItem,
  toggleCompleted,
}: TodoCardProps) => {
  return (
    <Card
      className={`w-[410px] h-fit ${
        item.completed && "bg-green-200 text-green-600"
      }`}
    >
      <CardDescription className="flex w-full h-fit justify-between items-center px-2 py-3 gap-4">
        <div className=" overflow-auto">{item.name}</div>
        <div className="flex gap-1">
          {!item.completed && (
            <Button
              onClick={() => toggleCompleted(index)}
              variant="ghost"
              className="p-2 h-fit hover:bg-green-600 hover:text-green-200 text-green-600"
            >
              <CheckIcon className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => removeItem(index)}
            className="p-2 h-fit text-red-500 hover:text-red-200 hover:bg-red-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
      </CardDescription>
    </Card>
  );
};

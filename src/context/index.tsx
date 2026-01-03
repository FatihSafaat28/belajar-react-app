import { createContext, useState } from "react";

export const CounterContext = createContext<any>(null);
export const ListNewsContext = createContext<any>(null);

export const Provider = ({ children }: any) => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  const [postList, setPostList] = useState<any>([]);
  const getData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPostList(data);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      <ListNewsContext.Provider value={{ postList, getData }}>
        {children}
      </ListNewsContext.Provider>
    </CounterContext.Provider>
  );
};

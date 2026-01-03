import { useContext } from "react";
import { CounterContext } from "@/context";

const counterPage = () => {
  const { count, increment, decrement, reset } = useContext(CounterContext)!;
  return (
    <div>
      <h1>ini counter page</h1>
      <h2>Count: {count}</h2>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 cursor-pointer px-4 py-2 rounded-2xl"
          onClick={increment}
        >
          Tambah
        </button>
        <button
          className="bg-blue-500 cursor-pointer px-4 py-2 rounded-2xl"
          onClick={decrement}
        >
          Kurang
        </button>
        <button
          className="bg-blue-500 cursor-pointer px-4 py-2 rounded-2xl"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default counterPage;

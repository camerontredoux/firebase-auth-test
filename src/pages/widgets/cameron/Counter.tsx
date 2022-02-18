import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div className="flex gap-2">
      <button onClick={() => setCounter((i) => i + 1)}>
        <ChevronUpIcon className="h-5 w-5 text-gray-400" />
      </button>
      <div className="text-gray-400">{counter}</div>
      <button onClick={() => setCounter((i) => i - 1)}>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
};

export default Counter;

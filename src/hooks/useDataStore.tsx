import { useState } from "react";

export default function useDataStore(initialValue: string[]) {
  const [data, setData] = useState(initialValue);

  const add = (): void => {
    setData((prevData: any) => [...prevData, ""]);
  };
  const change = (value: string, index: number) => {
    setData((prevData: any) => [
      ...prevData.slice(0, index),
      value,
      ...prevData.slice(index + 1),
    ]);
  };
  const remove = (index: number) => {
    setData((prevData: any) => [
      ...prevData.slice(0, index),
      ...prevData.slice(index + 1),
    ]);
  };
  return [data, add, change, remove] as const;
}

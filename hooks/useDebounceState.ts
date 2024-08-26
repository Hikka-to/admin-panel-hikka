import { useEffect, useState } from "react";

export default function useDebounceState<T>(value: T, setter: (value: T) => void, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setter(debouncedValue);
    }, delay);
    return () => clearTimeout(timeout);
  }, [debouncedValue]);

  return [debouncedValue, setDebouncedValue] as const;
}
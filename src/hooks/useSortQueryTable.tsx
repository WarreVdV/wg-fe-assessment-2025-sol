import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import sortBy from "lodash/sortBy";

type sortDirection = "asc" | "desc";

interface UseSortQueryTableProps<T> {
  list: T[];
  defaultKey?: keyof T | keyof T[] | undefined;
}

const useSortQueryTable = <T,>({
  list,
  defaultKey,
}: UseSortQueryTableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | keyof T[] | undefined>(
    defaultKey
  );
  const [direction, setDirection] = useState<sortDirection>("asc");
  const [sortedList, setSortedList] = useState<Array<T>>();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortList = useCallback(() => {
    const keys: string[] =
      typeof sortKey === "string"
        ? [sortKey]
        : Array.isArray(sortKey)
        ? sortKey
        : [];
    const sorted = sortBy(list, keys) as T[];
    setSortedList(direction === "asc" ? sorted : [...sorted].reverse());
    setSearchParams({ sortKey: sortKey as string, sortDir: direction });
  }, [list, direction, sortKey]);

  useEffect(() => {
    const querySortKey = searchParams.get("sortKey");
    if (querySortKey) {
      setSortKey(querySortKey as keyof T);
    }
    const querySortDir = searchParams.get("sortDir");
    if (querySortDir) {
      setDirection(querySortDir as sortDirection);
    }
  }, [searchParams]);

  useEffect(() => {
    if (list && list.length > 0) {
      sortList();
    }
  }, [list, direction, sortKey, sortList]);

  return { sortKey, setSortKey, direction, setDirection, sortedList, sortList };
};

export default useSortQueryTable;

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearchState<T>(initialState: T) {
  const [preSearch, setPreSearch] = useState(initialState);
  const [search, setSearch] = useState(initialState);

  function executeSearch() {
    setSearch({ ...preSearch });
  }

  function resetSearch(): void {
    setSearch({ ...initialState });
    setPreSearch({ ...initialState });
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParamsObj = Object.fromEntries(searchParams);
    // loop through keys of pre search, assign values from search params
    const newPreSearch = { ...preSearch };
    for (const key in preSearch) {
      if (key in searchParamsObj) {
        newPreSearch[key] = searchParamsObj[key] as T[Extract<keyof T, string>];
      }
    }
    setPreSearch(newPreSearch);

    // setPreSearch({ ...searchParamsObj });
  }, [searchParams]);

  return {
    preSearch,
    setPreSearch,
    search,
    executeSearch,
    resetSearch,
  };
}

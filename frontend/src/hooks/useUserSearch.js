import { useEffect, useState } from "react";
import { useSearchUsersQuery } from "../features/users/userApiSlice";

const useUserSearch = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: users = [], isLoading } = useSearchUsersQuery(debouncedSearch, {
    refetchOnMountOrArgChange: false,
    skip: debouncedSearch.length < 2,
  });

  return { search, setSearch, users, isLoading };
};

export default useUserSearch;

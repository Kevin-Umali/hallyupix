import { queryOptions } from "@tanstack/react-query";
import { getSession } from "../api";

export const getSessionQueryOptions = () => {
  return queryOptions({
    queryKey: ["session"],
    queryFn: async () => getSession(),
    staleTime: Infinity,
  });
};

import { queryOptions } from "@tanstack/react-query";
import { getSession, listSessions } from "../api";

export const getSessionQueryOptions = () => {
  return queryOptions({
    queryKey: ["session"],
    queryFn: async () => getSession(),
    staleTime: Infinity,
  });
};

export const getSessionListQueryOptions = () => {
  return queryOptions({
    queryKey: ["session-list"],
    queryFn: async () => listSessions(),
  });
};

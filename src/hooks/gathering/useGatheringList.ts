import {
  QueryClient,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import GatheringService from "@/services/gathering/GatheringService";
import { IGathering } from "@/types/gathering";

const gatheringQueryOption = (params?: string) => ({
  queryKey: [QUERY_KEYS.GATHERING.list, params],
  queryFn: () => GatheringService.getGatheringList(params),
  initialPageParam: 1,
  throwOnError: true,
  retry: false,
  getNextPageParam: (lastPage: IGathering[], pages: IGathering[][]) => {
    return lastPage.length > 0 ? pages.length + 1 : undefined;
  },
});

export const useGatheringList = (params?: string) => {
  if (params) console.log("[useGatheringList]", params);
  return useInfiniteQuery(gatheringQueryOption(params));
};

export const useSuspenseGatheringList = (params?: string) => {
  if (params) console.log("[useSuspenseGatheringList]", params);
  return useSuspenseInfiniteQuery(gatheringQueryOption(params));
};

export const prefetchGateringList = async (
  queryClient: QueryClient,
  params?: string,
) => {
  if (params) console.log("[prefetchGateringList]", params);
  return queryClient.prefetchInfiniteQuery(gatheringQueryOption(params));
};

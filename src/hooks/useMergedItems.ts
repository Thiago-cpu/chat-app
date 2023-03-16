import { type InfiniteData } from "@tanstack/react-query";

const useMergedItems = <T>(
  data:
    | InfiniteData<{
        items: T[];
        nextCursor?: string;
      }>
    | undefined
) => {
  const mergedItems = data?.pages.reduce((acum, curr) => {
    if (acum.items) {
      return {
        ...acum,
        items: [...acum.items, ...curr.items],
      };
    }
    return curr;
  });

  return mergedItems?.items ?? [];
};

export default useMergedItems;

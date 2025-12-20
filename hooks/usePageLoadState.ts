type PageLoadStateArgs = {
  isUserLoading?: boolean;
  isInitialLoading?: boolean;
  itemsLength?: number;
  isRefreshing?: boolean;
  gateByItems?: boolean;
};

type PageLoadState = {
  isPageLoading: boolean;
  isListLoading: boolean;
  showEmpty: boolean;
  hasItems: boolean;
};

export function usePageLoadState({
  isUserLoading = false,
  isInitialLoading = false,
  itemsLength,
  isRefreshing = false,
  gateByItems,
}: PageLoadStateArgs): PageLoadState {
  const hasItems = typeof itemsLength === "number" && itemsLength > 0;
  const shouldGateByItems =
    typeof gateByItems === "boolean"
      ? gateByItems
      : typeof itemsLength === "number";
  const baseLoading = isUserLoading || isInitialLoading;
  const isPageLoading = shouldGateByItems
    ? baseLoading && !hasItems
    : baseLoading;
  const isListLoading =
    isPageLoading ||
    (isRefreshing && typeof itemsLength === "number" && !hasItems);
  const showEmpty =
    typeof itemsLength === "number" ? !isPageLoading && !hasItems : false;

  return { isPageLoading, isListLoading, showEmpty, hasItems };
}

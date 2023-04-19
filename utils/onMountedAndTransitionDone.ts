export const onMountedAndTransitionDone = (callback: Function) =>
  onMounted(() => {
    const handlePageTransitionFinished = () => {
      callback();
    };
    eventBus.on("pageTransitionFinished", handlePageTransitionFinished);
    onUnmounted(() => {
      eventBus.off("pageTransitionFinished", handlePageTransitionFinished);
    });
    callback();
  });

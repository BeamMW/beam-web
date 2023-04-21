import { eventBus } from "~/utils/emitter";

export const onMountedAndTransitionDone = (callback: () => void) =>
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

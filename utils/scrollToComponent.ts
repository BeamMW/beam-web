export const scrollToComponent = (targetComponent: HTMLElement | null) => {
  if (targetComponent) {
    window.scrollTo({
      top: targetComponent.offsetTop - 120,
      behavior: "smooth",
    });
  }
};

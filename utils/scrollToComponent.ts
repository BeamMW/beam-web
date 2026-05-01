export const scrollToComponent = (targetComponent: HTMLElement | null) => {
  if (targetComponent) {
    window.scrollTo({
      top: targetComponent.getBoundingClientRect().top + window.scrollY - 120,
      behavior: "smooth",
    });
  }
};

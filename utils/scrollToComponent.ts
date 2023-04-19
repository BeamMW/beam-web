export const scrollToComponent = (targetComponent: Ref<HTMLElement | null>) => {
  if (targetComponent.value) {
    window.scrollTo({
      top: targetComponent.value.offsetTop - 120,
      behavior: "smooth",
    });
  }
};

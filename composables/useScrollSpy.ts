interface ScrollSpyOptions {
  target: Ref<HTMLElement | null>;
  activeClass: string;
  offset?: number;
}

export const useScrollSpy =
  () =>
  ({ target, activeClass, offset = 0 }: ScrollSpyOptions) => {
    let observer: IntersectionObserver | null = null;
    const lastIntersectingHeader: Record<
      string,
      HTMLElement | null | undefined
    > = {
      h1: null,
      h2: null,
      h3: null,
    };

    const observeHeaders = () => {
      const headers = target.value?.querySelectorAll<HTMLElement>(
        "article h1, article h2, article h3"
      );

      if (!headers) return;

      observer = new IntersectionObserver(
        (entries, _observer) => {
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id;
            const headerTag: string = (
              entry.target as HTMLElement
            ).tagName.toLowerCase();
            const link = target.value?.querySelector<HTMLElement>(
              `aside a[id="link-${id}"]`
            );

            if (entry.isIntersecting) {
              if (headerTag === "h2") {
                if (lastIntersectingHeader.h3) {
                  lastIntersectingHeader.h3.classList.remove(activeClass);
                  lastIntersectingHeader.h3 = null;
                }
              }
              lastIntersectingHeader[headerTag]?.classList.remove(activeClass);
              lastIntersectingHeader[headerTag] = link;
              link?.classList.add(activeClass);
            }
          });
        },
        {
          rootMargin: `${-offset}px 0px 0px 0px`,
          threshold: 0,
        }
      );

      headers.forEach((header) => observer?.observe(header));
    };

    onMounted(() => {
      observeHeaders();
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });
  };

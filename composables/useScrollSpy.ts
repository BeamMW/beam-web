import { onMounted, onUnmounted } from "vue";

interface ScrollSpyOptions {
  target: Ref<HTMLElement | null>;
  activeClass: string;
  offset?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any, C>(
  this: C,
  func: (this: C, ...args: Parameters<T>) => ReturnType<T>,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function getParentUlFirstLink(
  linkInLi: HTMLAnchorElement,
  aside: HTMLElement | null,
): HTMLAnchorElement | null {
  let currentElement: HTMLElement | null = linkInLi.parentElement;

  while (currentElement && currentElement.tagName !== "UL") {
    currentElement = currentElement.parentElement;
  }

  if (currentElement && aside) {
    const firstLinkInParentUl = aside.querySelector(
      `a[href="#${currentElement.id}"]`,
    ) as HTMLAnchorElement | null;
    return firstLinkInParentUl;
  }

  return null;
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
      aside: null,
      article: null,
    };

    const observeHeaders = () => {
      if (!lastIntersectingHeader.aside) {
        lastIntersectingHeader.aside = target.value?.querySelector("aside");
      }
      if (!lastIntersectingHeader.article) {
        lastIntersectingHeader.article = target.value?.querySelector("article");
      }
      const headers =
        lastIntersectingHeader.article?.querySelectorAll<HTMLElement>(
          "h1, h2, h3",
        );

      if (!headers) return;

      observer = new IntersectionObserver(
        (entries, _observer) => {
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id;
            const headerTag: string = (
              entry.target as HTMLElement
            ).tagName.toLowerCase();
            const link =
              lastIntersectingHeader.aside?.querySelector<HTMLElement>(
                `a[id="link-${id}"]`,
              );

            if (entry.isIntersecting) {
              if (headerTag === "h2") {
                if (lastIntersectingHeader.h3) {
                  lastIntersectingHeader.h3.classList.remove(activeClass);
                  lastIntersectingHeader.h3 = null;
                }
              } else if (headerTag === "h3") {
                if (lastIntersectingHeader.h2) {
                  const firstLinkInUl = getParentUlFirstLink(
                    link as HTMLAnchorElement,
                    lastIntersectingHeader.aside as HTMLElement,
                  );
                  if (
                    firstLinkInUl &&
                    firstLinkInUl !== lastIntersectingHeader.h2
                  ) {
                    lastIntersectingHeader.h2.classList.remove(activeClass);
                    lastIntersectingHeader.h2 = firstLinkInUl;
                    lastIntersectingHeader.h2?.classList.add(activeClass);
                  }
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
        },
      );

      headers.forEach((header) => observer?.observe(header));
    };

    const observeHeadersDebounced = debounce(observeHeaders, 100);

    onMounted(() => {
      requestAnimationFrame(observeHeadersDebounced);
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });
  };

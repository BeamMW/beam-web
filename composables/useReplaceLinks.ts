import { Ref, onBeforeUnmount, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";

export function useReplaceLinks(el: Ref<HTMLElement | null>) {
  const router = useRouter();
  let links: HTMLAnchorElement[] = [];

  const navigate = (event: MouseEvent) => {
    const target = event.target as HTMLAnchorElement;
    const href = target.getAttribute("href");
    const targetAttr = target.getAttribute("target");

    if (href && href[0] === "/" && targetAttr !== "_blank") {
      event.preventDefault();
      router && router.push(href);
    }
  };

  const addListeners = () => {
    if (el.value) {
      links = Array.from(el.value.getElementsByTagName("a"));
      links.forEach((link) => link.addEventListener("click", navigate, false));
    }
  };

  const removeListeners = () => {
    links.forEach((link) => link.removeEventListener("click", navigate, false));
    links = [];
  };

  onMounted(addListeners);
  onBeforeUnmount(removeListeners);
  onUpdated(() => {
    removeListeners();
    addListeners();
  });
}

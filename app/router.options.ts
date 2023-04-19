import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  // Define the `scrollBehavior` method to customize the scroll behavior when navigating between pages.
  async scrollBehavior(to, from, savedPosition) {
    // Extract the `$i18n` object from the `nuxtApp` object using destructuring.
    const { $i18n } = useNuxtApp();

    // Check if the `$i18n` object is available and if the route has changed.
    // Use the optional chaining operator to avoid errors if the `$i18n` object is not available.
    if ($i18n?.locale && to.name !== from.name) {
      // If the conditions are true, wait for any pending locale changes to complete.
      await $i18n.waitForPendingLocaleChange();
    }

    // Return the `savedPosition` argument if it is defined, or `{ top: 0 }` if it is not defined.
    // Use the nullish coalescing operator to provide a default value for the `savedPosition` argument.
    return savedPosition ?? { top: 0 };
  },
};

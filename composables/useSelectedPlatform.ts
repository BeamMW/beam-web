import { ref } from "vue";
import { SupportedPlatforms } from "@/app.config";

export async function useSelectedPlatform() {
  const environmentGetter = await useEnvironmentGetter();
  const currentPlatform = ref<SupportedPlatforms | undefined>(undefined);
  const {
    isAndroid,
    isIos,
    isChrome,
    isMacOS,
    isWindows,
    isDesktop,
    isSafari,
  } = useDevice();

  if (!environmentGetter.isDappnet) {
    if (isDesktop && isChrome && !isSafari) {
      currentPlatform.value = SupportedPlatforms.CHROME;
    } else if (isIos) {
      currentPlatform.value = SupportedPlatforms.IOS;
    } else if (isMacOS) {
      currentPlatform.value = SupportedPlatforms.MACOS;
    } else if (isWindows) {
      currentPlatform.value = SupportedPlatforms.WINDOWS;
    } else if (isAndroid) {
      currentPlatform.value = SupportedPlatforms.ANDROID;
    } else {
      currentPlatform.value = SupportedPlatforms.LINUX;
    }
  }

  const isSelected = (platform: SupportedPlatforms) =>
    currentPlatform.value === platform;

  return {
    selected: {
      chrome: isSelected(SupportedPlatforms.CHROME),
      ios: isSelected(SupportedPlatforms.IOS),
      macos: isSelected(SupportedPlatforms.MACOS),
      windows: isSelected(SupportedPlatforms.WINDOWS),
      android: isSelected(SupportedPlatforms.ANDROID),
      linux: isSelected(SupportedPlatforms.LINUX),
    },
  };
}

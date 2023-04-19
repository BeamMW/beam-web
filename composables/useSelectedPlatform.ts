import { ref } from "vue";
import { SupportedPlatforms } from "@/app.config";

export function useSelectedPlatform() {
  const currentPlatform = ref(SupportedPlatforms.LINUX);
  const {
    isAndroid,
    isIos,
    isChrome,
    isMacOS,
    isWindows,
    isDesktop,
    isSafari,
  } = useDevice();

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

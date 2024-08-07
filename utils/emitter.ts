export enum UserInteractionEvents {
  PAGE_TRANSITION_FINISHED = "pageTransitionFinished",
  LANGUAGE_CHANGE = "languageChange",
  CLOSE_MENUS = "closeMenus",
  SCROLL_TO_WHERE_TO_BUY = "scrollToWhereToBuy",
  SCROLL_TO_ROADMAP = "scrollToRoadmap",
  SCROLL_TO_HARDFORK = "scrollToHardfork",
  SCROLL_TO_GET_STARTED = "scrollToGetStarted",
  EXIT_LANGUAGE_DROPDOWN = "exitLanguageDropdown",
  ROADMAP_COMPONENT_READY = "roadmapComponentLoaded",
  Hardfork_COMPONENT_READY = "hardforkComponentLoaded",
  BUY_WHERE_COMPONENT_READY = "buyWhereComponentLoaded",
  DOWNLOAD_ITEM = "downloadItem",
}

export interface CustomEvents {
  [UserInteractionEvents.PAGE_TRANSITION_FINISHED]: unknown;
  [UserInteractionEvents.LANGUAGE_CHANGE]: {
    lang: string;
  };
  [UserInteractionEvents.CLOSE_MENUS]: {
    callback: () => void;
  };
  [UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY]: unknown;
  [UserInteractionEvents.SCROLL_TO_GET_STARTED]: unknown;
  [UserInteractionEvents.SCROLL_TO_ROADMAP]: unknown;
  [UserInteractionEvents.SCROLL_TO_HARDFORK]: unknown;
  [UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN]: unknown;
  [UserInteractionEvents.ROADMAP_COMPONENT_READY]: unknown;
  [UserInteractionEvents.Hardfork_COMPONENT_READY]: unknown;
  [UserInteractionEvents.BUY_WHERE_COMPONENT_READY]: unknown;
  [UserInteractionEvents.DOWNLOAD_ITEM]: {
    fileUrl: string;
    expectedFileHash: string;
  };
}

type Handler<T = unknown> = (event: T) => void;

class CustomEmitter {
  private eventHandlers: {
    [key in keyof CustomEvents]?: Array<Handler<CustomEvents[key]>>;
  } = {};

  on<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>,
  ): void {
    if (!this.eventHandlers[type]) {
      this.eventHandlers[type] = [];
    }
    this.eventHandlers[type]?.push(handler);
  }

  off<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>,
  ): void {
    this.eventHandlers[type] = this.eventHandlers[type]?.filter(
      (h) => h !== handler,
    ) as unknown as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  emit<Key extends keyof CustomEvents>(
    type: Key,
    event: CustomEvents[Key],
  ): void {
    this.eventHandlers[type]?.forEach((handler) => handler(event));
  }
}

export const eventBus = new CustomEmitter();

export default eventBus;

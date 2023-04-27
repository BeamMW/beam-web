export enum UserInteractionEvents {
  PAGE_TRANSITION_FINISHED = "pageTransitionFinished",
  LANGUAGE_CHANGE = "languageChange",
  SCROLL_TO_WHERE_TO_BUY = "scrollToWhereToBuy",
  SCROLL_TO_GET_STARTED = "scrollToGetStarted",
  EXIT_LANGUAGE_DROPDOWN = "exitLanguageDropdown",
}

export interface CustomEvents {
  [UserInteractionEvents.PAGE_TRANSITION_FINISHED]: unknown;
  [UserInteractionEvents.LANGUAGE_CHANGE]: {
    lang: string;
  };
  [UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY]: unknown;
  [UserInteractionEvents.SCROLL_TO_GET_STARTED]: unknown;
  [UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN]: unknown;
}

type Handler<T = unknown> = (event: T) => void;

class CustomEmitter {
  private eventHandlers: {
    [key in keyof CustomEvents]?: Array<Handler<CustomEvents[key]>>;
  } = {};

  on<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>
  ): void {
    if (!this.eventHandlers[type]) {
      this.eventHandlers[type] = [];
    }
    this.eventHandlers[type]?.push(handler);
  }

  off<Key extends keyof CustomEvents>(
    type: Key,
    handler: Handler<CustomEvents[Key]>
  ): void {
    this.eventHandlers[type] = this.eventHandlers[type]?.filter(
      (h) => h !== handler
    ) as unknown as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  emit<Key extends keyof CustomEvents>(
    type: Key,
    event: CustomEvents[Key]
  ): void {
    this.eventHandlers[type]?.forEach((handler) => handler(event));
  }
}

export const eventBus = new CustomEmitter();

export default eventBus;

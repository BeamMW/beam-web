export const startDownload =
  (link: string, checksum?: string) => (event: Event) => {
    if (link && checksum) {
      event.preventDefault();
      eventBus.emit(UserInteractionEvents.DOWNLOAD_ITEM, {
        fileUrl: link,
        expectedFileHash: checksum,
      });
    }
  };

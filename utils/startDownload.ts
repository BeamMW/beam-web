export const startDownload =
  (link: string, checksum?: string) => (event: Event) => {
    /*console.log(event);
    console.log(link);
    console.log(checksum);*/
    if (link && checksum) {
      event.preventDefault();
      eventBus.emit(UserInteractionEvents.DOWNLOAD_ITEM, {
        fileUrl: link,
        expectedFileHash: checksum,
      });
    }
  };

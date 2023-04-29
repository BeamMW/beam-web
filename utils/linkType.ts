export enum LinkTypes {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export const linkType = (link: string): LinkTypes => {
  const internalLinkRegex = /^\/(?!\/)|^#/;
  return internalLinkRegex.test(link) ? LinkTypes.INTERNAL : LinkTypes.EXTERNAL;
};

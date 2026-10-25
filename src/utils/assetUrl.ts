/** Prefix a public-folder path ("/images/x.png") with the build base URL. */
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

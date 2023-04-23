export function joinPath(...paths: string[]) {
  // Process the paths by removing leading/trailing slashes
  const processedPaths = paths.map((path, index) => {
    if (index === 0) {
      // If it's the first path segment, remove only the trailing slash
      return path.replace(/\/$/, "");
    } else {
      // For other segments, remove both leading and trailing slashes
      return path.replace(/^\//, "").replace(/\/$/, "");
    }
  });

  const basePath = processedPaths[0];
  const additionalPath = processedPaths.slice(1).join("/");

  // Check if additionalPath is already part of basePath
  if (basePath.endsWith(additionalPath.split("#")[0])) {
    return basePath + additionalPath.substring(additionalPath.indexOf("#"));
  }

  // Join the basePath and additionalPath
  const finalPath = [basePath, additionalPath].join("/");

  return finalPath;
}

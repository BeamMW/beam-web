import { SupportedPlatforms } from "~/app.config";

type PlatformDownloadType = {
  store: string;
  wallet: string;
  cli: string;
  node: string;
};

interface PlatformDownloadDetail {
  version?: string;
  date?: number;
  links: Partial<PlatformDownloadType>;
  checksums: Partial<PlatformDownloadType>;
}

export enum EnvironmentType {
  MAINNET = "mainnet",
}

export const getDownloadsFor = async (environment: EnvironmentType) => {
  return (await import(`@/downloads/${environment}.json`)).default as Record<
    SupportedPlatforms,
    PlatformDownloadDetail
  >;
};

export const usePlatformDetails: () => Promise<
  Record<SupportedPlatforms, PlatformDownloadDetail>
> = () => {
  return getDownloadsFor(EnvironmentType.MAINNET);
};

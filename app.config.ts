import { URLEntry } from "@/utils/linkElements";
import { extractOriginsFromEnum } from "@/utils/extractOriginsFromEnum";

type PlatformDownloadType = {
  store: string;
  wallet: string;
  cli: string;
  node: string;
};

interface PlatformDownloadDetail {
  version?: string;
  date?: string;
  links: Partial<PlatformDownloadType>;
  checksums: Partial<PlatformDownloadType>;
}

export enum EnvironmentType {
  MAINNET = "mainnet",
  DAPPNET = "dappnet",
}

export enum SupportedPlatforms {
  IOS = "ios",
  MACOS = "macos",
  WINDOWS = "windows",
  ANDROID = "android",
  LINUX = "linux",
  CHROME = "chrome",
}

/** CONFIG HERE */

export const currentEnvironment: EnvironmentType = EnvironmentType.MAINNET;

export enum ExternalLinks {
  // Socials
  GITHUB = "https://github.com/BeamMW/beam",
  TELEGRAM = "https://t.me/BeamPrivacy",
  TWITTER = "https://twitter.com/beamprivacy",
  SUBSTACK = "https://beamprivacy.substack.com",
  REDDIT = "https://www.reddit.com/r/beamprivacy/",
  DISCORD = "https://discord.gg/BHZvAhg",
  YOUTUBE = "https://www.youtube.com/@beamprivacy",
  ANCHOR = "https://anchor.fm/beam-privacy",
  FORUM = "https://forum.beam.mw",
  BITCOINTALK = "https://bitcointalk.org/index.php?topic=5052151",
  MEDIUM = "https://medium.com/beam-mw",
  QQ = "https://qm.qq.com/cgi-bin/qm/qr?k=qrfLNFTLxvThCgcF0fqPc2YFtDzMiUcm&authKey=8hGDPVzLLlTvX4SCBAeYc8TlaumsgvpTIdSUs3%2FU0K8U5piBp3znAYD%2Bd9n6vfEC",
  COINGECKO = "https://www.coingecko.com/en/coins/beam/usd",
  CMC = "https://coinmarketcap.com/currencies/beam/",

  // Other links
  CHANGELOG = "https://github.com/BeamMW/beam/releases",
  EXPLORER = "https://explorer.beam.mw",
  MINING_SUPPORT = "https://t.me/BeamMiners",
  MINING_CALCULATOR = "https://whattomine.com/coins?aq_3070=3&a_3070=true&aq_69xt=0&aq_68xt=0&aq_68=0&aq_67xt=0&aq_66xt=0&aq_vii=0&aq_5700xt=0&aq_5700=0&aq_5600xt=0&aq_vega64=0&aq_vega56=0&aq_4090=0&aq_4080=0&aq_47Ti=0&aq_39Ti=0&aq_3090=0&aq_38Ti=0&aq_3080=0&aq_37Ti=0&aq_3060Ti=0&aq_3060=0&aq_66=0&aq_55xt8=0&aq_580=0&aq_570=0&aq_480=0&aq_470=0&aq_fury=0&aq_380=0&aq_a5=0&aq_a45=0&aq_a4=0&aq_a2=0&aq_2080Ti=0&aq_2080=0&aq_2070=0&aq_2060=0&aq_166s=0&aq_1660Ti=0&aq_1660=0&aq_1080Ti=0&aq_1080=0&aq_1070Ti=0&aq_1070=0&aq_10606=0&aq_1050Ti=0&factor[eth_hr]=180.0&factor[eth_p]=390.0&factor[e4g_hr]=180.0&factor[e4g_p]=390.0&factor[zh_hr]=300.0&factor[zh_p]=540.0&factor[cnh_hr]=5250.0&factor[cnh_p]=540.0&factor[cng_hr]=8700.0&factor[cng_p]=540.0&factor[s5r_hr]=2.22&factor[s5r_p]=300.0&factor[cx_hr]=10.8&factor[cx_p]=510.0&factor[eqa_hr]=1170.0&factor[eqa_p]=540.0&factor[cc_hr]=30.6&factor[cc_p]=540.0&factor[cr29_hr]=30.9&factor[cr29_p]=540.0&factor[hh_hr]=1530.0&factor[hh_p]=240.0&factor[ct32_hr]=2.1&factor[ct32_p]=540.0&eqb=true&factor[eqb_hr]=102.0&factor[eqb_p]=540.0&factor[b3_hr]=3.6&factor[b3_p]=330.0&factor[ns_hr]=0.0&factor[ns_p]=0.0&factor[al_hr]=480.0&factor[al_p]=390.0&factor[ops_hr]=158.1&factor[ops_p]=540.0&factor[eqz_hr]=165.0&factor[eqz_p]=540.0&factor[zlh_hr]=204.0&factor[zlh_p]=450.0&factor[kpw_hr]=82.8&factor[kpw_p]=540.0&factor[ppw_hr]=82.2&factor[ppw_p]=540.0&factor[nx_hr]=219.0&factor[nx_p]=390.0&factor[fpw_hr]=75.0&factor[fpw_p]=450.0&factor[vh_hr]=3.57&factor[vh_p]=420.0&factor[cost]=0.1&factor[cost_currency]=USD&sort=Profitability24&volume=0&revenue=24h&factor[exchanges][]=&factor[exchanges][]=binance&factor[exchanges][]=bitfinex&factor[exchanges][]=bitforex&factor[exchanges][]=bittrex&factor[exchanges][]=coinex&factor[exchanges][]=exmo&factor[exchanges][]=gate&factor[exchanges][]=graviex&factor[exchanges][]=hitbtc&factor[exchanges][]=ogre&factor[exchanges][]=poloniex&factor[exchanges][]=stex&dataset=beam&commit=Calculate",
  DEVELOPERS_SUPPORT = "https://t.me/beamdevsupport",
  ROADMAP = "https://old.beam.mw/#roadmap",
  SUPPORT_EMAIL = "mailto:support@beam.mw",

  // Legacy links
  OLD_WEBSITE = "https://old.beam.mw",
  DAPPNET_DOWNLOAD = "https://old.beam.mw/downloads/dappnet-mac", // `https://dappnet.beam.mw${localePath("downloads")}`,
}

export enum ExternalLinksTitle {
  GITHUB = "GitHub",
  TELEGRAM = "Telegram",
  TWITTER = "Twitter",
  SUBSTACK = "Substack",
  REDDIT = "Reddit",
  DISCORD = "Discord",
  YOUTUBE = "Youtube",
  ANCHOR = "Anchor",
  FORUM = "Forum",
  BITCOINTALK = "BitcoinTalk",
  MEDIUM = "Medium Blog",
  COINGECKO = "CoinGecko",
  CMC = "CoinMarketCap",
}

/**
 * Preload: Instructs the browser to download and process high-priority resources early, improving load times.
 * Preconnect: Establishes network connections to remote servers ahead of time, reducing connection setup latency.
 * DNS-prefetch: Resolves domain names to IP addresses in advance, reducing the DNS lookup time when resources are requested from a different domain. This can speed up the overall page load time.
 * Prerender: Loads and renders an entire web page in the background, making it instantly available when needed.
 * Prefetch: Downloads and stores low-priority resources in advance, speeding up the loading of subsequent pages.
 */
export const preHtml = {
  preload: [
    { href: "/fonts/ProximaNova-Regular.woff2", as: "font", crossorigin: true },
    {
      href: "/fonts/ProximaNova-RegularIt.woff2",
      as: "font",
      crossorigin: true,
    },
    { href: "/fonts/ProximaNova-Bold.woff2", as: "font", crossorigin: true },
  ],
  preconnect: [
    new URL(ExternalLinks.EXPLORER).origin,
    new URL(ExternalLinks.OLD_WEBSITE).origin,
    "https://builds.beam.mw",
  ] as URLEntry[],
  "dns-prefetch": extractOriginsFromEnum(ExternalLinks) as URLEntry[],
  prerender: [] as URLEntry[],
  prefetch: [] as URLEntry[],
};

export const PlatformDetails: Record<
  SupportedPlatforms,
  PlatformDownloadDetail
> = {
  [SupportedPlatforms.ANDROID]: {
    version: "7.1",
    date: "Aug 23, 2022",
    links: {
      store:
        "https://play.google.com/store/apps/details?id=com.mw.beam.beamwallet.mainnet",
      wallet: "https://builds.beam.mw/mainnet/android/mainnet-7.1.apk",
    },
    checksums: {
      wallet:
        "79be44596cf66047e798f94c1ecf75f9e05734b681e854742474c651d949dc90",
    },
  },

  [SupportedPlatforms.WINDOWS]: {
    version: "7.3",
    date: "Apr 12, 2023",
    links: {
      wallet:
        "https://builds.beam.mw/mainnet/2023.04.12/Release/win/signed/Beam-Wallet-7.3.14025.5728.exe",
      cli: "https://builds.beam.mw/mainnet/2023.04.12/Release/win/signed/beam-wallet-cli-7.3.14025.zip",
      node: "https://builds.beam.mw/mainnet/2023.04.12/Release/win/signed/beam-node-7.3.14025.zip",
    },
    checksums: {
      wallet:
        "1f54753e3b8f1f749bab183da0d05eff623f68adf47ec1f5b953269213902a48",
      cli: "f2660d5ff427604b4c552736e4777c117749f38cd755726b8220ce9972ff9cf0",
      node: "c7dfc90279e8032957b1d36532eea543f6ce0efbf80ae8dfc6c69b61ea847e19",
    },
  },

  [SupportedPlatforms.IOS]: {
    links: {
      store:
        "https://apps.apple.com/us/app/beam-privacy-wallet/id1459842353?ls=1",
    },
    checksums: {},
  },

  [SupportedPlatforms.CHROME]: {
    links: {
      store:
        "https://chrome.google.com/webstore/detail/beam-web-wallet/ilhaljfiglknggcoegeknjghdgampffk?hl=en&authuser=1",
    },
    checksums: {},
  },

  [SupportedPlatforms.LINUX]: {
    version: "7.3",
    date: "Apr 12, 2023",
    links: {
      wallet:
        "https://builds.beam.mw/mainnet/2023.04.12/Release/linux/Beam-Wallet-7.3.14025.5728.zip",
      cli: "https://builds.beam.mw/mainnet/2023.04.12/Release/linux/beam-wallet-cli-7.3.14025.zip",
      node: "https://builds.beam.mw/mainnet/2023.04.12/Release/linux/beam-node-7.3.14025.zip",
    },
    checksums: {
      wallet:
        "59732fac4a9f3b5c70a044d15a40b21a1922b59458db19a988d93c7f69b97f95",
      cli: "c3b4d5e0b67b05af3ea234958fd2e059080e09be780087d9f72c31b926c33ff1",
      node: "d1f5073c0ef4371ecec61e0c8ef5dff585ac88b6ee3d4acaa4fa11a9e7b31268",
    },
  },

  [SupportedPlatforms.MACOS]: {
    version: "7.3",
    date: "Apr 12, 2023",
    links: {
      wallet:
        "https://builds.beam.mw/mainnet/2023.04.12/Release/mac/Beam-Wallet-7.3.14025.5728.dmg",
      cli: "https://builds.beam.mw/mainnet/2023.04.12/Release/mac/beam-wallet-cli-7.3.14025.zip",
      node: "https://builds.beam.mw/mainnet/2023.04.12/Release/mac/beam-node-7.3.14025.zip",
    },
    checksums: {
      wallet:
        "d6c5ab8e04f666e1709946fe0290ced7de07a64ef0f8e0f9b66da82963e6e55b",
      cli: "d8b726b1c06919c6dbf0934b856ea5485adbb4538d763b477336580d40fb04c3",
      node: "bd115c5b222fb67a03d07be17a68dd6de7dbfc4162bfad52386e6b7ca1174e55",
    },
  },
};

export const docTypes = [
  {
    title: "docs.types.desktop",
    image: "docs/desktop",
    path: "/desktop",
  },
  {
    title: "docs.types.mobile",
    image: "docs/mobile",
    path: "/mobile",
  },
  {
    title: "docs.types.web",
    image: "docs/web",
    path: "/web-wallet",
  },
  {
    title: "docs.types.mining",
    image: "docs/mining",
    path: "/mining",
  },
  {
    title: "docs.types.developers",
    image: "docs/console",
    path: "/dev",
  },
  {
    title: "docs.types.node",
    image: "docs/server",
    path: "/node",
  },
  {
    title: "docs.types.atomicswaps",
    image: "docs/atomic-swaps",
    path: "/atomics-swaps",
  },
  {
    title: "docs.types.cli",
    image: "docs/console",
    path: "/cli",
  },
  {
    title: "docs.types.explorer",
    image: "docs/desktop",
    path: "/explorer",
  },
];

export const miningSoftware = [
  {
    type: "AMD",
    miningSoftware: [
      {
        name: "lolMiner",
        link: "https://github.com/Lolliedieb/lolMiner-releases/releases",
      },
      {
        name: "Gminer",
        link: "https://github.com/develsoftware/GMinerRelease/releases",
      },
      {
        name: "OpenCL",
        link: "https://github.com/BeamMW/opencl-miner/releases/tag/opencl-miner_1.0.82",
      },
    ],
  },
  {
    type: "NVIDIA",
    miningSoftware: [
      {
        name: "lolMiner",
        link: "https://github.com/Lolliedieb/lolMiner-releases/releases",
      },
      {
        name: "Gminer",
        link: "https://github.com/develsoftware/GMinerRelease/releases",
      },
      {
        name: "miniZ",
        link: "https://miniz.ch/download/",
      },
      {
        name: "Bminer",
        link: "https://www.bminer.me/releases/",
      },
      {
        name: "OpenCL",
        link: "https://github.com/BeamMW/opencl-miner/releases/tag/opencl-miner_1.0.82",
      },
    ],
  },
];

export const exchangesBuy = [
  {
    title: "Gate.io",
    image: "exchanges/gateio",
    link: "https://www.gate.io/trade/BEAM_USDT",
  },
  {
    title: "MEXC Global",
    image: "exchanges/mexc",
    link: "https://www.mexc.com/exchange/BEAM_USDT?_from=market",
  },
  {
    title: "Tradeogre",
    image: "exchanges/tradeogre",
    link: "https://tradeogre.com/exchange/BTC-BEAM",
  },
  {
    title: "Hotbit",
    image: "exchanges/hotbit",
    link: "https://www.hotbit.io/exchange?symbol=BEAM_USDT",
  },
  {
    title: "Bitforex",
    image: "exchanges/bitforex",
    link: "https://www.bitforex.com/en/spot/beam_usdt",
  },
  {
    title: "Atomars",
    image: "exchanges/atomars",
    link: "https://atomars.com/trading/BEAMBTC",
  },
  {
    title: "CoinEx",
    image: "exchanges/coinex",
    link: "https://www.coinex.com/exchange?currency=usdt&dest=beam#spot",
  },
  {
    title: "Bkex",
    image: "exchanges/bkex",
    link: "https://www.bkex.com/trade/BEAM_USDT",
  },
];

export const instantExchangesBuy = [
  {
    title: "Beam4Me",
    image: "instant-exchanges/beam4me",
    link: "https://beam4.me/?from_curr=ETH&from_chain=1&to_curr=BEAM&to_chain=-1",
  },
  {
    title: "Simpleswap",
    image: "instant-exchanges/simpleswap",
    link: "https://simpleswap.io/?to=beam",
  },
  {
    title: "StealthEX",
    image: "instant-exchanges/stealthex",
    link: "https://stealthex.io/?to=beam",
  },
  {
    title: "Kriptomat",
    image: "instant-exchanges/kriptomat",
    link: "https://kriptomat.io/cryptocurrency-prices/beam-price/",
  },
];

export const pressArticles = [
  {
    image: "coindesk",
    href: "https://www.coindesk.com/the-first-cryptocurrency-to-use-mimblewimble-privacy-tech-is-now-live",
  },
  {
    image: "benthamsgaze",
    href: "https://www.benthamsgaze.org/2019/05/22/efficient-cryptographic-arguments-and-proofs-or-how-i-became-a-fractional-monetary-unit/",
  },
  {
    image: "unchainedpodcast",
    href: "https://unchainedpodcast.com/why-beam-thinks-businesses-will-use-its-cryptocurrency/",
  },
  {
    image: "cryptocopia",
    href: "https://www.youtube.com/watch?v=NZ_EkKUkY0s",
  },
  {
    image: "cryptwerk",
    href: "https://cryptwerk.com/pay-with/beam/",
  },
  {
    image: "blockspot",
    href: "https://blockspot.io/coin/beam/",
  },
  {
    image: "bitcoinexchangeguide",
    href: "https://bitcoinexchangeguide.com/crypto-privacy-coin-beam-ceo-tells-trade-io-why-he-is-such-a-big-believer-in-financial-privacy/",
  },
  {
    image: "cryptonews",
    href: "https://cryptonews.com/exclusives/an-interview-the-new-hot-beam-coin-is-live-what-comes-next-3271.htm",
  },
];

export enum ExternalLinksIcon {
  GITHUB = "github",
  TELEGRAM = "telegram",
  TWITTER = "twitter",
  SUBSTACK = "substack",
  REDDIT = "reddit",
  DISCORD = "discord",
  YOUTUBE = "youtube",
  ANCHOR = "anchor",
  FORUM = "forum",
  BITCOINTALK = "bitcointalk",
  MEDIUM = "medium",
  COINGECKO = "coingecko",
  CMC = "cmc",
}

export default {};

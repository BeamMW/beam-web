import defaultTheme from "tailwindcss/defaultTheme";

function deduplicateArray<T>(array: T[]): T[] {
  return array.filter((value, index) => {
    return array.indexOf(value) === index;
  });
}

const config = {
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    // Modal
    "transition-opacity",
    "ease-out",
    "duration-300",

    // Error page
    "hover:bg-white",
    "border-white",
    "text-white",

    // Background colors
    "beam-bg-blue",
    "beam-bg-purple",
    "beam-bg-green",

    "height-transition-enter-active",
    "height-transition-leave-active",
    "height-transition-enter",
    "height-transition-leave-to",
    "height-transition-enter-to",
    "height-transition-leave",
    "!opacity-100",
    "bg-beam-blue-dark",
    "bg-beam-green-dark",
    "bg-beam-purple-dark",
    "bg-beam-pink",
    "hover:bg-beam-blue",
    "hover:bg-beam-green",
    "hover:bg-beam-green-dark",
    "hover:bg-beam-purple",
    "hover:bg-beam-pink",
    "focus:ring-beam-blue",
    "focus:ring-beam-green",
    "focus:ring-beam-green-dark",
    "focus:ring-beam-green/75",
    "focus:ring-beam-purple",
    "focus:ring-beam-pink",
    {
      pattern: /(border|ring|bg|text)-beam-.*/,
    },
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-out-custom": "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      backgroundImage: {
        "page-radial-gradient":
          "radial-gradient(ellipse at top, #072B51, #041D3C, #041D3C)",
        "page-radial-gradient-purple":
          "radial-gradient(ellipse at top, #360061, #1C002E, #1C002E)",
        "page-radial-gradient-dark-green":
          "radial-gradient(ellipse at top, #00331A, #00150B, #00150B)",
      },
      fontFamily: {
        // https://github.com/nuxt-modules/fontaine/issues/145
        sans: deduplicateArray([
          "ProximaNova",
          "-apple-system",
          "BlinkMacSystemFont",
          "ProximaNova override",
          ...defaultTheme.fontFamily.sans,
        ]),
        bold: deduplicateArray([
          "ProximaNova-Bold",
          "-apple-system",
          "BlinkMacSystemFont",
          "ProximaNova-Bold override",
          ...defaultTheme.fontFamily.sans,
        ]),
        italic: deduplicateArray([
          "ProximaNova-Italic",
          "-apple-system",
          "BlinkMacSystemFont",
          "ProximaNova-Italic override",
          ...defaultTheme.fontFamily.sans,
        ]),
      },
      colors: {
        "beam-blue": "var(--beam-blue)", // #25C1FF
        "beam-blue-dark": "var(--beam-blue-dark)", // #0B76FF
        "beam-purple": "var(--beam-purple)", // #9D6EFF
        "beam-purple-dark": "var(--beam-purple-dark)", // #AB37E6
        "beam-pink": "var(--beam-pink)", // #FE52FF
        "beam-green": "var(--beam-green)", // #39FFF2
        "beam-green-dark": "var(--beam-green-dark)", // #00E2C2

        // Theme background colors
        "beam-bg-blue": "#041D3C",
        "beam-bg-purple": "#1C002E",
        "beam-bg-green": "#00150B",
      },
    },
  },
};

export default config;

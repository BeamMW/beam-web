import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  safelist: [
    // Modal
    "transition-opacity",
    "ease-out",
    "duration-300",

    // Error page
    "hover:bg-white",
    "border-white",
    "text-white",

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
      keyframes: {
        "modal-scale": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        /* text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        }, */
      },
      animation: {
        "modal-scale-in":
          "modal-scale 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "modal-scale-out":
          "modal-scale 0.25s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards",
        // text: "text 10s ease infinite",
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
        sans: ["ProximaNova", 'ProximaNova override', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "beam-blue": "var(--beam-blue)", // #25C1FF
        "beam-blue-dark": "var(--beam-blue-dark)", // #0B76FF
        "beam-purple": "var(--beam-purple)", // #9D6EFF
        "beam-purple-dark": "var(--beam-purple-dark)", // #AB37E6
        "beam-pink": "var(--beam-pink)", // #FE52FF
        "beam-green": "var(--beam-green)", // #39FFF2
        "beam-green-dark": "var(--beam-green-dark)", // #00E2C2
      },
    },
  },
};

export default config;

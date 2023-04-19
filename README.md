# Beam Web: State-of-the-Art, Static Website

Beam cryptocurrency unveils its revamped website, utilizing Nuxt 3 (Vue 3) and optimized for IPFS hosting. The website aims to provide an accessible platform for Beam-related information, proudly built by the dedicated Beam community.

## Prerequisites

To run or generate a static version, you need:

- Node.js 20+
- Yarn 2.x

Windows users should also install Python, Visual Studio Code Build Tools, and "Desktop Development option C++" from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/). For ARM64 machines, install "MSVC v143 - VS 2022 C++" for ARM.

## Launch Development Server

Run the following commands to launch the development server:

```bash
yarn install
yarn dev
```

## Generate Static Website

To generate the static website ready for production, run:

```bash
yarn install
yarn generate
```

The generated HTML files will be located in `.output/public/`.

## Key Features

- **Static Generation:** Ensures performance and lower hosting costs.
- **IPFS Hosting:** Decentralized, secure, and censorship-resistant.
- **Multilingual Support:** Translated pages for global users.
- **Optimized SVGs:** Advanced techniques to reduce file size and improve loading.
- **Nuxt 3 (Vue 3):** Latest Nuxt.js version for building high-performance web apps.

### Website Structure

1. **Homepage:** Overview and external links.
2. **Download Page:** Wallet download and setup instructions.
3. **Privacy Policy Page:** Privacy practices and data collection policies.
4. **dApp Store Page:** Showcasing dApps on the Beam network.

### SVG Optimization Policy

To optimize SVGs and ensure minimal bandwidth usage, we:

1. **SVGOMG Optimization:** Apply all options except "Remove xmlns" and set number precision between 0 and 3.
2. **GPT-4 Optimization:** Utilize GPT-4 AI model for further optimization.

## Conclusion

Beam Web offers a seamless experience, utilizing Nuxt 3 (Vue 3) and IPFS hosting. The website showcases the Beam community's dedication and paves the way for growth. We invite users to explore the new site and look forward to Beam's ecosystem progress.

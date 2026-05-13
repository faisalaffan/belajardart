<p align="center">
  <a href="./README.md">English</a> | <a href="./README.id.md">Bahasa Indonesia</a>
</p>

<p align="center">
  <img src="assets/01_BANNER.png" alt="Flutter Docs Banner" width="100%" />
</p>

<p align="center">
  <img src="assets/02_APP_ICON.png" alt="Flutter Docs Logo" width="120" />
</p>

<h1 align="center">Flutter Docs</h1>

<p align="center">
  A comprehensive documentation site and structured tutorials for learning Dart and building Flutter applications.
</p>

<p align="center">
  <a href="https://github.com/faisalaffan/belajardart/blob/dev/LICENSE"><img src="https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg" alt="License: CC BY-SA 4.0"></a>
  <img src="https://img.shields.io/badge/Built%20with-Fumadocs-blue" alt="Built with Fumadocs">
  <img src="https://img.shields.io/badge/Framework-Next.js%2016-black" alt="Next.js 16">
</p>

---

## Features

- **Dart Documentation** — Technical guides and language references
- **Flutter Tutorials** — Structured, step-by-step tutorials with best practices
- **Full-text Search** — Quickly find topics with `Ctrl+K` / `Cmd+K`
- **Modern UI** — Powered by [Fumadocs](https://fumadocs.vercel.app/) with a clean reading experience

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/faisalaffan/belajardart.git
cd belajardart

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
belajardart/
├── app/              # Next.js app routes
├── assets/           # Images, banners, icons
├── content/
│   ├── docs/         # Documentation pages (MDX)
│   └── tutorials/    # Tutorial pages (MDX)
├── lib/              # Shared utilities
├── source.config.ts  # Fumadocs source configuration
└── next.config.mjs   # Next.js configuration
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the documentation.

## License

This project is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International](LICENSE).

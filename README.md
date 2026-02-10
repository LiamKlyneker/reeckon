# Veta

**The Agent Skills directory for your Team.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/) [![Vercel AI SDK](https://img.shields.io/badge/AI_SDK-Core-black)](https://sdk.vercel.ai/docs) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Note:** Veta is currently in active development. This repository contains the **Platform & Documentation** layer. The CLI runner is developed in a separate package.

---

## 📖 The Problem

Companies today have "Senior Engineer Knowledge" locked in people's heads.

- _How do we write a secure SQL query for our schema?_
- _What is the standard way to handle Auth in our Next.js app?_
- _How do I debug our legacy payment service?_
- _How we should document our components?_

Developers are using inconsistent prompts into Claude, Cursor, Copilot and even ChatGPT every day. **There is no single source of truth for AI skills.**

## 🚀 The Solution: Veta

**Veta** is a developer tool that treats AI Skills (prompts) like components and generates a complete directory of them for your team sorted by categories or areas of expertise. Inspired by Skills.sh and Storybook.

Just as we have tools that standardized UI development, **Veta standardizes AI Agent Skills.** It allows teams to:

1.  **Write Skills Once:** Create `SKILL.md` files.
2.  **Compile for Any Agent:** Automatically generate `.cursorrules`, `.agents` snippets, and Claude Project instructions from your single source of truth.
3.  **Directory & Search:** Browse and search your team's AI Skills in a centralized platform sorted by categories, areas of expertise and more.

---

## ⚡ Tech Stack

This platform is built with the cutting edge of the React ecosystem (2026 standards):

- **Framework:** [Next.js 16](https://nextjs.org) (App Router & Server Actions)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (Oxide Engine)
- **UI Library:** [Shadcn/ui](https://ui.shadcn.com)
- **Content:** [MDX](https://mdxjs.com/) + [Shiki](https://shiki.style/) (High-fidelity syntax highlighting)
- TBD: **Database:** Drizzle ORM + SQLite (LibSQL)

---

## 🛠️ Architecture

Veta is composed of two parts:

### 1. The Platform (This Repo)

The public-facing documentation, registry search, and marketing layer. It uses **Next.js 16** to deliver a blazing-fast, SEO-optimized experience.

### 2. The Runner (CLI)

The local development tool that engineers install in their projects.

- **Command:** `npx veta dev`
- **Engine:** Vite (Runs locally, no data leaves the laptop).
- **Function:** Scans `SKILL.md` files and launches a local dashboard.

---

## 🏁 Getting Started (Development)

To run this platform locally:

1.  **Clone the repo**

    ```bash
    git clone [https://github.com/your-org/veta.git](https://github.com/your-org/veta.git)
    cd veta
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Set up environment**

    ```bash
    cp .env.example .env.local
    # Add your OpenAI/Anthropic keys for the AI playground features
    ```

4.  **Run the development server**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Named after the **"Veta"** (Mineral Vein) — representing the rich source of knowledge deep within a mountain (or a company)._

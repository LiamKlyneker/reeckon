# packages/create-veta — CONTEXT

## What this is

The `create-veta` package is a scaffolder that generates a new Veta skills project. Run via `pnpm create veta` (or `npx create-veta`).

## What it generates

```
my-skills/
├── skills/
│   └── code-review/
│       └── SKILL.md        ← example skill with frontmatter
├── package.json            ← scripts: dev/build using veta CLI
└── .gitignore
```

## Key decisions

- Uses `prompts` for interactive project name input (or accepts it as CLI arg)
- The generated `package.json` depends on `veta: "latest"`
- Minimal output — just enough to run `pnpm dev` immediately

# packages/create-reeckon — CONTEXT

## What this is

The `create-reeckon` package is a scaffolder that generates a new Reeckon skills project. Run via `pnpm create reeckon` (or `npx create-reeckon`).

## What it generates

```
my-skills/
├── skills/
│   └── code-review/
│       └── SKILL.md        ← example skill with frontmatter
├── package.json            ← scripts: dev/build using reeckon CLI
└── .gitignore
```

## Key decisions

- Uses `prompts` for interactive project name input (or accepts it as CLI arg)
- Supports `create-reeckon .` to scaffold into the current directory — when the resolved `targetDir` equals `process.cwd()`, the project name is derived from `basename(process.cwd())` (not the literal `.`), and the `cd` line is omitted from the "Next steps" output
- The generated `package.json` depends on `reeckon: "latest"`
- Minimal output — just enough to run `pnpm dev` immediately

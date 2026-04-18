# create-reeckon

Scaffold a new [Reeckon](https://www.npmjs.com/package/reeckon) project for your AI skills.

## Usage

```bash
pnpm create reeckon my-skills
# or
npm create reeckon@latest my-skills
# or
yarn create reeckon my-skills
```

Then:

```bash
cd my-skills
pnpm install
pnpm dev
```

## What it scaffolds

```
my-skills/
├── skills/
│   └── code-review/
│       └── SKILL.md     ← example skill with YAML frontmatter
├── package.json         ← scripts: dev / build using the reeckon CLI
└── .gitignore
```

The generated `package.json` depends on `reeckon: "latest"`, so `pnpm install` pulls the CLI in, and `pnpm dev` launches the skill viewer immediately.

## Links

- **Main package**: [reeckon](https://www.npmjs.com/package/reeckon)
- **GitHub**: [LiamKlyneker/reeckon](https://github.com/LiamKlyneker/reeckon)
- **Issues**: [LiamKlyneker/reeckon/issues](https://github.com/LiamKlyneker/reeckon/issues)

## License

MIT — see [LICENSE](./LICENSE).

---
"reeckon": minor
"create-reeckon": minor
---

Require Node.js 22+. The project's pnpm version already requires Node 22.13, so CI can no longer verify Node 20 support — `engines.node` is bumped to `>=22` to match what's actually tested.

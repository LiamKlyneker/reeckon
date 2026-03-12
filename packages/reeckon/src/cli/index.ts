import cac from "cac";

const cli = cac("reeckon");

cli
  .command("dev", "Start the viewer dev server")
  .option("-p, --port <port>", "Port to serve on", { default: 4321 })
  .action(async (options: { port: number }) => {
    const { devCommand } = await import("./commands/dev.js");
    await devCommand({ port: options.port });
  });

cli
  .command("build", "Build a static viewer site")
  .action(async () => {
    const { buildCommand } = await import("./commands/build.js");
    await buildCommand();
  });

cli
  .command("add <repo>", "Install skills from a remote repository")
  .option("--skill <name>", "Install specific skill(s) by name (comma-separated)")
  .option("--token <token>", "Auth token for private repos")
  .option(
    "--tool <tools>",
    "Comma-separated tools: claude-code,cursor,antigravity"
  )
  .action(async (repo: string, options: Record<string, string>) => {
    const { addCommand } = await import("./commands/add.js");
    await addCommand({ repo, ...options });
  });

cli.help();
cli.version("0.1.0");

cli.parse();

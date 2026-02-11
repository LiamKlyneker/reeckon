import cac from "cac";

const cli = cac("veta");

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

cli.help();
cli.version("0.1.0");

cli.parse();

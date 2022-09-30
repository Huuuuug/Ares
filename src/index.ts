#!/usr/bin/env node
import { Command } from "commander";
import createApp from "./modules/createApp";

const program = new Command();

program
  .version(`${require("../package.json").version}`)
  .usage("<command> [options]");

program
  .command("create <app-name>")
  .description("Create new project")
  .option("-f --force", "if it exist, overwrite directory")
  .action(async (name: string, options: any) => {
    await createApp(name, options);
  });

program.parse(process.argv);

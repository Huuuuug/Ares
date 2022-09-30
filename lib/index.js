#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const createApp_1 = __importDefault(require("./modules/createApp"));
const program = new commander_1.Command();
program
    .version(`${require("../package.json").version}`)
    .usage("<command> [options]");
program
    .command("create <app-name>")
    .description("Create new project")
    .option("-f --force", "if it exist, overwrite directory")
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createApp_1.default)(name, options);
}));
program.parse(process.argv);

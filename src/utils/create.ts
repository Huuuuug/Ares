import { existsSync, remove } from "fs-extra";
import download = require("download-git-repo");
import ora from "ora";
import chalk from "chalk";
import { prompt } from "inquirer";
import {
  getProjectPath,
  clearConsole,
  packageJSON,
  readJsonFile,
  writeJsonFile,
} from "./common";
import { exec } from "child_process";

/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出
 * @param filename 文件名
 */
export async function isFileExist(
  filename: string,
  options: any
): Promise<void> {
  // 文件路径
  const file = getProjectPath(filename);
  // 验证文件是否已经存在，存在则推出进程
  if (existsSync(file)) {
    if (options.force) {
      remove(file);
    } else {
      const { replace } = await prompt([
        {
          name: "replace",
          type: "list",
          message: `项目已经存在,是否确认覆盖? ${chalk.gray(
            "覆盖后原项目将无法修复"
          )}`,
          choices: [
            { name: "确认覆盖", value: true },
            { name: "再考虑下", value: false },
          ],
        },
      ]);
      if (!replace) {
        process.exit();
      }
      await remove(file);
    }
  }
}
/**
 * 模板选择
 * @returns 模板名称
 */
export async function featureSelect(): Promise<string> {
  // 清空命令行
  clearConsole();
  // 选择模板
  const { feature } = await prompt([
    {
      name: "feature",
      type: "list",
      choices: [{ name: "Vue", value: "vue" }],
      message: "请选择一个模板进行创建",
    },
  ]);
  return feature as string;
}
/**
 * 初始化项目
 * @param projectName 项目名
 * @param template 选择的模板
 */
export async function initProject(
  projectName: string,
  template: string
): Promise<void> {
  return new Promise((resolve) => {
    // 文件路径
    const file = getProjectPath(projectName);
    const spinner = ora("downloading template...");
    spinner.start();
    download("github:Huuuuug/vite-cli", file, (err: any) => {
      if (err) {
        spinner.fail();
        process.exit();
      } else {
        spinner.succeed();
        resolve();
      }
    });
  });
}
/**
 * 改写package.json
 * @param projectName 项目名
 */
export function changePackageInfo(projectName: string): void {
  // 文件路径
  const file = getProjectPath(projectName);
  const packageJSON: packageJSON = readJsonFile<packageJSON>(
    `${file}/package.json`
  );
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<packageJSON>(`${file}/package.json`, packageJSON);
}
/** 安装依赖 */
export function installDependency(projectName: string): void {
  const spinner = ora("安装依赖...");
  spinner.start();
  exec(`cd ${projectName} && npm i`, (err, stdout) => {
    // if (err) {
    //   spinner.succeed();
    //   console.log(chalk.red(JSON.stringify(err)));
    // }
    spinner.succeed();
    process.exit();
  });
}

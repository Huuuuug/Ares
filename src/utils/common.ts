import { clear } from "console";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs-extra";

export interface packageJSON {
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
}
/**
 *  获取项目绝对路径
 * @param projectName 项目名
 * @returns
 */
export function getProjectPath(projectName: string): string {
  // 1.获取当前位置（当前输入命令行的位置）
  const cwd = process.cwd();
  return resolve(cwd, projectName);
}
/**
 * 读取指定路径下的 json 文件
 * @param filename filename json 文件的路径
 * @returns
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(readFileSync(filename, { encoding: "utf-8", flag: "r" }));
}
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export function writeJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content, null, 2));
}
/**
 * 清空命令行
 */
export function clearConsole(): void {
  clear();
}

import { prompt } from "inquirer";
import { existsSync, remove } from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import path from "path";
export default async function createApp(name: string, options: any) {
  // 1.获取当前位置（当前输入命令行的位置）
  const cwd = process.cwd();

  // 2.需要创建的文件（在当前输入命名的位置进行创建）
  const targetPath = path.join(cwd, name);

  // 3.通过交互式命令行，选择我们要创建的模版
  const { projectName } = await prompt({
    name: "projectName",
    type: "list",
    choices: [{ name: "Vue", value: "vue" }],
    message: "请选择一个模板进行创建",
  });

  // 4.判断项目是否已存在
  if (existsSync(targetPath)) {
    if (options.force) {
      await remove(targetPath);
    } else {
      // 如果存在，则通过交互式命令询问是否覆盖项目
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
        return;
      }
      await remove(targetPath);
    }
  }
  // 5.复制我们准备好的模版
  const spinner = ora("downloading template...");
  spinner.start();
}

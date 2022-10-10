import {
  isFileExist,
  featureSelect,
  initProject,
  changePackageInfo,
  installDependency,
} from "../utils/create";

export default async function createApp(
  name: string,
  options: any
): Promise<void> {
  // 选择模板
  const feature = await featureSelect();
  // 判断文件是否已经存在
  await isFileExist(name, options);
  // 初始化项目目录
  await initProject(name, feature);
  // 改写项目的 package.json 基本信息(name,description)
  changePackageInfo(name);
  // 安装依赖
  installDependency(name);
}

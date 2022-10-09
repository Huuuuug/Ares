import download = require("download-git-repo");

export default async function downloadTemplate(
  templateName: string,
  path: string
) {
  download("Huuuuug/vite-cli", path, (err: any) => {
    if (err) {
      throw new Error(JSON.stringify(err));
    } else {
      console.error("下载失败");
    }
  });
}

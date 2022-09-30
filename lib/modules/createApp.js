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
const inquirer_1 = require("inquirer");
const fs_extra_1 = require("fs-extra");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
function createApp(name, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1.获取当前位置（当前输入命令行的位置）
        const cwd = process.cwd();
        // 2.需要创建的文件（在当前输入命名的位置进行创建）
        const targetPath = path_1.default.join(cwd, name);
        // 3.通过交互式命令行，选择我们要创建的模版
        const { projectName } = yield (0, inquirer_1.prompt)({
            name: "projectName",
            type: "list",
            choices: [{ name: "Vue", value: "vue" }],
            message: "请选择一个模板进行创建",
        });
        // 4.判断项目是否已存在
        if ((0, fs_extra_1.existsSync)(targetPath)) {
            if (options.force) {
                yield (0, fs_extra_1.remove)(targetPath);
            }
            else {
                // 如果存在，则通过交互式命令询问是否覆盖项目
                const { replace } = yield (0, inquirer_1.prompt)([
                    {
                        name: "replace",
                        type: "list",
                        message: `项目已经存在,是否确认覆盖? ${chalk_1.default.gray("覆盖后原项目将无法修复")}`,
                        choices: [
                            { name: "确认覆盖", value: true },
                            { name: "再考虑下", value: false },
                        ],
                    },
                ]);
                if (!replace) {
                    return;
                }
                yield (0, fs_extra_1.remove)(targetPath);
            }
        }
        // 5.复制我们准备好的模版
        const spinner = (0, ora_1.default)("downloading template...");
        spinner.start();
    });
}
exports.default = createApp;

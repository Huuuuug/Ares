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
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("../utils/create");
function createApp(name, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // 选择模板
        const feature = yield (0, create_1.featureSelect)();
        // 判断文件是否已经存在
        yield (0, create_1.isFileExist)(name, options);
        // 初始化项目目录
        yield (0, create_1.initProject)(name, feature);
        // 改写项目的 package.json 基本信息(name,description)
        (0, create_1.changePackageInfo)(name);
        // 安装依赖
        (0, create_1.installDependency)(name);
    });
}
exports.default = createApp;

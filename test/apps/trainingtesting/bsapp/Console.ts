/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { MaterialFunc, MaterialChooseServiceMapping, MaterialLinkServiceMapping } from "./material/index";
import { CustomerFunc, CustomerChooseServiceMapping, CustomerLinkServiceMapping } from "./customer/index";
import { SalesOrderFunc, SalesOrderChooseServiceMapping, SalesOrderLinkServiceMapping } from "./salesorder/index";
import { DemoUrlFunc, DemoTabFunc, DemoResidentApp, DemoServiceMapping } from "./others/index";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "e6424319-a311-440e-bc89-a825f82d5847";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "TrainingTesting";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "trainingtesting/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new MaterialFunc());
        this.register(new CustomerFunc());
        this.register(new SalesOrderFunc());
        // 注册服务应用
        this.register(new MaterialChooseServiceMapping());
        this.register(new MaterialLinkServiceMapping());
        this.register(new CustomerChooseServiceMapping());
        this.register(new CustomerLinkServiceMapping());
        this.register(new SalesOrderChooseServiceMapping());
        this.register(new SalesOrderLinkServiceMapping());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(Console.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/trainingtesting.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/material.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/customer.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/salesorder.json", rootUrl));
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.ModuleConsole.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: Console = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}

/** 模块控制台 */
export class ConsoleOthers extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "e6424319-a311-440e-bc89-a825f82d5848";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "TrainingTestingOthers";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "trainingtesting/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ConsoleOthers.CONSOLE_ID;
        this.name = ConsoleOthers.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new DemoUrlFunc());
        this.register(new DemoTabFunc());
        // 注册服务应用
        this.register(new DemoServiceMapping());
        // 注册常驻应用
        this.register(new DemoResidentApp());

    }
    /** 运行 */
    run(): void {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(Console.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/trainingtestingothers.json", rootUrl));
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}

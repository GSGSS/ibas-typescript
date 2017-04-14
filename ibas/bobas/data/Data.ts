/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import { i18n } from "../i18n/index";
/**
 * 对象
 */
export module object {
    /**
     * 是否为空
     * @param object 判断对象
     */
    export function isNull(object: any): boolean {
        if (object === undefined || object === null) {
            return true;
        }
        return false;
    }
    /**
     * 判断数据是否为某类型
     * @param instance 数据
     * @param type 类型
     */
    export function instanceOf(instance: any, type: any): boolean {
        if (isNull(instance) || isNull(type)) {
            return false;
        }
        // 直接判断
        if (instance instanceof type) {
            return true;
        }
        // 通过名称判断，不安全
        let tType: any = Object.getPrototypeOf(instance).constructor;
        if (isAssignableFrom(tType, type)) {
            return true;
        }
        return false;
    }
    /**
     * 判断是否为其子类
     * @param subType 待判断类型
     * @param type 父类型
     */
    export function isAssignableFrom(subType: any, type: any): boolean {
        if (isNull(subType) || isNull(type)) {
            return false;
        }
        if (isSame(subType, type)) {
            return true;
        }
        let cType: any = Object.getPrototypeOf(subType);
        while (!isNull(cType)) {
            if (isSame(cType, type)) {
                return true;
            }
            cType = Object.getPrototypeOf(cType);
        }
        return false;
    }
    /**
     * 是否一样
     * @param type1 类型1
     * @param type2 类型2
     */
    export function isSame(type1: any, type2: any): boolean {
        if (type1 === type2) {
            return true;
        }
        if (isNull(type1) || isNull(type2)) {
            return false;
        }
        if (type1.name === type2.name) {
            return true;
        }
        return false;
    }
    /**
     * 获取类型名称
     * @param type 类型
     */
    export function getName(type: any): any {
        if (object.isNull(type)) {
            return undefined;
        }
        return type.name;
    }
}
/**
 * 唯一标识
 */
export module uuid {
    export function random(): string {
        function s4(): string {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    }
}
/**
 * 枚举
 */
export module enums {
    /** 转换为枚举值
     * @param type 目标类型
     * @param value 值
     * @returns 枚举值，失败为undefined
     */
    export function valueOf(type: any, value: any): number {
        if (object.isNull(type) || object.isNull(value)) {
            return undefined;
        }
        for (let item in type) {
            if (typeof item === typeof value) {
                if (item.toUpperCase() === value.toUpperCase()) {
                    return type[item];
                }
            }
        }
        return undefined;
    }
    /**
     * 转为字符串
     * @param type 类型
     * @param value 值
     */
    export function toString(type: any, value: any): string {
        if (typeof value === "number") {
            // 值是数值类型
            return type[value];
        }
        return value;
    }
    /**
     * 描述枚举值
     * @param type 目标类型
     * @param value 值
     * @returns 首先语言，然后枚举，最后原始
     */
    export function describe(type: any, value: any): string {
        if (object.isNull(type) || object.isNull(value)) {
            return value;
        }
        // 获取枚举值
        let sValue: any = value;
        if (typeof sValue === "number") {
            sValue = type[sValue];
        }
        let dValue: string = sValue;
        // 获取枚举名称
        let name: string = "em_";// type.name;
        if (!object.isNull(name)) {
            dValue = i18n.prop((name + sValue).toLowerCase());
            if (dValue.startsWith("[") && dValue.endsWith("]")) {
                // 没有找到语言描述
                dValue = sValue;
            }
        }
        return dValue;
    }
}

export module dates {

    /**
     * 解析日期，支持以下格式
     * yyyy/MM/dd'T'HH:mm:ss
     * yyyy-MM-dd'T'HH:mm:ss
     * @param value 日期字符
     * @returns 日期
     */
    export function valueOf(value: string): Date {
        let spTime: string = "T";
        if (value.indexOf("'T'") > 0) {
            spTime = "'T'";
        }
        let tmps: string[] = value.split(spTime);
        let date: string = tmps[0];
        let time: string = tmps[1];
        let year: number = 0, month: number = 0, day: number = 0, hour: number = 0, minute: number = 0, second: number = 0;
        if (!object.isNull(date)) {
            let spChar: string = "-";
            if (date.indexOf("/") > 0) {
                spChar = "/";
            }
            tmps = date.split(spChar);
            if (!object.isNull(tmps[0])) {
                year = Number.parseInt(tmps[0]);
            }
            if (!object.isNull(tmps[1])) {
                month = Number.parseInt(tmps[1]);
            }
            if (!object.isNull(tmps[2])) {
                day = Number.parseInt(tmps[2]);
            }
        }
        if (!object.isNull(time)) {
            let spChar: string = ":";
            tmps = time.split(spChar);
            if (!object.isNull(tmps[0])) {
                hour = Number.parseInt(tmps[0]);
            }
            if (!object.isNull(tmps[1])) {
                minute = Number.parseInt(tmps[1]);
            }
            if (!object.isNull(tmps[2])) {
                second = Number.parseInt(tmps[2]);
            }
        }
        return new Date(year, month, day, hour, minute, second);
    }

    /**
     * 转换日期
     * @param value 日期
     * @returns 日期字符串
     */
    export function toString(value: Date): string {
        let year: number = value.getFullYear(),
            month: number = value.getMonth(),
            day: number = value.getDate(),
            hour: number = value.getHours(),
            minute: number = value.getMinutes(),
            second: number = value.getSeconds();
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;
    }
}
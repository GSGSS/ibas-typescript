﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";

/**
 * 离线的数据转换者
 */
export class DataConverter4Demo implements ibas.IDataConverter {

    /**
     * 转换数据
     * @param data 当前类型数据
     * @returns 转换的数据
     */
    convert(data: any): string {
        return data;
    }

    /**
     * 解析数据
     * @param data 原始数据
     * @returns 当前类型数据
     */
    parsing(data: any): any {
        return data;
    }
}
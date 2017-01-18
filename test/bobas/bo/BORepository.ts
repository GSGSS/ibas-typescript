﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as bobas from '../../../src/bobas/bobas';
import { SalesOrder } from './SalesOrder';
/**
 * 业务仓库应用
 */
export class BORepositoryTest extends bobas.BORepositoryApplication {

    conect() {
        let listener: bobas.RemoteListener = {
            onCompleted(opRslt: bobas.IOperationResult<any>) {
                console.debug(opRslt.resultCode + " - " + opRslt.message);
            }
        };
        super.callRemoteMethod("hello", null, listener);
    }

    protected createAjaxSettings(method: string, data: any): JQueryAjaxSettings {
        // 重写ajax设置
        if (method !== "hello") {
            return super.createAjaxSettings(method, data);
        }
        // 特殊方法的处理
        let ajxSetting = super.createAjaxSettings(method, data);
        ajxSetting.type = "GET";
        ajxSetting.dataType = undefined;
        return ajxSetting;
    }

    fetchSalesOrder(criteria: bobas.ICriteria) {
        super.fetch("fetchSalesOrder", criteria);
    }

    saveSalesOrder(bo: SalesOrder) {
        super.save("saveSalesOrder", bo);
    }
}



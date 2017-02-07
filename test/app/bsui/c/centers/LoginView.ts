﻿/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as sys from "../../../../../src/bsbas/bsbas";

/**
 * 系统入口应用
 */
export class LoginView implements sys.IMainView {
    /** 唯一标识 */
    id: string;
    /** 名称 */
    title: string;
    /** 是否已显示 */
    isDisplayed: boolean;
    /** 绘制视图 */
    darw(): any {
        return `<label>user</label>
<input type="text" name="user">
<br />
<label>password</label>
<input type="text" name="password">
<br />
<input type="button" value="login" onclick="testHello();" />
<br />`;
    }

}
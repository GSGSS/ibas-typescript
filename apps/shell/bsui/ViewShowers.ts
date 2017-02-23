/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../openui5/typings/index.d.ts" />
import * as ibas from "../../../ibas/index";

/**
 * 视图-显示者-默认
 */
export class ViewShowerDefault implements ibas.IViewShower {
    /** 显示视图 */
    show(view: ibas.IView): void {
        let viewContent = view.darw();
        if (ibas.object.isNull(viewContent)) {
            ibas.logger.log(ibas.emMessageLevel.WARN, "shower: empty view.");
        } else if (viewContent instanceof sap.ui.layout.Grid) {
            viewContent.placeAt("content");
        } else if (viewContent instanceof sap.tnt.ToolPage) {
            viewContent.placeAt("content");
        } else {
            throw new Error(ibas.i18n.prop("sys_shell_invalid_ui"));
        }
    }
    /** 清理资源 */
    destroy(view: ibas.IView): void {
        let ui: sap.ui.core.Element = sap.ui.getCore().byId(view.id);
        if (!ibas.object.isNull(ui)) {
            ui.destroy(true);
        }
        // 销毁忙对话框
        if (!ibas.object.isNull(this.busyDialog)) {
            this.busyDialog.destroy(true);
        }
    }
    /** 忙对话框 */
    private busyDialog: sap.m.BusyDialog;
    /** 设置忙状态 */
    busy(view: ibas.IView, busy: boolean, msg: string): any {
        if (busy) {
            if (ibas.object.isNull(this.busyDialog)) {
                this.busyDialog = new sap.m.BusyDialog("");
            }
            this.busyDialog.setTitle(view.title);
            this.busyDialog.setText(msg);
            this.busyDialog.open();
        } else {
            if (!ibas.object.isNull(this.busyDialog)) {
                this.busyDialog.close();
            }
        }
    }
    /** 进程消息 */
    proceeding(view: ibas.IView, type: ibas.emMessageType, msg: string): any {
        this.messages(type, msg, null);
    }
    /** 对话消息 */
    messages(type: ibas.emMessageType, msg: string, callBack: Function): any {
        let that = this;
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.show(
            msg, {
                icon: sap.m.MessageBox.Icon.WARNING,
                title: ibas.i18n.prop("sys_shell_name"),
                actions: [sap.m.MessageBox.Action.OK],
            }
        );
    }
}
/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../../../../openui5/typings/index.d.ts" />
import * as ibas from "../../../../../../ibas/index";
import { SalesOrder } from "../../../borep/bo/index";
import { IDemoChooseView } from "../../../bsapp/demo/index";

/**
 * 视图-demo
 */
export class DemoChooseView extends ibas.BOChooseView implements IDemoChooseView {

    /** 绘制视图 */
    darw(): any {
        let that = this;
        let form = new sap.ui.layout.form.SimpleForm("");
        form.setToolbar(new sap.m.Toolbar("", {
            content: [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_ui_data_choose"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://accept",
                    press: function (): void {
                        that.fireViewEvents(that.chooseDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_ui_data_new"),
                    type: sap.m.ButtonType.Transparent,
                    icon: "sap-icon://create",
                    press: function (): void {
                        that.fireViewEvents(that.newDataEvent);
                    }
                })
            ]
        }));
        this.table = new sap.ui.table.Table("", {
            visibleRowCount: 15,
            rows: "{/}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_salesorder_docentry"),
                    template: new sap.m.Text("", {
                        text: "{docEntry}"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_salesorder_customer"),
                    template: new sap.m.Text("", {
                        text: "{customer}"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_salesorder_documentstatus"),
                    template: new sap.m.Text("", {
                        text: "{documentStatus}"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_salesorder_canceled"),
                    template: new sap.m.Text("", {
                        text: "{canceled}"
                    })
                })
            ]
        });
        form.addContent(this.table);
        this.id = form.getId();
        return form;
    }
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: any): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
}
/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../../../ibas/index.d.ts" />
/// <reference path="../api/index.ts" />
/// <reference path="./bo/index.ts" />
/// <reference path="./DataConverter.ts" />

namespace trainingtesting {
    export namespace bo {
        /** 业务对象仓库 */
        export class BORepositoryTrainingTesting extends ibas.BORepositoryApplication implements IBORepositoryTrainingTesting {

            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter4TT;
            }
            /**
            * 上传文件
            * @param caller 调用者
            */
            upload(caller: ibas.UploadFileCaller<ibas.FileData>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.upload("upload", caller);
            }
            /**
            * 下载文件
            * @param caller 调用者
            */
            download(caller: ibas.DownloadFileCaller<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("download", caller);
            }
            /**
            * 查询 物料主数据
            * @param fetcher 查询者
            */
            fetchMaterial(fetcher: ibas.FetchCaller<bo.Material>): void {
                super.fetch(bo.Material.name, fetcher);
            }
            /**
            * 保存 物料主数据
            * @param saver 保存者
            */
            saveMaterial(saver: ibas.SaveCaller<bo.Material>): void {
                super.save(bo.Material.name, saver);
            }

            /**
            * 查询 客户主数据
            * @param fetcher 查询者
            */
            fetchCustomer(fetcher: ibas.FetchCaller<bo.Customer>): void {
                super.fetch(bo.Customer.name, fetcher);
            }
            /**
            * 保存 客户主数据
            * @param saver 保存者
            */
            saveCustomer(saver: ibas.SaveCaller<bo.Customer>): void {
                super.save(bo.Customer.name, saver);
            }

            /**
            * 查询 销售订单
            * @param fetcher 查询者
            */
            fetchSalesOrder(fetcher: ibas.FetchCaller<bo.SalesOrder>): void {
                super.fetch(bo.SalesOrder.name, fetcher);
            }
            /**
            * 保存 销售订单
            * @param saver 保存者
            */
            saveSalesOrder(saver: ibas.SaveCaller<bo.SalesOrder>): void {
                super.save(bo.SalesOrder.name, saver);
            }

        }
        // 注册业务对象仓库到工厂
        ibas.boFactory.register(BO_REPOSITORY_TRAININGTESTING, BORepositoryTrainingTesting);
    }
}
/**
 * GuanPlus.Accounting.WebApi
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as models from './models';

export interface AccountTransLineItemModel {
    /**
     * id
     */
    id?: number;

    /**
     * 交易日期
     */
    accountTransDate?: Date;

    /**
     * 金额
     */
    amount?: number;

    /**
     * 部门
     */
    department?: models.IdNameModel;

    /**
     * 实体Id
     */
    entityId?: string;

    /**
     * 业务分类
     */
    businessCategory?: models.BusinessCategoryType;

    /**
     * 显示顺序
     */
    order?: number;

    /**
     * 描述
     */
    description?: string;

    /**
     * 应收应付
     */
    receivablePayable?: models.IdNameModel;

    /**
     * 交易
     */
    accountTransactionModel?: models.AccountTransactionModel;

}

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

/**
 * 银行对账单列名称
 */
export interface BankStatementColumnConstModel {
    /**
     * Code
     */
    code?: number;

    /**
     * 数据库中列名称
     */
    designName?: string;

    /**
     * 页面显示列名称
     */
    displayName?: string;

    /**
     * 列 数据 类型
     */
    dataType?: string;

}

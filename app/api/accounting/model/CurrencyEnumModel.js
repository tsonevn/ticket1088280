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
var CurrencyEnumModel;
(function (CurrencyEnumModel) {
    var ValueEnum;
    (function (ValueEnum) {
        ValueEnum[ValueEnum["None"] = 'None'] = "None";
        ValueEnum[ValueEnum["CNY"] = 'CNY'] = "CNY";
    })(ValueEnum = CurrencyEnumModel.ValueEnum || (CurrencyEnumModel.ValueEnum = {}));
})(CurrencyEnumModel = exports.CurrencyEnumModel || (exports.CurrencyEnumModel = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VycmVuY3lFbnVtTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDdXJyZW5jeUVudW1Nb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBZ0JILElBQWlCLGlCQUFpQixDQUtqQztBQUxELFdBQWlCLGlCQUFpQjtJQUM5QixJQUFZLFNBR1g7SUFIRCxXQUFZLFNBQVM7UUFDakIsOEJBQWEsTUFBTSxVQUFBLENBQUE7UUFDbkIsNkJBQVksS0FBSyxTQUFBLENBQUE7SUFDckIsQ0FBQyxFQUhXLFNBQVMsR0FBVCwyQkFBUyxLQUFULDJCQUFTLFFBR3BCO0FBQ0wsQ0FBQyxFQUxnQixpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUtqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogR3VhblBsdXMuQWNjb3VudGluZy5XZWJBcGlcbiAqXG4gKiBPcGVuQVBJIHNwZWMgdmVyc2lvbjogdjFcbiAqIFxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgdGhlIHN3YWdnZXIgY29kZSBnZW5lcmF0b3IgcHJvZ3JhbS5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2FnZ2VyLWFwaS9zd2FnZ2VyLWNvZGVnZW4uZ2l0XG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXJyZW5jeUVudW1Nb2RlbCB7XG4gICAgLyoqXG4gICAgICog6LSn5biB57G75Z6L5p6a5Li+5YC8XG4gICAgICovXG4gICAgdmFsdWU/OiBDdXJyZW5jeUVudW1Nb2RlbC5WYWx1ZUVudW07XG5cbiAgICAvKipcbiAgICAgKiDlkI3np7BcbiAgICAgKi9cbiAgICBuYW1lPzogc3RyaW5nO1xuXG59XG5leHBvcnQgbmFtZXNwYWNlIEN1cnJlbmN5RW51bU1vZGVsIHtcbiAgICBleHBvcnQgZW51bSBWYWx1ZUVudW0ge1xuICAgICAgICBOb25lID0gPGFueT4gJ05vbmUnLFxuICAgICAgICBDTlkgPSA8YW55PiAnQ05ZJ1xuICAgIH1cbn1cbiJdfQ==
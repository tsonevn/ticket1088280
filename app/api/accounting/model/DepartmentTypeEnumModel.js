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
var DepartmentTypeEnumModel;
(function (DepartmentTypeEnumModel) {
    var ValueEnum;
    (function (ValueEnum) {
        ValueEnum[ValueEnum["None"] = 'None'] = "None";
        ValueEnum[ValueEnum["Sales"] = 'Sales'] = "Sales";
        ValueEnum[ValueEnum["Development"] = 'Development'] = "Development";
        ValueEnum[ValueEnum["Other"] = 'Other'] = "Other";
    })(ValueEnum = DepartmentTypeEnumModel.ValueEnum || (DepartmentTypeEnumModel.ValueEnum = {}));
})(DepartmentTypeEnumModel = exports.DepartmentTypeEnumModel || (exports.DepartmentTypeEnumModel = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwYXJ0bWVudFR5cGVFbnVtTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEZXBhcnRtZW50VHlwZUVudW1Nb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBZ0JILElBQWlCLHVCQUF1QixDQU92QztBQVBELFdBQWlCLHVCQUF1QjtJQUNwQyxJQUFZLFNBS1g7SUFMRCxXQUFZLFNBQVM7UUFDakIsOEJBQWEsTUFBTSxVQUFBLENBQUE7UUFDbkIsK0JBQWMsT0FBTyxXQUFBLENBQUE7UUFDckIscUNBQW9CLGFBQWEsaUJBQUEsQ0FBQTtRQUNqQywrQkFBYyxPQUFPLFdBQUEsQ0FBQTtJQUN6QixDQUFDLEVBTFcsU0FBUyxHQUFULGlDQUFTLEtBQVQsaUNBQVMsUUFLcEI7QUFDTCxDQUFDLEVBUGdCLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBT3ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHdWFuUGx1cy5BY2NvdW50aW5nLldlYkFwaVxuICpcbiAqIE9wZW5BUEkgc3BlYyB2ZXJzaW9uOiB2MVxuICogXG4gKlxuICogTk9URTogVGhpcyBjbGFzcyBpcyBhdXRvIGdlbmVyYXRlZCBieSB0aGUgc3dhZ2dlciBjb2RlIGdlbmVyYXRvciBwcm9ncmFtLlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3YWdnZXItYXBpL3N3YWdnZXItY29kZWdlbi5naXRcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERlcGFydG1lbnRUeXBlRW51bU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiDpg6jpl6jnsbvlnovmnprkuL7lgLxcbiAgICAgKi9cbiAgICB2YWx1ZT86IERlcGFydG1lbnRUeXBlRW51bU1vZGVsLlZhbHVlRW51bTtcblxuICAgIC8qKlxuICAgICAqIOWQjeensFxuICAgICAqL1xuICAgIG5hbWU/OiBzdHJpbmc7XG5cbn1cbmV4cG9ydCBuYW1lc3BhY2UgRGVwYXJ0bWVudFR5cGVFbnVtTW9kZWwge1xuICAgIGV4cG9ydCBlbnVtIFZhbHVlRW51bSB7XG4gICAgICAgIE5vbmUgPSA8YW55PiAnTm9uZScsXG4gICAgICAgIFNhbGVzID0gPGFueT4gJ1NhbGVzJyxcbiAgICAgICAgRGV2ZWxvcG1lbnQgPSA8YW55PiAnRGV2ZWxvcG1lbnQnLFxuICAgICAgICBPdGhlciA9IDxhbnk+ICdPdGhlcidcbiAgICB9XG59XG4iXX0=
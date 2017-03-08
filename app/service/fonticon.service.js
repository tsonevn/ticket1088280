// angular
var core_1 = require("@angular/core");
// nativescript
var file_system_1 = require("file-system");
// libs
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
exports.TNS_FONT_ICON_CONFIG = new core_1.OpaqueToken('TNSFontIconConfig');
exports.TNS_FONT_ICON_DEBUG = new core_1.OpaqueToken('TNSFontIconDebug');
var TNSFontIconService = (function () {
    function TNSFontIconService(config, debug) {
        if (config === void 0) { config = {}; }
        if (debug === void 0) { debug = false; }
        this.config = config;
        this.debug = debug;
        this.css = {}; // font icon collections containing maps of classnames to unicode
        this.cnt = 0;
        this.filesLoaded = new BehaviorSubject_1.BehaviorSubject(null);
        this.loadCss();
    }
    TNSFontIconService.prototype.loadCss = function () {
        this.cnt = 0;
        this.fontIconCollections = Object.keys(this.config);
        if (this.debug) {
            console.log("Collections to load: " + this.fontIconCollections);
        }
        this.loadFiles();
    };
    TNSFontIconService.prototype.loadFiles = function () {
        var _this = this;
        this.initCollection();
        if (this.cnt === this.fontIconCollections.length) {
            this.filesLoaded.next(this.css);
        }
        else {
            this.loadFile(this.config[this._currentName]).then(function () {
                _this.cnt++;
                _this.loadFiles();
            });
        }
    };
    TNSFontIconService.prototype.initCollection = function () {
        this._currentName = this.fontIconCollections[this.cnt];
        this.css[this._currentName] = {};
    };
    TNSFontIconService.prototype.loadFile = function (path) {
        var _this = this;
        if (this.debug) {
            console.log("----------");
            console.log("Loading collection '" + this._currentName + "' from file: " + path);
        }
        var cssFile = file_system_1.knownFolders.currentApp().getFile(path);
        return new Promise(function (resolve, reject) {
            cssFile.readText().then(function (data) {
                _this.mapCss(data);
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    TNSFontIconService.prototype.cleanValue = function (val) {
        var v = val.split('content:')[1].toLowerCase().replace(/\\e/, '\\ue').replace(/\\f/, '\\uf').trim().replace(/\"/g, '').replace(/;/g, '');
        return v;
    };
    TNSFontIconService.prototype.mapCss = function (data) {
        var sets = data.split('}');
        for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
            var set = sets_1[_i];
            var pair = set.replace(/ /g, '').split(':before{');
            var keyGroups = pair[0];
            var keys = keyGroups.split(',');
            if (pair[1]) {
                var value = this.cleanValue(pair[1]);
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    key = key.trim().slice(1).split(':before')[0];
                    this.css[this._currentName][key] = String.fromCharCode(parseInt(value.substring(2), 16));
                    if (this.debug) {
                        console.log(key + ": " + value);
                    }
                }
            }
        }
    };
    return TNSFontIconService;
}());
TNSFontIconService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(exports.TNS_FONT_ICON_CONFIG)), __param(1, core_1.Optional()), __param(1, core_1.Inject(exports.TNS_FONT_ICON_DEBUG)),
    __metadata("design:paramtypes", [Object, Boolean])
], TNSFontIconService);
exports.TNSFontIconService = TNSFontIconService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbnRpY29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLHNDQUEwRTtBQUUxRSxlQUFlO0FBQ2YsMkNBQTJDO0FBRTNDLE9BQU87QUFDUCx3REFBdUQ7QUFFMUMsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLGtCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM1RCxRQUFBLG1CQUFtQixHQUFHLElBQUksa0JBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBR3ZFLElBQWEsa0JBQWtCO0lBTzdCLDRCQUFtRCxNQUFnQixFQUFtRCxLQUFzQjtRQUF6Rix1QkFBQSxFQUFBLFdBQWdCO1FBQW1ELHNCQUFBLEVBQUEsYUFBc0I7UUFBekYsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUFtRCxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUxySSxRQUFHLEdBQVEsRUFBRSxDQUFDLENBQUMsaUVBQWlFO1FBRy9FLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFHZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLG9DQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLElBQUksQ0FBQyxtQkFBcUIsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNDQUFT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QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxDQUFZLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO29CQUFmLElBQUksR0FBRyxhQUFBO29CQUNWLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDZixPQUFPLENBQUMsR0FBRyxDQUFJLEdBQUcsVUFBSyxLQUFPLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztpQkFDRjtZQUNILENBQUM7U0FDRjtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUEvRUQsSUErRUM7QUEvRVksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7SUFRRyxXQUFBLGFBQU0sQ0FBQyw0QkFBb0IsQ0FBQyxDQUFBLEVBQTRCLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQywyQkFBbUIsQ0FBQyxDQUFBOztHQVBsRyxrQkFBa0IsQ0ErRTlCO0FBL0VZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFuZ3VsYXJcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwsIE9wYXF1ZVRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIG5hdGl2ZXNjcmlwdFxuaW1wb3J0IHsga25vd25Gb2xkZXJzIH0gZnJvbSAnZmlsZS1zeXN0ZW0nO1xuXG4vLyBsaWJzXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cbmV4cG9ydCBjb25zdCBUTlNfRk9OVF9JQ09OX0NPTkZJRyA9IG5ldyBPcGFxdWVUb2tlbignVE5TRm9udEljb25Db25maWcnKTtcbmV4cG9ydCBjb25zdCBUTlNfRk9OVF9JQ09OX0RFQlVHID0gbmV3IE9wYXF1ZVRva2VuKCdUTlNGb250SWNvbkRlYnVnJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUTlNGb250SWNvblNlcnZpY2Uge1xuICBwdWJsaWMgZmlsZXNMb2FkZWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwdWJsaWMgY3NzOiBhbnkgPSB7fTsgLy8gZm9udCBpY29uIGNvbGxlY3Rpb25zIGNvbnRhaW5pbmcgbWFwcyBvZiBjbGFzc25hbWVzIHRvIHVuaWNvZGVcbiAgcHJpdmF0ZSBfY3VycmVudE5hbWU6IHN0cmluZzsgLy8gY3VycmVudCBjb2xsZWN0aW9uIG5hbWVcbiAgcHJpdmF0ZSBmb250SWNvbkNvbGxlY3Rpb25zOiBhbnk7XG4gIHByaXZhdGUgY250ID0gMDtcblxuICBjb25zdHJ1Y3RvciggQEluamVjdChUTlNfRk9OVF9JQ09OX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IGFueSA9IHt9LCBAT3B0aW9uYWwoKSBASW5qZWN0KFROU19GT05UX0lDT05fREVCVUcpIHByaXZhdGUgZGVidWc6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuZmlsZXNMb2FkZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgIHRoaXMubG9hZENzcygpO1xuICB9XG5cbiAgcHVibGljIGxvYWRDc3MoKTogdm9pZCB7XG4gICAgdGhpcy5jbnQgPSAwO1xuICAgIHRoaXMuZm9udEljb25Db2xsZWN0aW9ucyA9IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKTtcbiAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgY29uc29sZS5sb2coYENvbGxlY3Rpb25zIHRvIGxvYWQ6ICR7dGhpcy5mb250SWNvbkNvbGxlY3Rpb25zfWApO1xuICAgIH1cblxuICAgIHRoaXMubG9hZEZpbGVzKCk7XG4gIH1cblxuICBsb2FkRmlsZXMoKSB7XG4gICAgdGhpcy5pbml0Q29sbGVjdGlvbigpO1xuICAgIGlmICh0aGlzLmNudCA9PT0gdGhpcy5mb250SWNvbkNvbGxlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5maWxlc0xvYWRlZC5uZXh0KHRoaXMuY3NzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkRmlsZSh0aGlzLmNvbmZpZ1t0aGlzLl9jdXJyZW50TmFtZV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmNudCsrO1xuICAgICAgICB0aGlzLmxvYWRGaWxlcygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdENvbGxlY3Rpb24oKSB7XG4gICAgdGhpcy5fY3VycmVudE5hbWUgPSB0aGlzLmZvbnRJY29uQ29sbGVjdGlvbnNbdGhpcy5jbnRdO1xuICAgIHRoaXMuY3NzW3RoaXMuX2N1cnJlbnROYW1lXSA9IHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyhgLS0tLS0tLS0tLWApO1xuICAgICAgY29uc29sZS5sb2coYExvYWRpbmcgY29sbGVjdGlvbiAnJHt0aGlzLl9jdXJyZW50TmFtZX0nIGZyb20gZmlsZTogJHtwYXRofWApO1xuICAgIH1cbiAgICBsZXQgY3NzRmlsZSA9IGtub3duRm9sZGVycy5jdXJyZW50QXBwKCkuZ2V0RmlsZShwYXRoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY3NzRmlsZS5yZWFkVGV4dCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5tYXBDc3MoZGF0YSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5WYWx1ZSh2YWwpIHtcbiAgICBsZXQgdiA9IHZhbC5zcGxpdCgnY29udGVudDonKVsxXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcXFxlLywgJ1xcXFx1ZScpLnJlcGxhY2UoL1xcXFxmLywgJ1xcXFx1ZicpLnRyaW0oKS5yZXBsYWNlKC9cXFwiL2csICcnKS5yZXBsYWNlKC87L2csICcnKTtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIHByaXZhdGUgbWFwQ3NzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGxldCBzZXRzID0gZGF0YS5zcGxpdCgnfScpO1xuXG4gICAgZm9yIChsZXQgc2V0IG9mIHNldHMpIHtcbiAgICAgIGxldCBwYWlyID0gc2V0LnJlcGxhY2UoLyAvZywgJycpLnNwbGl0KCc6YmVmb3JleycpO1xuICAgICAgbGV0IGtleUdyb3VwcyA9IHBhaXJbMF07XG4gICAgICBsZXQga2V5cyA9IGtleUdyb3Vwcy5zcGxpdCgnLCcpO1xuICAgICAgaWYgKHBhaXJbMV0pIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5jbGVhblZhbHVlKHBhaXJbMV0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgIGtleSA9IGtleS50cmltKCkuc2xpY2UoMSkuc3BsaXQoJzpiZWZvcmUnKVswXTtcbiAgICAgICAgICB0aGlzLmNzc1t0aGlzLl9jdXJyZW50TmFtZV1ba2V5XSA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQodmFsdWUuc3Vic3RyaW5nKDIpLCAxNikpO1xuICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtrZXl9OiAke3ZhbHVlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
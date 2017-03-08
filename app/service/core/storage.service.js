var core_1 = require("@angular/core");
var applicationSettings = require("application-settings");
var cryptoJS = require('crypto-js');
var eK = 'D67D6C65A215A906CC89DE28D8CAE2D0FD8A7A8D1E2888AFBB9F28B8ECB2B9F1';
var StorageService = (function () {
    function StorageService() {
    }
    ;
    StorageService.prototype.setToken = function (oauthToken) {
        if (oauthToken) {
            var tokenString = JSON.stringify(oauthToken);
            var encryptedToken = this.encrypt(tokenString, eK);
            this.setCookie('OAUTH_TOKEN', encryptedToken);
        }
        else {
            this.removeCookie('OAUTH_TOKEN');
        }
    };
    StorageService.prototype.getToken = function () {
        var encrptedToken = this.getCookie('OAUTH_TOKEN');
        if (encrptedToken) {
            var token = this.decrypt(encrptedToken, eK);
            return JSON.parse(token);
        }
        else {
            return '';
        }
    };
    StorageService.prototype.setPincode = function (key, value) {
        var pincodeValue = this.encrypt(value, eK);
        applicationSettings.setString(key, pincodeValue);
    };
    StorageService.prototype.getPincode = function (key) {
        var encryptedString = applicationSettings.getString(key);
        if (encryptedString) {
            var pincodeData = this.decrypt(encryptedString, eK);
            /*jshint eqnull:true */
            if (pincodeData.length !== 0) {
                return pincodeData;
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };
    StorageService.prototype.removePincode = function (key) {
        applicationSettings.remove(key);
    };
    StorageService.prototype.setCookie = function (key, value) {
        var cookieValue = this.encrypt(JSON.stringify(value), eK);
        applicationSettings.setString(key, cookieValue);
    };
    StorageService.prototype.removeCookie = function (key) {
        applicationSettings.remove(key);
    };
    StorageService.prototype.getCookie = function (key) {
        var encryptedString = applicationSettings.getString(key);
        if (encryptedString) {
            var cookieData = this.decrypt(encryptedString, eK);
            /*jshint eqnull:true */
            if (cookieData != null) {
                return JSON.parse(cookieData);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    StorageService.prototype.encrypt = function (v, key) {
        return cryptoJS.AES
            .encrypt(JSON.stringify(v), key)
            .toString();
    };
    StorageService.prototype.decrypt = function (v, key) {
        var bytes = cryptoJS.AES.decrypt(v, key);
        var json = bytes.toString(cryptoJS.enc.Utf8);
        return JSON.parse(json);
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUEyQztBQUMzQywwREFBNEQ7QUFDNUQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXBDLElBQU0sRUFBRSxHQUFHLGtFQUFrRSxDQUFDO0FBRzlFLElBQWEsY0FBYztJQUV2QjtJQUNJLENBQUM7SUFBQSxDQUFDO0lBRU4saUNBQVEsR0FBUixVQUFTLFVBQWU7UUFDcEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFRLENBQUM7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQs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QUM7SUFDNUIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXJGRCxJQXFGQztBQXJGWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7O0dBQ0EsY0FBYyxDQXFGMUI7QUFyRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmxldCBjcnlwdG9KUyA9IHJlcXVpcmUoJ2NyeXB0by1qcycpO1xuXG5jb25zdCBlSyA9ICdENjdENkM2NUEyMTVBOTA2Q0M4OURFMjhEOENBRTJEMEZEOEE3QThEMUUyODg4QUZCQjlGMjhCOEVDQjJCOUYxJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICkgeyB9O1xuXG4gICAgc2V0VG9rZW4ob2F1dGhUb2tlbjogYW55KSB7XG4gICAgICAgIGlmIChvYXV0aFRva2VuKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShvYXV0aFRva2VuKTtcbiAgICAgICAgICAgIGxldCBlbmNyeXB0ZWRUb2tlbiA9IHRoaXMuZW5jcnlwdCh0b2tlblN0cmluZywgZUspO1xuICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoJ09BVVRIX1RPS0VOJywgZW5jcnlwdGVkVG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoJ09BVVRIX1RPS0VOJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUb2tlbigpIHtcbiAgICAgICAgbGV0IGVuY3JwdGVkVG9rZW4gPSB0aGlzLmdldENvb2tpZSgnT0FVVEhfVE9LRU4nKTtcbiAgICAgICAgaWYgKGVuY3JwdGVkVG9rZW4pIHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMuZGVjcnlwdChlbmNycHRlZFRva2VuLCBlSykgYXMgYW55O1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UGluY29kZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgcGluY29kZVZhbHVlID0gdGhpcy5lbmNyeXB0KHZhbHVlLCBlSyk7XG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKGtleSwgcGluY29kZVZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRQaW5jb2RlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBlbmNyeXB0ZWRTdHJpbmcgPSBhcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhrZXkpO1xuICAgICAgICBpZiAoZW5jcnlwdGVkU3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgcGluY29kZURhdGEgPSB0aGlzLmRlY3J5cHQoZW5jcnlwdGVkU3RyaW5nLCBlSykgYXMgc3RyaW5nO1xuICAgICAgICAgICAgLypqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgICAgICAgICAgIGlmIChwaW5jb2RlRGF0YS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGluY29kZURhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVQaW5jb2RlKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKGtleSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHNldENvb2tpZShrZXk6IHN0cmluZywgdmFsdWU6IE9iamVjdCkge1xuICAgICAgICBsZXQgY29va2llVmFsdWUgPSB0aGlzLmVuY3J5cHQoSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBlSyk7XG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKGtleSwgY29va2llVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlQ29va2llKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb29raWUoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGVuY3J5cHRlZFN0cmluZyA9IGFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKGtleSk7XG4gICAgICAgIGlmIChlbmNyeXB0ZWRTdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBjb29raWVEYXRhID0gdGhpcy5kZWNyeXB0KGVuY3J5cHRlZFN0cmluZywgZUspIGFzIHN0cmluZztcbiAgICAgICAgICAgIC8qanNoaW50IGVxbnVsbDp0cnVlICovXG4gICAgICAgICAgICBpZiAoY29va2llRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29va2llRGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuY3J5cHQodjogYW55LCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBjcnlwdG9KUy5BRVNcbiAgICAgICAgICAgIC5lbmNyeXB0KEpTT04uc3RyaW5naWZ5KHYpLCBrZXkpXG4gICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlY3J5cHQ8VD4odjogc3RyaW5nLCBrZXk6IHN0cmluZyk6IFQge1xuICAgICAgICBsZXQgYnl0ZXMgPSBjcnlwdG9KUy5BRVMuZGVjcnlwdCh2LCBrZXkpO1xuICAgICAgICBsZXQganNvbiA9IGJ5dGVzLnRvU3RyaW5nKGNyeXB0b0pTLmVuYy5VdGY4KTtcblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcbiAgICB9XG59XG4iXX0=
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var variables_1 = require("../../api/accounting/variables");
var Dialogs = require("ui/dialogs");
var base_component_1 = require("../shared/base.component");
var camera = require("nativescript-camera");
var bghttp = require("nativescript-background-http");
var fs = require("file-system");
var enumsModule = require("ui/enums");
var imageSourceModule = require("image-source");
var router_1 = require("@angular/router");
var route_state_service_1 = require("../../service/core/route-state-service");
var router_2 = require("nativescript-angular/router");
var platform_1 = require("platform");
var loader_1 = require("../../service/core/loader");
var permissions = require('nativescript-permissions');
var TransactionImageComponent = (function (_super) {
    __extends(TransactionImageComponent, _super);
    function TransactionImageComponent(routerExtensions, page, accountingPath, router, route, loaderService, routeStateService, zone) {
        var _this = _super.call(this, page, loaderService) || this;
        _this.routerExtensions = routerExtensions;
        _this.accountingPath = accountingPath;
        _this.router = router;
        _this.route = route;
        _this.routeStateService = routeStateService;
        _this.zone = zone;
        _this.cacheImage = [];
        _this.hideCamera = false;
        _this.photoList = [];
        _this.width = 300;
        _this.height = 300;
        _this.imageWidth = 0;
        _this.keepAspectRatio = true;
        _this.saveToGallery = true;
        _this.id = '';
        _this.hideCarry = false;
        _this.items = [];
        _this.lastImage = false;
        _this.type = route.snapshot.params['type'];
        _this.hideCarry = route.snapshot.params['hideCarry'] === 'true' ? true : false;
        _this.format = enumsModule.ImageFormat.png;
        return _this;
    }
    TransactionImageComponent.prototype.onTakePhoto = function () {
        var _this = this;
        camera.requestPermissions();
        var self = this;
        var fileName = new Date().getTime() + '.' + this.format;
        var options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            var savePath = fs.knownFolders.documents();
            var path = fs.path.join(savePath.path, fileName);
            _this.imageTaken = imageAsset;
            var imageSource = new imageSourceModule.ImageSource();
            imageSource.fromAsset(imageAsset).then(function (source) {
                _this.showLoader(true);
                var saved = source.saveToFile(path, self.format);
                if (saved) {
                    self.sendImages(fileName, path);
                }
            });
        }).catch(function (err) {
            _this.showLoader(false);
        });
    };
    TransactionImageComponent.prototype.sendImages = function (uriName, fileUri) {
        var self = this;
        var session = bghttp.session('image-upload');
        var request = {
            url: 'http://api-accounting-dev.guanplus.com/api/v1/account_transaction/mobile/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'File-Name': uriName,
                'company_id': 'dbc1cd2e-7ec6-40b2-ab92-774bdf45e77f',
                'Authorization': 'bearer TcIuXH13di2TiTt0QE6l-pP9CkBE0S7WS3oohpf8JThfdAnW0uS4N8lMlche285Yi8-jSsL2ZsiFjwVf1iHJqoNbHUaNl0k9jaJTqr3Dt6RiseUzsAUD0mm2hm1t3IgGLJq7JN9aeLxF5My0AwcNFrIWTTilA6rJkaZthj6alzltS1W_j4MQpeuLpu5sx5bck1osngyXlL_IrfyZELN08UECivsbA_UyYoNIEv_EwNrVz4AHnPnPbj-wrJ04pevVZlujC_78juaduGipSXlPIRfXEaE'
            },
            description: 'uploading ' + uriName
        };
        console.dump(request);
        var task = session.uploadFile(fileUri, request);
        self.showLoader(true);
        task.on('error', logError);
        task.on('responded', logResponse);
        function logError(e) {
            self.showLoader(false);
        }
        function logResponse(e) {
            console.log('messagelishidi' + JSON.stringify(e.data));
            var temp = JSON.parse(e.data);
            // 匹配最后一个小数点后面的内容 加上—_s 再去替换
            var re = /\.[^\.]+\s*?$/i;
            var imageUrl = temp[0].url.match(re);
            var f = '_s' + imageUrl;
            temp[0].surl = temp[0].url.replace(re, f);
            self.showLoader(false);
            // self.addImage(temp[0]);
            self.zone.run(function () { return self.addImage(temp[0]); });
        }
    };
    TransactionImageComponent.prototype.addImage = function (image) {
        if (this.cacheImage.length === 9) {
            this.hideCamera = true;
            this.cacheImage = this.cacheImage.slice(0, 9);
        }
        else {
            this.hideCamera = false;
            this.cacheImage.push(image);
        }
    };
    // 删除
    TransactionImageComponent.prototype.deleteImage = function (x) {
        // 根据ID删除某个图
        for (var i = 0; i < this.cacheImage.length; i++) {
            if (this.cacheImage[i].id === x) {
                this.cacheImage.splice(i, 1);
            }
        }
        if (this.cacheImage.length < 9) {
            this.hideCamera = false;
        }
    };
    TransactionImageComponent.prototype.ngOnInit = function () {
        if (this.hideCarry) {
            this.hideCamera = true;
        }
        this.imageWidth = (platform_1.screen.mainScreen.widthDIPs - 45);
        if (this.type) {
            this.id = this.routeStateService.getTransaction('tid');
        }
        var tempImages = this.routeStateService.getTransaction('images');
        if (tempImages) {
            // 匹配最后一个小数点后面的内容 加上—_s 再去替换
            var re = /\.[^\.]+\s*?$/i;
            for (var i = 0; tempImages.length > i; i++) {
                var e = tempImages[i].url.match(re);
                var f = '_s' + e[0];
                tempImages[i].surl = tempImages[i].url.replace(re, f);
            }
            this.cacheImage = tempImages;
            if (this.cacheImage.length === 9) {
                this.hideCamera = true;
            }
            else {
                this.hideCamera = false;
            }
        }
    };
    TransactionImageComponent.prototype.onSave = function () {
        this.routerExtensions.navigate(['/transaction-details', { images: JSON.stringify(this.cacheImage), id: this.type, clearHistory: true }], {
            clearHistory: true,
            transition: {
                name: 'slideLeft',
            }
        });
    };
    TransactionImageComponent.prototype.onNavBtnTap = function () {
        this.routerExtensions.backToPreviousPage();
    };
    TransactionImageComponent.prototype.onSelectMultipleTap = function () {
        var imagepicker = require('nativescript-imagepicker');
        console.log('onSelectMultipleTap');
        var context = imagepicker.create({
            mode: 'multiple'
        });
        if (platform_1.isAndroid) {
            this.usePermission(context);
        }
        else {
            this.startSelection(context);
        }
    };
    TransactionImageComponent.prototype.usePermission = function (context) {
        var self = this;
        if (Number(platform_1.device.sdkVersion) >= 23) {
        }
        if (platform_1.isAndroid && Number(platform_1.device.sdkVersion) >= 23) {
            permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, 'I need these permissions to read from storage')
                .then(function () {
                self.startSelection(context);
            })
                .catch(function () {
            });
        }
        else {
            self.startSelection(context); // lower SDK versions will grant permission from AndroidManifest file
        }
    };
    TransactionImageComponent.prototype.startSelection = function (context) {
        console.log('startSelection');
        var self = this;
        context
            .authorize()
            .then(function () {
            return context.present();
        })
            .then(function (selection) {
            //     selection.forEach(function (selected_item) {
            //      let fileName = new Date().getTime() + '.' + self.format;
            //     // self.sendImages(fileName, selected.fileUri);
            //      selected_item.getImage().then(function(imagesource){
            //     let folder = fs.knownFolders.documents();
            //     let path = fs.path.join(folder.path, fileName);
            //     let saved = imagesource.saveToFile(path, "png");
            //     if(saved){
            //         self.sendImages(fileName, path);
            //         // var item = new observable.Observable();
            //         // item.set("thumb", imagesource);
            //         // item.set("uri", "Test"+counter+".png");
            //         // item.set("uploadTask", task);
            //         // imageItems.push(item);
            //     }
            // })
            // });
            var fileName = new Date().getTime() + '.' + self.format;
            selection.forEach(function (selected) {
                self.sendImages(fileName, selected.fileUri);
            });
        }).catch(function (e) {
        });
    };
    TransactionImageComponent.prototype.chooseWay = function () {
        var _this = this;
        var self = this;
        var options = {
            cancelButtonText: 'cancel',
            actions: ['take photo', 'choose image']
        };
        Dialogs.action(options).then(function (result) {
            if (result === 'take photo') {
                self.onTakePhoto();
            }
            else {
                _this.onSelectMultipleTap();
            }
        });
    };
    return TransactionImageComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild('urlsList'),
    __metadata("design:type", core_1.ElementRef)
], TransactionImageComponent.prototype, "urlsList", void 0);
TransactionImageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'gpm-transaction-image',
        templateUrl: 'transaction-image.component.html',
        styleUrls: ['transaction-image.component.css'],
    }),
    __param(2, core_1.Inject(variables_1.ACCOUNTING_BASE_PATH)),
    __metadata("design:paramtypes", [router_2.RouterExtensions, page_1.Page, String, router_1.Router, router_1.ActivatedRoute, loader_1.LoaderService,
        route_state_service_1.RouteStateService, core_1.NgZone])
], TransactionImageComponent);
exports.TransactionImageComponent = TransactionImageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24taW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhbnNhY3Rpb24taW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUEySDtBQUMzSCxnQ0FBK0I7QUFFL0IsNERBQXNFO0FBQ3RFLG9DQUFzQztBQUN0QywyREFBeUQ7QUFLekQsNENBQThDO0FBQzlDLHFEQUF1RDtBQUN2RCxnQ0FBa0M7QUFDbEMsc0NBQXdDO0FBQ3hDLGdEQUFrRDtBQUVsRCwwQ0FBeUQ7QUFDekQsOEVBQTJFO0FBQzNFLHNEQUErRDtBQUMvRCxxQ0FBNEQ7QUFDNUQsb0RBQTBEO0FBSzFELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBV3RELElBQWEseUJBQXlCO0lBQVMsNkNBQWE7SUFvQnhELG1DQUFvQixnQkFBa0MsRUFBRSxJQUFVLEVBQXdDLGNBQXNCLEVBQ3BILE1BQWMsRUFBVSxLQUFxQixFQUFFLGFBQTRCLEVBQzNFLGlCQUFvQyxFQUFVLElBQVk7UUFGdEUsWUFHSSxrQkFBTSxJQUFJLEVBQUUsYUFBYSxDQUFDLFNBSTdCO1FBUG1CLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBb0Qsb0JBQWMsR0FBZCxjQUFjLENBQVE7UUFDcEgsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFdBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdDLHVCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBVSxVQUFJLEdBQUosSUFBSSxDQUFRO1FBbkJ0RSxnQkFBVSxHQUFlLEVBQUUsQ0FBQztRQUM1QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixlQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsV0FBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixZQUFNLEdBQVcsR0FBRyxDQUFDO1FBRXJCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLHFCQUFlLEdBQVksSUFBSSxD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Z0NBQW9CLENBQUMsQ0FBQTtxQ0FBM0QseUJBQWdCLEVBQVEsV0FBSSxVQUM5QyxlQUFNLEVBQWlCLHVCQUFjLEVBQWlCLHNCQUFhO1FBQ3hELHVDQUFpQixFQUFnQixhQUFNO0dBdEI3RCx5QkFBeUIsQ0EyUHJDO0FBM1BZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE5nWm9uZSwgSW5qZWN0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgQWNjb3VudFRyYW5zYWN0aW9uQXBpIH0gZnJvbSAnLi4vLi4vYXBpL2FjY291bnRpbmcvYXBpL0FjY291bnRUcmFuc2FjdGlvbkFwaSc7XG5pbXBvcnQgeyBBQ0NPVU5USU5HX0JBU0VfUEFUSCB9IGZyb20gJy4uLy4uL2FwaS9hY2NvdW50aW5nL3ZhcmlhYmxlcyc7XG5pbXBvcnQgKiBhcyBEaWFsb2dzIGZyb20gJ3VpL2RpYWxvZ3MnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tICdpbWFnZS1hc3NldCc7XG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJ3VpL2ltYWdlJztcblxuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gJ25hdGl2ZXNjcmlwdC1jYW1lcmEnO1xuaW1wb3J0ICogYXMgYmdodHRwIGZyb20gJ25hdGl2ZXNjcmlwdC1iYWNrZ3JvdW5kLWh0dHAnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgZW51bXNNb2R1bGUgZnJvbSAndWkvZW51bXMnO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2VNb2R1bGUgZnJvbSAnaW1hZ2Utc291cmNlJztcblxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBSb3V0ZVN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2UvY29yZS9yb3V0ZS1zdGF0ZS1zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgaXNBbmRyb2lkLCBpc0lPUywgZGV2aWNlLCBzY3JlZW4gfSBmcm9tICdwbGF0Zm9ybSc7XG5pbXBvcnQgeyBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9jb3JlL2xvYWRlcic7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgdXRpbE1vZHVsZSBmcm9tICd1dGlscy91dGlscyc7XG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gJ3VpL2xpc3Qtdmlldyc7XG5sZXQgcGVybWlzc2lvbnMgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtcGVybWlzc2lvbnMnKTtcbmRlY2xhcmUgdmFyIGFuZHJvaWQ6IGFueTtcblxuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdncG0tdHJhbnNhY3Rpb24taW1hZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAndHJhbnNhY3Rpb24taW1hZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0cmFuc2FjdGlvbi1pbWFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uSW1hZ2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ3VybHNMaXN0JykgdXJsc0xpc3Q6IEVsZW1lbnRSZWY7XG4gICAgY2FjaGVJbWFnZTogQXJyYXk8YW55PiA9IFtdO1xuICAgIGhpZGVDYW1lcmE6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwaG90b0xpc3QgPSBbXTtcbiAgICB3aWR0aDogbnVtYmVyID0gMzAwO1xuICAgIGhlaWdodDogbnVtYmVyID0gMzAwO1xuICAgIGltYWdlVGFrZW46IEltYWdlQXNzZXQ7XG4gICAgaW1hZ2VXaWR0aDogbnVtYmVyID0gMDtcbiAgICBrZWVwQXNwZWN0UmF0aW86IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNhdmVUb0dhbGxlcnk6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHR5cGU6IGFueTtcbiAgICB0b2tlbjogYW55O1xuICAgIGlkOiBzdHJpbmcgPSAnJztcbiAgICBoaWRlQ2Fycnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpdGVtcyA9IFtdO1xuICAgIGxhc3RJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcm1hdDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcGFnZTogUGFnZSwgQEluamVjdChBQ0NPVU5USU5HX0JBU0VfUEFUSCkgcHJpdmF0ZSBhY2NvdW50aW5nUGF0aDogc3RyaW5nLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgbG9hZGVyU2VydmljZTogTG9hZGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZVN0YXRlU2VydmljZTogUm91dGVTdGF0ZVNlcnZpY2UsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKHBhZ2UsIGxvYWRlclNlcnZpY2UpO1xuICAgICAgICB0aGlzLnR5cGUgPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ3R5cGUnXTtcbiAgICAgICAgdGhpcy5oaWRlQ2FycnkgPSByb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2hpZGVDYXJyeSddID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZW51bXNNb2R1bGUuSW1hZ2VGb3JtYXQucG5nO1xuICAgIH1cblxuICAgIG9uVGFrZVBob3RvKCkge1xuICAgICAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLicgKyB0aGlzLmZvcm1hdDtcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhpcy5rZWVwQXNwZWN0UmF0aW8sXG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0aGlzLnNhdmVUb0dhbGxlcnlcbiAgICAgICAgfTtcbiAgICAgICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihpbWFnZUFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2F2ZVBhdGggPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSBmcy5wYXRoLmpvaW4oc2F2ZVBhdGgucGF0aCwgZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VUYWtlbiA9IGltYWdlQXNzZXQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2VNb2R1bGUuSW1hZ2VTb3VyY2UoKTtcblxuICAgICAgICAgICAgICAgIGltYWdlU291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TG9hZGVyKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2F2ZWQgPSBzb3VyY2Uuc2F2ZVRvRmlsZShwYXRoLCBzZWxmLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzYXZlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZW5kSW1hZ2VzKGZpbGVOYW1lLCBwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2FkZXIoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VuZEltYWdlcyh1cmlOYW1lLCBmaWxlVXJpKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHNlc3Npb24gPSBiZ2h0dHAuc2Vzc2lvbignaW1hZ2UtdXBsb2FkJyk7XG4gICAgICAgIGxldCByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgdXJsOiAgJ2h0dHA6Ly9hcGktYWNjb3VudGluZy1kZXYuZ3VhbnBsdXMuY29tL2FwaS92MS9hY2NvdW50X3RyYW5zYWN0aW9uL21vYmlsZS91cGxvYWQnLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgICAgICAgICAgICdGaWxlLU5hbWUnOiB1cmlOYW1lLFxuICAgICAgICAgICAgICAgICdjb21wYW55X2lkJzogJ2RiYzFjZDJlLTdlYzYtNDBiMi1hYjkyLTc3NGJkZjQ1ZTc3ZicsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnYmVhcmVyIFRjSXVYSDEzZGkyVGlUdDBRRTZsLXBQOUNrQkUwUzdXUzNvb2hwZjhKVGhmZEFuVzB1UzROOGxNbGNoZTI4NVlpOC1qU3NMMlpzaUZqd1ZmMWlISnFvTmJIVWFObDBrOWphSlRxcjNEdDZSaXNlVXpzQVVEMG1tMmhtMXQzSWdHTEpxN0pOOWFlTHhGNU15MEF3Y05GcklXVFRpbEE2ckprYVp0aGo2YWx6bHRTMVdfajRNUXBldUxwdTVzeDViY2sxb3NuZ3lYbExfSXJmeVpFTE4wOFVFQ2l2c2JBX1V5WW9OSUV2X0V3TnJWejRBSG5QblBiai13ckowNHBldlZabHVqQ183OGp1YWR1R2lwU1hsUElSZlhFYUUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICd1cGxvYWRpbmcgJyArIHVyaU5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5kdW1wKHJlcXVlc3QpO1xuICAgICAgICBsZXQgdGFzayA9IHNlc3Npb24udXBsb2FkRmlsZShmaWxlVXJpLCByZXF1ZXN0KTtcbiAgICAgICAgc2VsZi5zaG93TG9hZGVyKHRydWUpO1xuXG4gICAgICAgIHRhc2sub24oJ2Vycm9yJywgbG9nRXJyb3IpO1xuICAgICAgICB0YXNrLm9uKCdyZXNwb25kZWQnLCBsb2dSZXNwb25zZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9nRXJyb3IoZSkge1xuICAgICAgICAgICAgc2VsZi5zaG93TG9hZGVyKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ1Jlc3BvbnNlKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlbGlzaGlkaScgKyBKU09OLnN0cmluZ2lmeShlLmRhdGEpKTtcblxuICAgICAgICAgICAgbGV0IHRlbXA6IEFycmF5PGFueT4gPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgICAgICAvLyDljLnphY3mnIDlkI7kuIDkuKrlsI/mlbDngrnlkI7pnaLnmoTlhoXlrrkg5Yqg5LiK4oCUX3Mg5YaN5Y675pu/5o2iXG4gICAgICAgICAgICBsZXQgcmUgPSAvXFwuW15cXC5dK1xccyo/JC9pO1xuICAgICAgICAgICAgbGV0IGltYWdlVXJsID0gdGVtcFswXS51cmwubWF0Y2gocmUpO1xuICAgICAgICAgICAgbGV0IGYgPSAnX3MnICsgaW1hZ2VVcmw7XG4gICAgICAgICAgICB0ZW1wWzBdLnN1cmwgPSB0ZW1wWzBdLnVybC5yZXBsYWNlKHJlLCBmKTtcbiAgICAgICAgICAgIHNlbGYuc2hvd0xvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAvLyBzZWxmLmFkZEltYWdlKHRlbXBbMF0pO1xuICAgICAgICAgICAgc2VsZi56b25lLnJ1bigoKSA9PiBzZWxmLmFkZEltYWdlKHRlbXBbMF0pKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkSW1hZ2UoaW1hZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVJbWFnZS5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNhY2hlSW1hZ2UgPSB0aGlzLmNhY2hlSW1hZ2Uuc2xpY2UoMCwgOSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDYW1lcmEgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVJbWFnZS5wdXNoKGltYWdlKTtcblxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIOWIoOmZpFxuICAgIGRlbGV0ZUltYWdlKHgpIHtcbiAgICAgICAgLy8g5qC55o2uSUTliKDpmaTmn5DkuKrlm75cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhY2hlSW1hZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlSW1hZ2VbaV0uaWQgPT09IHgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlSW1hZ2Uuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhY2hlSW1hZ2UubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ2FtZXJhID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5oaWRlQ2FycnkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNhbWVyYSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWFnZVdpZHRoID0gKHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyAtIDQ1KTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucm91dGVTdGF0ZVNlcnZpY2UuZ2V0VHJhbnNhY3Rpb24oJ3RpZCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZW1wSW1hZ2VzID0gdGhpcy5yb3V0ZVN0YXRlU2VydmljZS5nZXRUcmFuc2FjdGlvbignaW1hZ2VzJyk7XG5cbiAgICAgICAgaWYgKHRlbXBJbWFnZXMpIHtcbiAgICAgICAgICAgIC8vIOWMuemFjeacgOWQjuS4gOS4quWwj+aVsOeCueWQjumdoueahOWGheWuuSDliqDkuIrigJRfcyDlho3ljrvmm7/mjaJcbiAgICAgICAgICAgIGxldCByZSA9IC9cXC5bXlxcLl0rXFxzKj8kL2k7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGVtcEltYWdlcy5sZW5ndGggPiBpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IHRlbXBJbWFnZXNbaV0udXJsLm1hdGNoKHJlKTtcbiAgICAgICAgICAgICAgICBsZXQgZiA9ICdfcycgKyBlWzBdO1xuICAgICAgICAgICAgICAgIHRlbXBJbWFnZXNbaV0uc3VybCA9IHRlbXBJbWFnZXNbaV0udXJsLnJlcGxhY2UocmUsIGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWNoZUltYWdlID0gdGVtcEltYWdlcztcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlSW1hZ2UubGVuZ3RoID09PSA5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQ2FtZXJhID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNhdmUoKSB7XG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy90cmFuc2FjdGlvbi1kZXRhaWxzJywgeyBpbWFnZXM6IEpTT04uc3RyaW5naWZ5KHRoaXMuY2FjaGVJbWFnZSksIGlkOiB0aGlzLnR5cGUsIGNsZWFySGlzdG9yeTogdHJ1ZSB9XSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc2xpZGVMZWZ0JyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uTmF2QnRuVGFwKCkge1xuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgfVxuXG4gICAgb25TZWxlY3RNdWx0aXBsZVRhcCgpIHtcbiAgICAgICAgbGV0IGltYWdlcGlja2VyID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWltYWdlcGlja2VyJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvblNlbGVjdE11bHRpcGxlVGFwJyk7XG4gICAgICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZGU6ICdtdWx0aXBsZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMudXNlUGVybWlzc2lvbihjb250ZXh0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGVjdGlvbihjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxuICAgIHVzZVBlcm1pc3Npb24oY29udGV4dCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChOdW1iZXIoZGV2aWNlLnNka1ZlcnNpb24pID49IDIzKSB7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBbmRyb2lkICYmIE51bWJlcihkZXZpY2Uuc2RrVmVyc2lvbikgPj0gMjMpIHtcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnJlcXVlc3RQZXJtaXNzaW9uKGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0UsICdJIG5lZWQgdGhlc2UgcGVybWlzc2lvbnMgdG8gcmVhZCBmcm9tIHN0b3JhZ2UnKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydFNlbGVjdGlvbihjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpOyAvLyBsb3dlciBTREsgdmVyc2lvbnMgd2lsbCBncmFudCBwZXJtaXNzaW9uIGZyb20gQW5kcm9pZE1hbmlmZXN0IGZpbGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0U2VsZWN0aW9uJyk7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgY29udGV4dFxuICAgICAgICAgICAgLmF1dGhvcml6ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdGVkX2l0ZW0pIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgIGxldCBmaWxlTmFtZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJy4nICsgc2VsZi5mb3JtYXQ7XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIHNlbGYuc2VuZEltYWdlcyhmaWxlTmFtZSwgc2VsZWN0ZWQuZmlsZVVyaSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICBzZWxlY3RlZF9pdGVtLmdldEltYWdlKCkudGhlbihmdW5jdGlvbihpbWFnZXNvdXJjZSl7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlci5wYXRoLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBzYXZlZCA9IGltYWdlc291cmNlLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHNhdmVkKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNlbGYuc2VuZEltYWdlcyhmaWxlTmFtZSwgcGF0aCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyB2YXIgaXRlbSA9IG5ldyBvYnNlcnZhYmxlLk9ic2VydmFibGUoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIGl0ZW0uc2V0KFwidGh1bWJcIiwgaW1hZ2Vzb3VyY2UpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gaXRlbS5zZXQoXCJ1cmlcIiwgXCJUZXN0XCIrY291bnRlcitcIi5wbmdcIik7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBpdGVtLnNldChcInVwbG9hZFRhc2tcIiwgdGFzayk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIGltYWdlSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVOYW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnLicgKyBzZWxmLmZvcm1hdDtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZW5kSW1hZ2VzKGZpbGVOYW1lLCBzZWxlY3RlZC5maWxlVXJpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaG9vc2VXYXkoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnY2FuY2VsJyxcbiAgICAgICAgICAgIGFjdGlvbnM6IFsndGFrZSBwaG90bycsICdjaG9vc2UgaW1hZ2UnXVxuICAgICAgICB9O1xuICAgICAgICBEaWFsb2dzLmFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICd0YWtlIHBob3RvJykge1xuICAgICAgICAgICAgICAgIHNlbGYub25UYWtlUGhvdG8oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdE11bHRpcGxlVGFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
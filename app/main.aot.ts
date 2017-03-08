require('reflect-metadata');
require('@angular/platform-browser');
require('@angular/core');
require('@angular/common');
require('@angular/forms');
require('@angular/http');
require('@angular/router');

require('nativescript-angular/platform-static');
require('nativescript-angular/forms');
require('nativescript-angular/router');

import { platformNativeScript } from 'nativescript-angular/platform-static';
import { AppModuleNgFactory } from './app.module.ngfactory';

platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);

import { SystemModule } from './system/system.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from './share/share.module';
import { NgxBootstrapIconsModule, alarm, alarmFill, alignBottom, allIcons } from 'ngx-bootstrap-icons';
const icons = {
  alarm,
  alarmFill,
  alignBottom
};
@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SystemModule,
    ComponentModule,
    ShareModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
})
export class AppModule {}

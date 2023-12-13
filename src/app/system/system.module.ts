import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { ComponentModule } from "../components/component.module";
import { MenuComponent } from '../components/menu/menu.component';
 
const routes: Routes = [];

@NgModule({
    declarations: [HomePageComponent, DashboardComponent, LoginFormComponent],
    providers: [],
    exports: [HomePageComponent, DashboardComponent, LoginFormComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        HttpClientModule,
        FormsModule,
        ComponentModule,
    ]
})
export class SystemModule {}

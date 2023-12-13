import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponents } from './system/server/components';

const routes: Routes = [
  { path: '**', redirectTo: '' }, // khi vào link không định nghĩa sẽ trỏe về trang ''
  {path:'', component: AppComponents['DASHBOARD']},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

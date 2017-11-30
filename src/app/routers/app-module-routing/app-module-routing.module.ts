import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

import { DashboardRoutingModule } from '../../routers/dashboard-routing/dashboard-routing.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent}
  ];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes),
  			DashboardRoutingModule ],
  exports: [RouterModule]
})

export class AppModuleRoutingModule { }










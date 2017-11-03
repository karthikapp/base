import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddCompaniesComponent } from './add-companies/add-companies.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [{ path: 'AddCompanies', component: AddCompaniesComponent }]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddCompaniesComponent
  ],
  imports: [
    BrowserModule ,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

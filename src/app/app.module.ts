import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { FirebaseService} from "./services/firebase.service";
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddCompaniesComponent } from './add-companies/add-companies.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { ContactpersonsPipe } from './pipes/contactpersons.pipe';
import { LeadComponent } from './lead/lead.component';
import { EditcompaniesComponent } from './editcompanies/editcompanies.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [{ path: 'ListCompanies', component: ListCompaniesComponent },
               { path: 'AddCompanies', component: AddCompaniesComponent },
               { path: 'EditCompanies', component: EditcompaniesComponent }]
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
    AddCompaniesComponent,
    ListCompaniesComponent,
    ContactpersonsPipe,
    LeadComponent,
    EditcompaniesComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

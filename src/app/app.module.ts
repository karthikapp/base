import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { L_SEMANTIC_UI_MODULE, TAB_DIRECTIVES } from 'angular2-semantic-ui'; // <-- Semantic Module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- pagination module

import { AuthGuardService } from "./services/auth-guard.service";
import { FirebaseService} from "./services/firebase.service";
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddCompaniesComponent } from './components/add-companies/add-companies.component';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { LeadComponent } from './components/lead/lead.component';
import { EditcompaniesComponent } from './components/editcompanies/editcompanies.component';
import { ListOemsComponent } from './components/list-oems/list-oems.component';
import { DistributorsComponent } from './components/distributors/distributors.component';
import { EventsComponent } from './components/events/events.component';
import { ProductsComponent } from './components/products/products.component';
import { NeedListComponent } from './components/need-list/need-list.component';
import { UsersComponent } from './components/users/users.component';

import { SortorderPipe } from './pipes/sortorder.pipe';
import { ContactpersonsPipe } from './pipes/contactpersons.pipe';
import { FilterrecordsPipe } from './pipes/filterrecords.pipe';

import { MzterialDesignLiteDirective } from './directives/mzterial-design-lite.directive';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService],
    children: [ 
               {path:'ListCompanies', component: ListCompaniesComponent},
               {path:'EditCompanies/:companyid', component:EditcompaniesComponent},
               {path:'AddCompanies',component:AddCompaniesComponent},
               {path:'OEM', component: ListOemsComponent},
               {path:'Events',component: EventsComponent},
               {path:'Distributors',component: DistributorsComponent},
               {path:'Products',component: ProductsComponent},
               {path:'Leads/:companyid', component: LeadComponent},
               {path:'Needlists', component: NeedListComponent},
               {path:'Users', component: UsersComponent}
              ]
  }

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
    EditcompaniesComponent,
    ListOemsComponent,
    DistributorsComponent,
    EventsComponent,
    ProductsComponent,
    SortorderPipe,
    FilterrecordsPipe,
    MzterialDesignLiteDirective,
    NeedListComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes
     // ,{ enableTracing: true } // <-- debugging purposes only 
     ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    L_SEMANTIC_UI_MODULE,
    NgxPaginationModule
  ],
  providers: [FirebaseService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

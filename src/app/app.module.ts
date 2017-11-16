import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { L_SEMANTIC_UI_MODULE} from 'angular2-semantic-ui';

import { FirebaseService} from "./services/firebase.service";
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddCompaniesComponent } from './add-companies/add-companies.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';
import { LeadComponent } from './lead/lead.component';
import { EditcompaniesComponent } from './editcompanies/editcompanies.component';
import { ListOemsComponent } from './list-oems/list-oems.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { EventsComponent } from './events/events.component';
import { ProductsComponent } from './products/products.component';

import { SortorderPipe } from './pipes/sortorder.pipe';
import { ContactpersonsPipe } from './pipes/contactpersons.pipe';
import { FilterrecordsPipe } from './pipes/filterrecords.pipe';

import { MzterialDesignLiteDirective } from './mzterial-design-lite.directive';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [{path:'ListCompanies', component: ListCompaniesComponent},
               {path:'EditCompanies/:companyid', component:EditcompaniesComponent},
               {path:'AddCompanies',component:AddCompaniesComponent},
               {path:'OEM', component: ListOemsComponent},
               {path:'Events',component: EventsComponent},
               {path:'Distributors',component: DistributorsComponent},
               {path:'Products',component: ProductsComponent}
              ]
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
    EditcompaniesComponent,
    ListOemsComponent,
    DistributorsComponent,
    EventsComponent,
    ProductsComponent,
    SortorderPipe,
    FilterrecordsPipe,
    MzterialDesignLiteDirective
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    RouterModule.forRoot(appRoutes
     // ,
     // { enableTracing: true } // <-- debugging purposes only
      ),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    L_SEMANTIC_UI_MODULE
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

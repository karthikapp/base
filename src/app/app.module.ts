import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { L_SEMANTIC_UI_MODULE, TAB_DIRECTIVES } from 'angular2-semantic-ui'; // <-- Semantic Module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- pagination module
import { MomentModule } from 'angular2-moment'; // <-- Date & time Format
import { HttpModule } from '@angular/http';

//Firebase Modules
import { FirebaseService} from "./services/firebase.service";
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Common components for all USERS
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

//Components for Admin
import { AddCompaniesComponent } from './components/add-companies/add-companies.component';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { EditcompaniesComponent } from './components/editcompanies/editcompanies.component';
import { ListOemsComponent } from './components/list-oems/list-oems.component';
import { DistributorsComponent } from './components/distributors/distributors.component';
import { EventsComponent } from './components/events/events.component';
import { ProductsComponent } from './components/products/products.component';
import { NeedListComponent } from './components/need-list/need-list.component';
import { UsersComponent } from './components/users/users.component';
import { LeadoppoComponent } from './components/leadoppo/leadoppo.component';

//Components for Users (Reporter/ Recipient/ Others)
import { LeadComponent } from './components/lead/lead.component';
import { OppportunitiesComponent } from './components/oppportunities/oppportunities.component';
import { TeamleadsComponent } from './components/teamleads/teamleads.component';
import { TeamopportunitiesComponent } from './components/teamopportunities/teamopportunities.component';
import { LeadsdetailComponent } from './components/leadsdetail/leadsdetail.component';
import { OppodetailComponent } from './components/oppodetail/oppodetail.component';

//Pipes for sorting, filtering & search
import { SortorderPipe } from './pipes/sortorder.pipe';
import { ContactpersonsPipe } from './pipes/contactpersons.pipe';
import { FilterrecordsPipe } from './pipes/filterrecords.pipe';
import { NeedlistnamesPipe } from './pipes/needlistnames.pipe';
import { CompetitornamesPipe } from './pipes/competitornames.pipe';

//Directive for MDL
import { MzterialDesignLiteDirective } from './directives/mzterial-design-lite.directive';
import { GetproductssumComponent } from './components/getproductssum/getproductssum.component';
import { GetcompanycontactsComponent } from './components/getcompanycontacts/getcompanycontacts.component';
import { ViewqualifiedleadsComponent } from './components/viewqualifiedleads/viewqualifiedleads.component';
import { ViewpresalesComponent } from './components/viewpresales/viewpresales.component';
import { BudgetarypriceComponent } from './components/budgetaryprice/budgetaryprice.component';
import { ViewbomComponent } from './components/viewbom/viewbom.component';
import { ViewpocComponent } from './components/viewpoc/viewpoc.component';
import { ViewproposalComponent } from './components/viewproposal/viewproposal.component';
import { ViewnegoComponent } from './components/viewnego/viewnego.component';
import { CasewonComponent } from './components/casewon/casewon.component';
import { CaselostComponent } from './components/caselost/caselost.component';
import { ReversegeocoderComponent } from './components/reversegeocoder/reversegeocoder.component';

//Charts
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import * as funnel from 'highcharts/modules/funnel';
import { FunnelchartsComponent } from './components/funnelcharts/funnelcharts.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},

  { path: 'dashboard', component: DashboardComponent,  
    children: [
               {path:'ListCompanies', component: ListCompaniesComponent},
               {path:'EditCompanies/:companyid', component:EditcompaniesComponent},
               {path:'AddCompanies',component:AddCompaniesComponent},
               {path:'OEM', component: ListOemsComponent},
               {path:'Events',component: EventsComponent},
               {path:'Distributors',component: DistributorsComponent},
               {path:'Products',component: ProductsComponent},
               {path:'Leadoppo/:companyid', component: LeadoppoComponent},
               {path:'Needlists', component: NeedListComponent},
               {path:'Users', component: UsersComponent},
               {path:'MyLeads', component: LeadComponent},
               {path:'MyOpportunities', component: OppportunitiesComponent},
               {path:'TeamLeads', component: TeamleadsComponent},
               {path:'TeamOpportunities', component: TeamopportunitiesComponent},
               {path:'LeadDetail/:leadid', component: LeadsdetailComponent},
               {path:'OppoDetail', component: OppodetailComponent},
               {path:'FunnelCharts',component: FunnelchartsComponent},
               {path:'ViewQLeads', component:ViewqualifiedleadsComponent}
              ]}
];


declare var require: any;
export function highchartsFactory() {
  var hc = require('highcharts');
  var hcm = require('highcharts/modules/funnel');

  hcm(hc);
  return hc;

}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AddCompaniesComponent,
    ListCompaniesComponent,
    EditcompaniesComponent,
    ListOemsComponent,
    DistributorsComponent,
    EventsComponent,
    ProductsComponent,
    NeedListComponent,
    UsersComponent,
    LeadoppoComponent,
    LeadComponent,
    OppportunitiesComponent,
    TeamleadsComponent,
    TeamopportunitiesComponent,
    LeadsdetailComponent,
    OppodetailComponent,
    SortorderPipe,
    FilterrecordsPipe,
    ContactpersonsPipe,
    NeedlistnamesPipe,
    CompetitornamesPipe,
    MzterialDesignLiteDirective,
    GetproductssumComponent,
    GetcompanycontactsComponent,
    ViewqualifiedleadsComponent,
    ViewpresalesComponent,
    BudgetarypriceComponent,
    ViewbomComponent,
    ViewpocComponent,
    ViewproposalComponent,
    ViewnegoComponent,
    CasewonComponent,
    CaselostComponent,
    ReversegeocoderComponent,
    FunnelchartsComponent
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
    NgxPaginationModule,
    MomentModule,
    HttpModule,
    ChartModule
  ],
  providers: [FirebaseService,
  {provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

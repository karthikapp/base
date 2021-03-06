import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule , RouterLink, RouterLinkActive } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { L_SEMANTIC_UI_MODULE, TAB_DIRECTIVES } from 'angular2-semantic-ui'; // <-- Semantic Module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- pagination module
import { MomentModule } from 'angular2-moment'; // <-- Date & time Format
import { HttpModule } from '@angular/http'; //<--Http Module
import { RATING_DIRECTIVES } from 'angular2-semantic-ui'

//Firebase Modules
import { FirebaseService} from "./services/firebase.service";
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { OppoFilterAllTeamService } from './services/oppo-filter-all-team.service';
import { ReviewquestionService } from './services/reviewquestion.service';
import { AnalyticsService } from './services/analytics.service';

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
import { SuppliersComponent } from './components/suppliers/suppliers.component';

//Components for Users (Reporter/ Recipient/ Others)
 //Leads Components
import { LeadComponent } from './components/lead/lead.component';
import { TeamleadsComponent } from './components/teamleads/teamleads.component';
import { AllleadsComponent } from './components/allleads/allleads.component';
import { LeadsdetailComponent } from './components/leadsdetail/leadsdetail.component';

 //Opportunities Components
import { OppportunitiesComponent } from './components/oppportunities/oppportunities.component';
import { TeamopportunitiesComponent } from './components/teamopportunities/teamopportunities.component';
import { AllopportunitiesComponent } from './components/allopportunities/allopportunities.component';
import { OppopresalesComponent } from './components/oppopresales/oppopresales.component';
import { ViewqualifiedleadsComponent } from './components/viewqualifiedleads/viewqualifiedleads.component';
import { ViewpresalesComponent } from './components/viewpresales/viewpresales.component';
import { BudgetarypriceComponent } from './components/budgetaryprice/budgetaryprice.component';
import { ViewbomComponent } from './components/viewbom/viewbom.component';
import { ViewpocComponent } from './components/viewpoc/viewpoc.component';
import { ViewproposalComponent } from './components/viewproposal/viewproposal.component';
import { ViewnegoComponent } from './components/viewnego/viewnego.component';
import { CasewonComponent } from './components/casewon/casewon.component';
import { CaselostComponent } from './components/caselost/caselost.component';

 //Components for summation of values, getting names based on id and pinpointing the location 
import { GetproductssumComponent } from './components/getproductssum/getproductssum.component';
import { GetcompanycontactsComponent } from './components/getcompanycontacts/getcompanycontacts.component';
import { ReversegeocoderComponent } from './components/reversegeocoder/reversegeocoder.component';
import { AssignedtonamegetComponent } from './components/assignedtonameget/assignedtonameget.component';
import { GetcompanycontactnameComponent } from './components/getcompanycontactname/getcompanycontactname.component';

//Pipes for sorting, filtering & search
import { SortorderPipe } from './pipes/sortorder.pipe';
import { ContactpersonsPipe } from './pipes/contactpersons.pipe';
import { FilterrecordsPipe } from './pipes/filterrecords.pipe';
import { NeedlistnamesPipe } from './pipes/needlistnames.pipe';
import { CompetitornamesPipe } from './pipes/competitornames.pipe';

//Directive for MDL
import { MzterialDesignLiteDirective } from './directives/mzterial-design-lite.directive';

//Charts
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as funnel from 'highcharts/modules/funnel';
import * as sunburst from 'highcharts/modules/sunburst';
import { ChartsComponent } from './components/charts/charts.component';
import { FunnelchartsComponent } from './components/funnelcharts/funnelcharts.component';
import { FunnelteamchartsComponent } from './components/funnelteamcharts/funnelteamcharts.component';
import { FunnelteamregionchartsComponent } from './components/funnelteamregioncharts/funnelteamregioncharts.component';
import { FunnelallchartsComponent } from './components/funnelallcharts/funnelallcharts.component';
import { FunnelallregionchartsComponent } from './components/funnelallregioncharts/funnelallregioncharts.component';


import { UpcomingLeadComponent } from './components/upcoming-lead/upcoming-lead.component';
import { UpcomingOpportunityComponent } from './components/upcoming-opportunity/upcoming-opportunity.component';
import { InsideSalesComponent } from './components/inside-sales/inside-sales.component';
import { AssignedtocompanygetComponent } from './components/assignedtocompanyget/assignedtocompanyget.component';
import { AssignedtoproductgetComponent } from './components/assignedtoproductget/assignedtoproductget.component';
import { AssignedtosuppliergetComponent } from './components/assignedtosupplierget/assignedtosupplierget.component';
import { InsideSalesMasterComponent } from './components/inside-sales-master/inside-sales-master.component';
import { SortascPipe } from './pipes/sortasc.pipe';
import { ReportsComponent } from './components/reports/reports.component';
import { FilterreportsPipe } from './pipes/filterreports.pipe';
import { ReviewComponent } from './components/review/review.component';
import { MaterializeModule } from "angular2-materialize";
import { OppodetailComponent } from './components/oppodetail/oppodetail.component';
import { OppoReviewDetailComponent } from './components/oppo-review-detail/oppo-review-detail.component';
import { FilterreviewsPipe } from './pipes/filterreviews.pipe';
import { RevenuechartsComponent } from './components/revenuecharts/revenuecharts.component';
import { RevenuechartsProductComponent } from './components/revenuecharts-product/revenuecharts-product.component';
import { RevenuechartsCustomerComponent } from './components/revenuecharts-customer/revenuecharts-customer.component';
import { RevenueProdComponent } from './components/revenue-prod/revenue-prod.component';
import { RevenueRegionComponent } from './components/revenue-region/revenue-region.component';
import { RevenueAssignedtoComponent } from './components/revenue-assignedto/revenue-assignedto.component';
import { BarchartsRegionComponent } from './components/barcharts-region/barcharts-region.component';
import { StackedRegionComponent } from './components/stacked-region/stacked-region.component';
import { BarchartscustRegionComponent } from './components/barchartscust-region/barchartscust-region.component';
import { RevenueLeadsourceComponent } from './components/revenue-leadsource/revenue-leadsource.component';
import { StackedLeadsourceComponent } from './components/stacked-leadsource/stacked-leadsource.component';
import { SunburstEmpComponent } from './components/sunburst-emp/sunburst-emp.component';
import { RevenueExstcustComponent } from './components/revenue-exstcust/revenue-exstcust.component';
import { StackedExstcustComponent } from './components/stacked-exstcust/stacked-exstcust.component';
import { TargetaddComponent } from './targetadd/targetadd.component';
import { TargetdashytdComponent } from './targetdashytd/targetdashytd.component';
import { SunburstEmpYComponent } from './components/sunburst-emp-y/sunburst-emp-y.component';
import { ChartMastersComponent } from './components/chart-masters/chart-masters.component';
import { OrderModule } from 'ngx-order-pipe';
import { ReversepipePipe } from './reversepipe.pipe';
import { ChartsMasterThunderbirdComponent } from './components/charts-master-thunderbird/charts-master-thunderbird.component';
import { ChartsMasterClassicComponent } from './components/charts-master-classic/charts-master-classic.component';
import { BarForecastregionComponent } from './components/bar-forecastregion/bar-forecastregion.component';
import { BarForecastexecComponent } from './components/bar-forecastexec/bar-forecastexec.component';
import { BarForecastbrandComponent } from './components/bar-forecastbrand/bar-forecastbrand.component';
import { FilterexecPipe } from './pipes/filterexec.pipe';
import { TotalCountReviewPipe } from './pipes/total-count-review.pipe';
import { TotalCountRegionPipe } from './pipes/total-count-region.pipe';
import { TotalCountExecPipe } from './pipes/total-count-exec.pipe';
import { TypeofcontactComponent } from './components/typeofcontact/typeofcontact.component';
import { KeyvalueobjectPipe } from './pipes/keyvalueobject.pipe';
import { IndustrytypeComponent } from './components/industrytype/industrytype.component';
import { ReportsLeadsComponent } from './components/reports-leads/reports-leads.component';
import { FilterreportsLeadsPipe } from './pipes/filterreports-leads.pipe';
import { GetproductquantityComponent } from './components/getproductquantity/getproductquantity.component';



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
               {path:'OppoDetail/:oppoid', component: OppodetailComponent},
               {path:'Charts',component: ChartsComponent},
               {path:'ChartsMaster/All',component: ChartMastersComponent},
               {path:'ChartsMaster/ThunderBird',component: ChartsMasterThunderbirdComponent},
               {path:'ChartsMaster/Classic',component: ChartsMasterClassicComponent},
               {path:'ViewQLeads/:rflag/:regions/:userid/:sdate/:edate', component:ViewqualifiedleadsComponent},
               {path:'ViewPreSales/:rflag/:regions/:userid/:sdate/:edate', component:ViewpresalesComponent},
               {path:'ViewBudgetary/:rflag/:regions/:userid/:sdate/:edate', component:BudgetarypriceComponent},
               {path:'ViewFinalBOM/:rflag/:regions/:userid/:sdate/:edate', component:ViewbomComponent},
               {path:'ViewPOCDemo/:rflag/:regions/:userid/:sdate/:edate', component:ViewpocComponent},
               {path:'ViewFinalProposal/:rflag/:regions/:userid/:sdate/:edate', component:ViewproposalComponent},
               {path:'ViewFinalnego/:rflag/:regions/:userid/:sdate/:edate', component:ViewnegoComponent},
               {path:'ViewCaseWon/:rflag/:regions/:userid/:sdate/:edate', component:CasewonComponent},
               {path:'ViewCaseLost/:rflag/:regions/:userid/:sdate/:edate', component:CaselostComponent},
               {path:'AllLeads', component: AllleadsComponent},
               {path:'AllOpportunities', component: AllopportunitiesComponent},
               {path:'TeampreOpportunities', component: OppopresalesComponent},
               {path:'UpcomingLead', component: UpcomingLeadComponent},
               {path:'UpcomingOpportunities',component: UpcomingOpportunityComponent},
               {path:'insidesales', component: InsideSalesComponent },
               {path:'insidesales_master', component: InsideSalesMasterComponent },
               {path:'Suppliers', component: SuppliersComponent},
               {path:'ReportsOpportunities', component: ReportsComponent},
               {path:'ReportsLeads', component: ReportsLeadsComponent},
               {path:'Review', component: ReviewComponent},
               {path:'OppoReviewDetail', component: OppoReviewDetailComponent},
               {path:'AddTarget', component: TargetaddComponent},
               {path:'ContactType', component: TypeofcontactComponent},
               {path:'Industrytype', component: IndustrytypeComponent}
              ]}
];


declare var require: any;
export function highchartsFactory() {
  var hc = require('highcharts');
  var hcm = require('highcharts/modules/funnel');
  var hcd = require('highcharts/modules/drilldown');
  var hcs = require('highcharts/modules/sunburst');
  var dd = require('highcharts/modules/exporting');

  hcs(hc);
  hcd(hc);
  hcm(hc);
  dd(hc);
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
    FunnelchartsComponent,
    AssignedtonamegetComponent,
    AllleadsComponent,
    AllopportunitiesComponent,
    OppopresalesComponent,
    FunnelteamchartsComponent,
    ChartsComponent,
    FunnelteamregionchartsComponent,
    FunnelallchartsComponent,
    FunnelallregionchartsComponent,
    UpcomingLeadComponent,
    UpcomingOpportunityComponent,
    GetcompanycontactnameComponent,
    InsideSalesComponent,
    SuppliersComponent,
    AssignedtocompanygetComponent,
    AssignedtoproductgetComponent,
    AssignedtosuppliergetComponent,
    InsideSalesMasterComponent,
    SortascPipe,
    ReportsComponent,
    FilterreportsPipe,
    ReviewComponent,
    OppodetailComponent,
    OppoReviewDetailComponent,
    FilterreviewsPipe,
    RevenuechartsComponent,
    RevenuechartsProductComponent,
    RevenuechartsCustomerComponent,
    RevenueProdComponent,
    RevenueRegionComponent,
    RevenueAssignedtoComponent,
    BarchartsRegionComponent,
    StackedRegionComponent,
    BarchartscustRegionComponent,
    RevenueLeadsourceComponent,
    StackedLeadsourceComponent,
    SunburstEmpComponent,
    RevenueExstcustComponent,
    StackedExstcustComponent,
    TargetaddComponent,
    TargetdashytdComponent,
    SunburstEmpYComponent,
    ChartMastersComponent,
    ReversepipePipe,
    ChartsMasterThunderbirdComponent,
    ChartsMasterClassicComponent,
    BarForecastregionComponent,
    BarForecastexecComponent,
    BarForecastbrandComponent,
    FilterexecPipe,
    TotalCountReviewPipe,
    TotalCountRegionPipe,
    TotalCountExecPipe,
    TypeofcontactComponent,
    KeyvalueobjectPipe,
    IndustrytypeComponent,
    ReportsLeadsComponent,
    FilterreportsLeadsPipe,
    GetproductquantityComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
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
    OppoFilterAllTeamService,
    ReviewquestionService,
    AnalyticsService,
    {provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

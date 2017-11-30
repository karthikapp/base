import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from "../../services/auth-guard.service";

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { AddCompaniesComponent } from '../../components/add-companies/add-companies.component';
import { ListCompaniesComponent } from '../.././components/list-companies/list-companies.component';
import { LeadComponent } from '../../components/lead/lead.component';
import { EditcompaniesComponent } from '../../components/editcompanies/editcompanies.component';
import { ListOemsComponent } from '../../components/list-oems/list-oems.component';
import { DistributorsComponent } from '../../components/distributors/distributors.component';
import { EventsComponent } from '../../components/events/events.component';
import { ProductsComponent } from '../../components/products/products.component';
import { NeedListComponent } from '../../components/need-list/need-list.component';
import { UsersComponent } from '../../components/users/users.component';


export const dashboardRoutes: Routes = [
    {
           path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService],
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
 ]

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ RouterModule ],
  providers: [AuthGuardService]
})
export class DashboardRoutingModule { }


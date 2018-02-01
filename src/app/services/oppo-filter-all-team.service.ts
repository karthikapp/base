import { Injectable } from '@angular/core';

@Injectable()
export class OppoFilterAllTeamService {

  oppo_List: any;
  oppo_list_dates: any;

  oppoList: any;
  oppolistdates: any;

  constructor() {
  	this.oppo_List = [];
  	this.oppo_list_dates = [];
    this.oppoList = [];
    this.oppolistdates = [];
  }

  //Opportunities list(9 cases) are filtered based on region, edcStartDate and edcEndDate for the 'TEAM'
  onChangeofRegion(oppoList, user, startEDCDate, endEDCDate){
  	//console.log("oppo123", oppoList,user,startEDCDate, endEDCDate)
  	if (user == 'All'){
      //console.log("pp234oppo", user, oppoList)
      this.oppo_List = oppoList
    } 
    else if (user != '' && user != undefined) {
      //console.log("pp234oppo", user)
      this.oppo_List = oppoList.filter (u =>  {
        return (u.opportunity_assignedto == user)
      })
    }
    this.oppo_list_dates = this.oppo_List

    if (startEDCDate != null || endEDCDate != null) {
      if (startEDCDate != null && (endEDCDate == null || endEDCDate == '')){
        this.oppo_list_dates = this.oppo_List.filter( u=> 
          { return (u.edc >= startEDCDate)} )
      } else if (startEDCDate == null && (endEDCDate != null && endEDCDate != '')){
        this.oppo_list_dates = this.oppo_List.filter( u=> 
          { return (u.edc <= endEDCDate)} )
      } else if (startEDCDate != null && (endEDCDate != null && endEDCDate != '')){
        this.oppo_list_dates = this.oppo_List.filter( u=> 
          { return (u.edc >= startEDCDate && u.edc <= endEDCDate)} )
      }
    }
  	//console.log("oppo123", this.oppo_list_dates);
  	return this.oppo_list_dates;
  }

  //Opportunities list(9 cases) are filtered based on region, userid, edcStartDate and edcEndDate for the 'ALL'
  onChangeofRegionUser(oppoList, region, user, startDate, endDate){
  	if (user == 'All' && region == 'All' ){
      this.oppoList = oppoList
      //console.log("pp234oppo", user, region,  oppoList)  
    } 
    else if (user != 'All' && user != undefined && region != 'All' 
        && region != undefined ) {
        this.oppoList = oppoList.filter (u =>  {
           return (u.opportunity_assignedto == user 
           && u.region == region )
      })
      //console.log("pp234oppo", user, region,  oppoList)  
    } 
    else if ( region == 'All' && user != 'All' && user != undefined ){
      this.oppoList = oppoList.filter (u =>  {
        return (u.opportunity_assignedto == user )
      })
      //console.log("pp234oppo",user, region,  oppoList)  
    } 
    else if ( user == 'All' && region != undefined && region != 'All') {
        this.oppoList = oppoList.filter (u =>  {
          return (u.region == region)
      })
      //console.log("pp234oppo", user, region,  oppoList)  
    }

    this.oppolistdates = this.oppoList;

    if (startDate != null || endDate != null) {
      if (startDate != null && (endDate == null || endDate == '')){
        this.oppolistdates = this.oppoList.filter( u=> 
          { return (u.edc >= startDate)} )
      } else if (startDate == null && (endDate != null && endDate != '')){
        this.oppolistdates = this.oppoList.filter( u=> 
          { return (u.edc <= endDate)} )
      } else if (startDate != null && (endDate != null && endDate != '')){
        this.oppolistdates = this.oppoList.filter( u=> 
          { return (u.edc >= startDate && u.edc <= endDate)} )
      }
    }

    //console.log("oppo123", this.oppo_list_dates);
    return this.oppolistdates;
  }

}

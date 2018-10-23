import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterreports'
})
export class FilterreportsPipe implements PipeTransform {

  transform(value: any, leadtitle:any,companyname: any, oppoassigned: any, leadassigned: any,
  	status: any, region: any, EDCStartDate: any, EDCEndDate: any, lead_source:any, oed_name: any, args?: any): any {

  	//Lead Source
  	if(lead_source == 'Select'){
  		lead_source = undefined
  	}
  	else if(lead_source == "INBOUND LANDLINE" ){
  		lead_source = "inbound-landline"
  	}
  	else if(lead_source == "EVENT"){
  		lead_source = "event"
  	}
  	else if(lead_source == "DISTRIBUTOR"){
  		lead_source = "distributor"
  	}
  	else if(lead_source == "OEM"){
  		lead_source = "oem"
  	}
  	else if(lead_source == "OUTBOUND CALL"){
  		lead_source = "outboundcall"
  	}
  	else if(lead_source == "ON SITE VISIT"){
  		lead_source = "onsite"
  	}

  	if(lead_source != undefined && oed_name != ''){
  		if(lead_source == "event"){
  			var eve_name = oed_name
  		}
  		else if(lead_source == 'distributor'){
  			var dis_name = oed_name
  		}
  		else if(lead_source == "oem"){
  			var oem_name = oed_name
  		}
  	}

  	//Status 
	if (status == 'Select'){
		status = undefined
	}
	else if(status == 'Qualified Lead'){
		status = "Qualified_lead"
	}
	else if(status == "Presales Presentation") {
		status = 'Presales_Presentation'
	}
	else if(status == 'Budgetary Price Shared'){
		status = "Budgetary_Price_Shared"
	}
	else if(status == "Finalising BOM") {
		status = "Finalising_BOM"
	}
	else if(status == 'POC / Demo'){
		status = "POC/Demo"
	}
	else if(status == "Final Proposal") {
		status = "Final_Proposal"
	}
	else if(status == "Final Negotiation") {
		status = "Final_Negotiation"
	}
	else if(status == 'Case Won'){
		status = "Case_won"
	}
	else if(status == "Case Lost") {
		status = "Case_lost"
	}

	if(oppoassigned == 'Select')
	{
		oppoassigned = undefined
	}

	if(leadassigned == 'Select')
	{
		leadassigned = undefined
	}

	if(EDCStartDate == undefined || EDCStartDate == ''){
		EDCStartDate = null
	}

	if(EDCEndDate == undefined || EDCEndDate == ''){
		EDCEndDate = null
	}


	//console.log("cpp",EDCStartDate, EDCEndDate)

 	if (value && value.length){
 		//console.log("pp",value,value.length, status,oppoassigned, leadassigned, EDCStartDate)
    	return value.filter(values =>{
                if (leadtitle && values.lead_title.toLowerCase().indexOf(leadtitle.toLowerCase()) === -1){
                	//console.log("pp", leadtitle,values.lead_title.toLowerCase().indexOf(leadtitle.toLowerCase()) === -1 )
                    return false;
                }
                if (companyname && values.company_name.toLowerCase().indexOf(companyname.toLowerCase()) === -1){
                	//console.log("pp", companyname , values.company_name.toLowerCase().indexOf(companyname.toLowerCase()) === -1 )
                    return false;
                }
                if (lead_source && values.leadsource.toLowerCase().indexOf(lead_source.toLowerCase()) === -1){
                	//console.log("pp", companyname , values.company_name.toLowerCase().indexOf(companyname.toLowerCase()) === -1 )
                    return false;
                }
                if ((oem_name && values.oem_name.toLowerCase().indexOf(oem_name.toLowerCase()) === -1)){
                	//console.log("pp", oed_name , values.oem_name.toLowerCase().indexOf(oed_name.toLowerCase()) === -1 )
                    return false;
                }
                if (eve_name && values.event_name.toLowerCase().indexOf(eve_name.toLowerCase()) === -1){
                	//console.log("pp", oed_name , values.event_name.toLowerCase().indexOf(oed_name.toLowerCase()) === -1 )
                    return false;
                }
                if (dis_name && values.distributor_name.toLowerCase().indexOf(dis_name.toLowerCase()) === -1){
                	//console.log("pp", oed_name , values.distributor_name.toLowerCase().indexOf(oed_name.toLowerCase()) === -1 )
                    return false;
                }
                if (status && values.opportunity_state.toLowerCase().indexOf(status.toLowerCase()) === -1){
                	//console.log("pp", status, values.opportunity_state.toLowerCase().indexOf(status.toLowerCase()) === -1)
                    return false;
                }
                if (region && values.region.toLowerCase().indexOf(region.toLowerCase()) === -1){
                	//console.log("pp",region,values.region.toLowerCase().indexOf(region.toLowerCase()) === -1)
                    return false;
                }
                if (leadassigned && values.lead_assigned_to.toLowerCase().indexOf(leadassigned.toLowerCase()) === -1){
                	//console.log("pp", leadassigned, values.lead_assigned_to.toLowerCase().indexOf(leadassigned.toLowerCase()) === -1)
                    return false;
                }
                if (oppoassigned && values.opportunity_assignedto.toLowerCase().indexOf(oppoassigned.toLowerCase()) === -1){
                	//console.log("pp",oppoassigned,values.opportunity_assignedto.toLowerCase().indexOf(oppoassigned.toLowerCase()) === -1)
                    return false;
                }
                if (EDCStartDate && EDCStartDate != null && EDCEndDate == null && !(values.edc >= EDCStartDate)){
                	//console.log("filter for dates",EDCStartDate, EDCEndDate, values.edc, values.edc >= EDCStartDate,  values.edc <= EDCEndDate)
                	//console.log("hello")
                	return false;	
                }
                if(EDCEndDate && EDCEndDate != null && EDCStartDate == null && !(values.edc <= EDCEndDate)){
                	//console.log("krishna")
                	return false;
                }
                if(EDCStartDate  && EDCEndDate && EDCStartDate!= null && EDCEndDate !=null && !(values.edc >= EDCStartDate && values.edc <= EDCEndDate)){
	                //console.log("bharadwaj")
	                return false;
	            }
                return true;
           })
        }
        else{
            return value;
        }
    }

}

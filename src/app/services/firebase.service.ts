import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { secondaryApp } from '../../environments/firebase.config';

@Injectable()
export class FirebaseService {

  accounts: FirebaseListObservable<any[]>;
  account: FirebaseListObservable<any[]>;
  contact_persons: FirebaseListObservable<any[]>;
  
  oems: FirebaseListObservable<any[]>;
  events: FirebaseListObservable<any[]>;
  distributors: FirebaseListObservable<any[]>;
  products: FirebaseListObservable<any[]>;
  needlist: FirebaseListObservable<any[]>;
  suppliers: FirebaseListObservable<any[]>;

  users: FirebaseListObservable<any[]>;
  user: any;

  created_at: any;
  fireAuth: any;

  loggedIn: boolean = false;

  constructor(private af: AngularFireDatabase, private router: Router) {
  	this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();
   }	

	// This is for checking upload
	addneedList(needList: {
	needname: any,
	needvalue: any
	}){
		//console.log("nf",needList);
		if (needList != null) {
			//console.log('CP Object',contactpersonObject, contactpersonObject.contact_person_name);
			let ndCount = Object.keys(needList).length
			let ndlist = Object.values(needList)

			console.log(ndlist, ndCount)

			for(let key1=0; key1 < ndCount; key1++ )
			{
				
				var ndURL = '/needlist/' ;
				//console.log ("firebase add cp",contactpersonlist[key1] )
				var ndObject = this.af.list(ndURL).push(needList[key1]);
				var ndid = ndObject.key;
				var ndid_URL1 = '/needlist/' + ndid;
				var ndData1 = this.af.object(ndid_URL1).update({'needvalue': ndid});
				
			}
		}
	}
//End's here

addinsideSalesinoneShot(insidesaleslist: {
      quote_id: any,
      quote_ref_no: any,
      quote_date: any,
      cpo_no: any,
      cpo_date: any,
      cpo_det_id: any,
      indent_date: any,
      customer_name: any,
      product: any,
      uom: any,
      quantity: any,
      sales_rate: any,
      sales_amt: any,
      purchase_rate: any,
      purchase_amt: any,
      supplier_po_no: any,
      supplier_purchase_date: any,
      supplier_invoice_date: any,
      supplier: any,
      supplier_rate: any,
      supplier_invoice_no: any,
      license_key: any,
      license_upload_file_location: any,
      license_from: any,
      license_to: any,
      invoice_no: any,
      invoice_date: any,
      invoice_amt: any,
      status: any,
      created_by: any,
      assigned_to: any,
      remarks: any,
      region: any,
      created_at: any
    }){

			//console.log('CP Object',contactpersonObject, contactpersonObject.contact_person_name);
			let islCount = Object.keys(insidesaleslist).length
			let isllist = Object.values(insidesaleslist)

			//console.log(ndlist, ndCount)

			for(let key1=0; key1 < islCount; key1++ )
			{
				
				var islURL = '/insideSales/' ;
				//console.log ("firebase add cp",contactpersonlist[key1] )
				var islObject = this.af.list(islURL).push(insidesaleslist[key1]);
				var islid = islObject.key;
				var islid_URL1 = '/insideSales/' + islid;
				var islData1 = this.af.object(islid_URL1).update({'insideSalesid': islid});
				
			}

		console.log("fb",islData1);
	return islData1

}

//START ACCOUNTS
   	//Fetch list of Accounts information
	getAccounts()
	{
		this.accounts = this.af.list('/accounts',
			{query:
				{
				orderByChild: 'created_at'
				}
			});
		return this.accounts;
	}

	//Fetch Single Account information
	getAccount(companyid: string){
		this.account = this.af.list('/accounts',{query:{orderByChild: 'companyid',
			equalTo: companyid}});
		//console.log(this.account);
		return this.account;
	}

	//Get Contact information for a specific company
	getContactbyAccount(companyid: string){
		var accountbyCntctURL = '/accounts/' + companyid + '/contact_persons'
		return this.af.list(accountbyCntctURL);
	}

	//Update company and contact information from EditCompaniesComponent
	saveAccount(company_id,companyObject: {companyname: string,
          companytype: string,
          industrytype: string,
          company_address_line1: string,
          company_address_line2: string,
          company_address_area: string,
          company_address_state: string,
          company_address_pincode: string,
          employee_count: number,
          created_at: Date
          },contactspersonObject,
          contactpersonObject
          )
	{
		var key = 0;
		var key1 = 0;
		var companyURL = '/accounts/' + company_id
		 
		var companyData = this.af.object(companyURL).update(companyObject);
		//console.log(Object.keys(contactpersonObject).length, Object.values(contactpersonObject))

		if(companyObject.employee_count != null || companyObject.employee_count != undefined){
			var empcountURLs = '/accounts/' + company_id + '/employee_count_his'
	    	var empcount = {
				emp_count: companyObject.employee_count,
				create_date: this.created_at
			}
			this.af.list(empcountURLs).push(empcount)
		}
		
		if (contactspersonObject != null)
		{
			//console.log('CP Object',contactpersonObject);
			//console.log('CPS Object', contactspersonObject);

			let contactpersonsCount = Object.keys(contactspersonObject).length
			let contactpersonslist: any = Object.values(contactspersonObject)

			//console.log(contactpersonlist[0].contact_person_id, contactpersonCount)

			for(key=0; key < contactpersonsCount; key++) {
				if(contactpersonslist[key].contact_person_name != '') {
					var contactpersonURL = '/accounts/' + company_id + '/contact_persons/' + contactpersonslist[key].contact_person_id
					//console.log(contactpersonURL, contactpersonslist[key])
					var contactpersonData = this.af.object(contactpersonURL).update(contactpersonslist[key])

					
				}
			}
		}

		//Pushing contact person data and setting contact person id with the generated key
		if (contactpersonObject != null) {
			//console.log('CP Object',contactpersonObject, contactpersonObject.contact_person_name);
			let contactpersonCount = Object.keys(contactpersonObject).length
			let contactpersonlist:any = Object.values(contactpersonObject)

			for(key1=0; key1 < contactpersonCount; key1++ )
			{
				if(contactpersonlist[key1].contact_person_name != ''){
					var addcontactpersonURL = '/accounts/' + company_id + '/contact_persons';
					//console.log ("firebase add cp",contactpersonlist[key1] )
					var addcontactpersonObject = this.af.list(addcontactpersonURL).push(contactpersonlist[key1]);
					var addcontactpersonid = addcontactpersonObject.key;
					var addcontactpersonid_URL1 = '/accounts/' + company_id + '/contact_persons/' + addcontactpersonid;
					var addcontactpersonData1 = this.af.object(addcontactpersonid_URL1).update({'contact_person_id': addcontactpersonid});
				}
			}
		}
		if(addcontactpersonData1 != undefined)
		{
			return addcontactpersonData1;
		}
		else if(contactpersonData != undefined){
			return contactpersonData;
		}
		else{
			return companyData;
		}
	}

	//Add company and contact information from AddCompaniesComponent
	addAccounts(companiesObject: { companyid: string,
		  companyname: string,
          companytype: string,
          industrytype: string,
          company_address_line1: string,
          company_address_line2: string,
          company_address_area: string,
          company_address_state: string,
          company_address_pincode: string,
          employee_count: number,
          created_at: Date
          },
          contactpersonsObject: {
          	contact_person_id: string,
          	contact_person_name: string,
          	contact_person_title: string,
          	Decision_maker: string,
          	Primary_contact: string,
          	contact_person_category: string,
          	contact_person_mobile: string,
  			contact_person_phone: string,
  			contact_person_email: string,
          	created_at: Date
        })
	{
		//console.log(companyObject, contactpersonObject);

		//Pushing company data and setting company id with the generated key
		var companiesData = this.af.list('/accounts').push(companiesObject);
		var companiesid = companiesData.key;
		var companies_URL = '/accounts/' + companiesid; 
		var companies1 = this.af.object(companies_URL).update({'companyid': companiesid});

		//Pushing contact person data and setting contact person id with the generated key

		//console.log('Add accounts', contactpersonsObject);
		var contactpersonsid_URL = '/accounts/' + companiesid + '/contact_persons'; 
		var contactpersonsData = this.af.list(contactpersonsid_URL).push(contactpersonsObject);
		var contactpersonsid = contactpersonsData.key;
		var contactpersonsid_URL1 = '/accounts/' + companiesid + '/contact_persons/' + contactpersonsid;
		var contactpersonsData1 = this.af.object(contactpersonsid_URL1).update({'contact_person_id': contactpersonsid});

		console.log("employee_count_his", )
		if(companiesObject.employee_count != null || companiesObject.employee_count != undefined)
		{
			var eempcountURLs = '/accounts/' + companiesid + '/employee_count_his'
	    	var eempcount = {
				emp_count: companiesObject.employee_count,
				create_date: this.created_at
			}
			this.af.list(eempcountURLs).push(eempcount)
		}

		return companies1;
	}

	//Delete an account along with contact person information
	deleteAccount(companyid){
		var account_URL = "/accounts/" + companyid
		this.af.list(account_URL).remove();
	}

	//Remove Contact Person information
	removeCntctPerson(companyid: string, cntct: string){
		var accountremove_URL = "/accounts/" + companyid + "/contact_persons/" + cntct;
		//console.log("remove",accountremove_URL)
		this.af.list(accountremove_URL).remove();
	}
//END ACCOUNT

// retrieve forecast for 13 weeks 
// retreiveforecast(){
// 		var forecast_URL = "analytics/forecast_byexec/"
// 		//console.log("remove",accountremove_URL)
// 		return this.af.list(forecast_URL);
// 	}

retreiveforecast(){
	var forecast_URL = "analytics/forecast_byweek_exec"
	return this.af.list(forecast_URL);
}

// retrieve forecast by region for 13 weeks 
retreiveforecastbyregion(){
		var forecast_URL_region = "analytics/forecast_byregion/"
		//console.log("remove",accountremove_URL)
		return this.af.list(forecast_URL_region);
	}

// retrieve forecast by brand for 13 weeks 
retreiveforecastbybrand(){
		var forecast_URL_brand = "analytics/forecast_bybrand/"
		//console.log("remove",accountremove_URL)
		return this.af.list(forecast_URL_brand);
	}


//START OEMS
	//Fetch list of OEMS
	getOEMs(){
		this.oems = this.af.list('/oems',{query:
			{orderByChild: 'created_at'}});
		return this.oems;
	}

	//Fetch single OEM information
	getOEM(oem_id){
		//console.log(oem_id);
		var oemURLs = '/oems/' + oem_id
		return this.af.object(oemURLs);
	}

	//Update OEM information
	saveOEM(oem_id, oemObject: {oem_name: string,
		created_at: Date}){
		var oemURL = '/oems/' + oem_id
		var oemData = this.af.object(oemURL).update(oemObject);

		return oemData;
	}

	//Add a new OEM information 
	addOEM(oemsObject: {oem_name: string,
		oem_id: string,
		created_at: Date})
	{
		//Pushing oem data and setting oem id with the generated key
		var oemsData = this.af.list('/oems').push(oemsObject);
		var oemid = oemsData.key;
		var oems_URL = '/oems/' + oemid; 
		var oems1 = this.af.object(oems_URL).update({'oem_id': oemid});

		return oems1;
	}

	//Delete an OEM
	deleteOEM(oemid: string){
		var OEM_URL = "/oems/" + oemid
		this.af.list(OEM_URL).remove();
	}
//END OEM

//START EVENTS
	//Fetch list of Events
	getEvents(){
		this.events = this.af.list('/events',{query:
			{orderByChild: 'created_at'}});
		return this.events;
	}

	//Fetch single Event information
	getEvent(event_id){
		//console.log(event_id);
		var eventURLs = '/events/' + event_id
		return this.af.object(eventURLs);
	}

	//Update Event information
	saveEvent(event_id, eventObject: {event_name: string,
		created_at: Date}){
		var eventURL = '/events/' + event_id
		var eventData = this.af.object(eventURL).update(eventObject);

		return eventData;
	}

	//Add a new Event information 
	addEvent(eventsObject: {event_name: string,
		event_id: string,
		created_at: Date}){

	//Pushing Event data and setting Event id with the generated key
		var eventsData = this.af.list('/events').push(eventsObject);
		var eventid = eventsData.key;
		var events_URL = '/events/' + eventid; 
		var events1 = this.af.object(events_URL).update({'event_id': eventid});

		return events1;
	}

	//Delete an Event
	deleteEvent(eventid: string){
		var event_URL = "/events/" + eventid
		this.af.list(event_URL).remove();
	}
//END EVENTS

//START DISTRIBUTORS
	//Fetch list of Distributors
	//Get Distributor data
	getDistributors(){
		this.distributors = this.af.list('/distributors',{query:
			{orderByChild: 'created_at'}});
		return this.distributors ;
	}

	//Fetch single Distributor information
	getDistributor(distributor_id){
		//console.log(distributor_id);
		var distributorURLs = '/distributors/' + distributor_id
		return this.af.object(distributorURLs);
	}

	//Update Distributor information
	saveDistributor(distributor_id, distributorObject: {distributor_name: string,
		created_at: Date}){
		var distributorURL = '/distributors/' + distributor_id
		var distributorData = this.af.object(distributorURL).update(distributorObject);

		return distributorData;
	}

	//Add a new Distributor information 
	addDistributor(distributorsObject: {distributor_name: string,
		distributor_id: string,
		created_at: Date}){

		//Pushing Distributor data and setting Distributor id with the generated key
		var distributorsData = this.af.list('/distributors').push(distributorsObject);
		var distributorsid = distributorsData.key;
		var distributors_URL = '/distributors/' + distributorsid; 
		var distributors1 = this.af.object(distributors_URL).update({'distributor_id': distributorsid});

		return distributors1;
	}

	//Delete an Distributor
	deleteDistributor(distributorid: string){
		var distributor_URL = "/distributors/" + distributorid
		this.af.list(distributor_URL).remove();
	}
//END DISTRIBUTORS	

//START PRODUCTS
	//Fetch list of Products
	getProducts(){
		this.products = this.af.list('/products',{query:
			{orderByChild: 'created_at'}});
		return this.products ;
	}

	//Fetch single Product information
	getProduct(productkey){
		//console.log(productkey);
		var productURLs = '/products/' + productkey
		return this.af.object(productURLs);
	}

	//Update Product information
	saveProduct(product_key, productObject: {Product_name: string,
		Brand: string,
		created_at: Date}){
		var productURL = '/products/' + product_key
		var productData = this.af.object(productURL).update(productObject);

		return productData;
	}

	//Add a new Product information 
	addProduct(productsObject: {Product_name: string,
		Brand: string,
		productkey: string,
		created_at: Date}){

		//Pushing Product data and setting Product id with the generated key
		var productsData = this.af.list('/products').push(productsObject);
		var productskey = productsData.key;
		var products_URL = '/products/' + productskey; 
		var products1 = this.af.object(products_URL).update({'productkey': productskey});

		return products1;

	}

	//Delete an Product
	deleteProduct(productkey: string){
		var product_URL = "/products/" + productkey
		this.af.list(product_URL).remove();
	}
//END PRODUCTS

//START NEED_LIST
	//Fetch list of needs which is going to be offered by the company itself like services 
	//when we move from lead to opportunity 
	getNeedLists(){
		this.needlist = this.af.list('/needlist',{query:
			{orderByChild: 'created_at'}});
		return this.needlist ;
	}

	//Fetch single Need_List information
	getNeedList(need_id){
		//console.log(need_id);
		var needURLs = '/needlist/' + need_id
		return this.af.object(needURLs);
	}

	//Update Need_List information
	saveNeedList(need_id, needlistObject: {need_name: string,
		created_at: Date}){
		var needURL = '/needlist/' + need_id
		var needlistData = this.af.object(needURL).update(needlistObject);

		return needlistData;
	}

	//Add a new Need_List information 
	addNeedList(needlistsObject: {need_name: string,
		need_id: string,
		created_at: Date}){

		//Pushing Need_List data and setting needlist id with the generated key
		var needlistsData = this.af.list('/needlist').push(needlistsObject);
		var needlistsid = needlistsData.key;
		var needlists_URL = '/needlist/' + needlistsid; 
		var needlists1 = this.af.object(needlists_URL).update({'need_id': needlistsid});

		return needlists1;
	}

	//Delete an Need_List
	deleteNeedList(needlistid: string){
		var needlist_URL = "/needlist/" + needlistid
		this.af.list(needlist_URL).remove();
	}
//END NEED_LIST

//START Contact Type
	//Fetch list of contact type 
	getContactTypes(){
		return this.af.object('/typeofcontact', { preserveSnapshot: true });
	}

	getContactType(contactkey){
		return this.af.object('/typeofcontact/' + contactkey);
	}

	//Update Contact Type information
	saveContactType(contactkey, contactname){
		var contactURL = '/typeofcontact/' + contactkey
		var contactData = this.af.object(contactURL).set(contactname);

		return contactData;
	}

	//Add a new Contact type information 
	addContactType(contactname){

		//Pushing Contact Type data and setting contact id with the generated key
		var contacttypesData = this.af.list('/typeofcontact').push(contactname);
		return contacttypesData;
	}

	//Delete an Contact Type
	deleteContactType(contactkey: string){
		var contacttype_URL = "/typeofcontact/" + contactkey
		this.af.list(contacttype_URL).remove();
	}
//END Contact Type

//START Industry Type
	//Fetch list of industry type 
	getIndustryTypes(){
		return this.af.object('/industrytype', { preserveSnapshot: true });
	}

	getIndustryType(industrykey){
		return this.af.object('/industrytype/' + industrykey);
	}

	//Update Industry Type information
	saveIndustryType(industrykey, industryname){
		var industryURL = '/industrytype/' + industrykey
		var industryData = this.af.object(industryURL).set(industryname);

		return industryData;
	}

	//Add a new Industry type information 
	addIndustryType(industryname){

		//Pushing Industry Type data and setting industry id with the generated key
		var industrytypesData = this.af.list('/industrytype').push(industryname);
		return industrytypesData;
	}

	//Delete an Industry Type
	deleteIndustryType(industrykey: string){
		var industrytype_URL = "/industrytype/" + industrykey
		this.af.list(industrytype_URL).remove();
	}
//END Industry Type

//START SUPPLIERS
	//Get suppliers information (created date)
	getSuppliers(){
		this.suppliers = this.af.list('/suppliers',{query:
			{orderByChild: 'created_at'}});
		return this.suppliers ;
	}

	//Fetch single supplier information
	getSupplier(supplier_id){
		//console.log(supplier_id);
		var needURLs = '/suppliers/' + supplier_id
		return this.af.object(needURLs);
	}

	//Update Supplier information
	saveSupplier(supplierid, supplierObject: {supplier_name: string,
		created_at: Date}){
		var supplierURL = '/suppliers/' + supplierid
		var supplierData = this.af.object(supplierURL).update(supplierObject);

		return supplierData;
	}

	//Add a new Supplier information 
	addSupplier(suppliersObject: {supplier_name: string,
		supplier_id: string,
		created_at: Date}){

		//Pushing supplier data and setting supplier id with the generated key
		var suppliersData = this.af.list('/suppliers').push(suppliersObject);
		var suppliersid = suppliersData.key;
		var suppliers_URL = '/suppliers/' + suppliersid; 
		var suppliers1 = this.af.object(suppliers_URL).update({'supplier_id': suppliersid});

		return suppliers1;
	}

	//Delete a Supplier
	deleteSupplier(supplierid: string){
		var supplier_URL = "/suppliers/" + supplierid
		this.af.list(supplier_URL).remove();
	}
//END SUPPLIERS

//START COMPETITORS
	//Get Competitors based on competitor id
	getCompetitorList(competitorid){
		let competitorURL = '/competitors/' + competitorid;
		return this.af.object(competitorURL);
		}

//END COMPETITORS

//START Leads and Opportunities
	//Leads
	//LEADS based on company id
	getLeads(company_id: string){
		return this.af.list('/leads',{ query: {
			orderByChild : 'company_id',
			equalTo: company_id
		} })
	}

	//All leads information
	getAllLeads(){
		return this.af.list('/leads')
	}


	//Get Leads based on user id
	getLeadsByID(userid: string){
		return this.af.list('/leads', { query: {
			orderByChild: 'assigned_to',
			equalTo: String(userid)
		} 
	});
	}

	//Get Leads based on REPORTS TO person information
	getLeadsByreporttoID(userid: string){
		return this.af.list('/leads', { query: {
			orderByChild: 'reports_to',
			equalTo: String(userid)
		} 
	});
	}

	//Get Leads by Lead Key
	getLeadsByKey(leadid: string){
		let leadURL = '/leads/' + leadid
		return this.af.object(leadURL);
	}

	//Get Leads
    getleads()
    {
      // console.log(userid)
      return this.af.list('/leads',{query:
		{
			orderByChild: 'created_at'
		}
		});
    }
	//End's here

	//OPPORTUNITIES
	//Get Opportunities based on company id
	getOpportunities(company_id: string){
		return this.af.list('/opportunities',{ query: {
			orderByChild : 'company_id',
			equalTo: company_id
		} })
	}

	//Get Opportunities by Opportunity Key
	getOpportunitiesByKey(oppoid: string){
		let oppoURL = '/opportunities/' + oppoid;
		return this.af.object(oppoURL);
	}


	// get target by financial year
	gettargets(financialyear: string)
	{
		let targetURL = '/targets/' + financialyear + '/values';
		return this.af.list(targetURL);

	}
	// add targets or update targets
	addtargets(financialyear:string,targetlist:any)
	{
		let targetURL = '/targets/' + financialyear;
		return this.af.object(targetURL).update({'values':targetlist});
	}



	// get analytics 
	getcasewon()
	{
		 return this.af.list('/analytics/casewon/deals',
			{query:
				{
				orderByChild: 'casewontime'
				}
			});

	}

	//Get Opportunities based on user id
	getOpportunitiesByID(userid: string){
		return this.af.list('/opportunities', 
			{ query: {
			orderByChild: 'opportunity_assignedto',
			equalTo: String(userid)
		} 
	});
	}

	//Get Opportunities for presales approved to 
	getopportunitiesbypresalesid(userid: String)
    {
      // console.log(userid)
      return this.af.list('/opportunities', 
      	{ query: { 
      		orderByChild: 'lead_presales_approved_to',
      		equalTo: String(userid)
      	}
 		});
    }

    //Get Opportunities for presales approved by 
    getopportunitiesforpresales(userid: String){
    	      // console.log(userid)
      return this.af.list('/opportunities', 
      	{ query: { 
      		orderByChild: 'lead_approved_by_presales',
      		equalTo: String(userid)
      	}
 		});
    }

    //Get opportunities based on the manager whom the team reports to
	getopportunitiesbyreporttoid(userid: String)
    {
      // console.log(userid)
      return this.af.list('/opportunities', 
      	{ query: {
      		orderByChild: 'reports_to',
      		equalTo: String(userid)
    	}});
	}

    //Get opportunities
    getopportunities()
    {
      // console.log(userid)
      return this.af.list('/opportunities',{query:
		{
			orderByChild: 'opportunity_created_at'
		}
		});
    }

    getopportunitiesbycw(){
    	return this.af.list('/opportunities',{query:
		{
			orderByChild: 'opportunity_state',
			equalTo: String('Case_won')
		}
		});
    }

    //Update Opportunity state and movetolist for all stages except case WON & Case LOST
    updateOppoMoveTo(opportunity_state, movetolist:{
      moved_time: any,
      moved_to_stage: any,
      moved_by: any
    }, oppokey){
    	var oppoMoveTo = '/opportunities/'+ oppokey ;
    	var oppoMoveToData = this.af.object(oppoMoveTo).update({'opportunity_state': opportunity_state});
    	var oppoMoveToo = oppoMoveTo + '/movetolist';
    	var oppoMoveTooData = this.af.list(oppoMoveToo).push(movetolist);

    	return oppoMoveTooData;
    }

    //Update Values for Case Won
    changeValuesOppo(value: number, oppokey){
    	var oppoRemValue = '/opportunities/' + oppokey;
    	var oppoRemValueD = this.af.object(oppoRemValue).update({'value': value});

    	return oppoRemValueD;
    }

    //Delete Opportunity for all stages
    delete_Oppo(deloppokey){
    	var deloppo_URL = "/opportunities/" + deloppokey
		this.af.list(deloppo_URL).remove();
    }

    //Update assigned to in all opportunity stages
    change_assignedto(assignedto, assgnkey){
    	var oppoassignValue = '/opportunities/' + assgnkey;
    	var oppoassignValueD = this.af.object(oppoassignValue).update({'opportunity_assignedto': assignedto});

    	return oppoassignValueD;

    }

    //Update reports to in all leads stage
    change_reportsto(reportsto, reportstokey){
    	var opporepValue = '/leads/' + reportstokey;
    	var opporepValueD = this.af.object(opporepValue).update({'reports_to': reportsto});

    	return opporepValueD;

    }

        //Update presales assigned to in all opportunity stages
    change_assignedpreto(assignedto, assgnkey){
    	var oppoassignpreValue = '/opportunities/' + assgnkey;
    	var oppoassignpreValueD = this.af.object(oppoassignpreValue).update({'lead_presales_approved_to': assignedto});

    	return oppoassignpreValueD;

    }

    //Opportunities Add Reviews
    addReviews(reviewsObject: {reviews_id : any,
        reviewsdscr : any,
        next_review_date: any,
        ratings: any,
        stage: any,
        created_by: any,
        created_at: any}, oppoid){

    	var opporemURL = '/opportunities/' + oppoid + "/reviews";
		var opporemData = this.af.list(opporemURL).push(reviewsObject);
		var opporemid = opporemData.key;
		var opporemid_URL1 = '/opportunities/' + oppoid + '/reviews/' + opporemid;
		var opporemData1 = this.af.object(opporemid_URL1).update({'reviews_id': opporemid});

		return opporemData1;

    }

    //Opportunities View Reviews
    viewReview(oppoid){
    	var opporemURL1 = '/opportunities/'+ oppoid +'/reviews';
    	var opporemData1 = this.af.list(opporemURL1,{query:
    		{
    			orderByChild: 'created_at'
    		}
    	})
    	
    	return opporemData1
    }

    //End's here
//END Leads and Opportunities

//START INSIDE SALES
	//List all the Inside Sales Opportunities
	getInsideSales(){
		return this.af.list('/insideSales',{query:
			{orderByChild: 'license_to'}});

	}

	//List the Inside Sales Opportunity information for single person
	getInsideSale(uid){
		return this.af.list('/insideSales',{query:
			{orderByChild: 'assigned_to',
			equalTo: String(uid)}});

	}

	//Get Inside Sales Opportunity information based on inside sales id
	getInsideSaleID(insidesaleid){
		var insURLs = '/insideSales/' + insidesaleid
		return this.af.object(insURLs);
	}

	//Add a new inside sales Opportunity information
	addInsideSales(insideSalesObject: {quote_id: string,
      quote_ref_no: string,
      quote_date: Date,
      cpo_no: string,
      cpo_date: Date,
      cpo_det_id: string,
      indent_date: Date,
      customer_name: string,
      product: string,
      uom: string,
      quantity: number,
      sales_rate: number,
      sales_amt: number,
      purchase_rate: number,
      purchase_amt: number,
      supplier_po_no: string,
      supplier_purchase_date: Date,
      supplier_invoice_date: Date,
      supplier: string,
      supplier_rate: number,
      supplier_invoice_no: string,
      license_key: string,
      license_upload_file_location: string,
      license_from: Date,
      license_to: Date,
      invoice_no: string,
      invoice_date: Date,
      invoice_amt: number,
      status: string,
      created_by: string,
      assigned_to: string,
      remarks: string,
      region: string,
      created_at: Date}){

      	console.log("fb1",insideSalesObject);

		//Pushing inside sales data and setting insidesales id with the generated key
		var insideSalesData = this.af.list('/insideSales').push(insideSalesObject);
		var insideSalesid = insideSalesData.key;
		var insideSales_URL = '/insideSales/' + insideSalesid; 
		var insideSales1 = this.af.object(insideSales_URL).update({'insideSalesid': insideSalesid});

		return insideSales1;

	}

	//Update inside sales Opportunity information
	saveInsideSales(einsalesid, einsidesaleslist : {
      quote_id: any,
      quote_ref_no: any,
      quote_date: any,
      cpo_no: any,
      cpo_date: any,
      cpo_det_id: any,
      indent_date: any,
      customer_name: any,
      product: any,
      uom: any,
      quantity: any,
      sales_rate: any,
      sales_amt: any,
      purchase_rate: any,
      purchase_amt: any,
      supplier_po_no: any,
      supplier_purchase_date: any,
      supplier_invoice_date: any,
      supplier: any,
      supplier_rate: any,
      supplier_invoice_no: any,
      license_key: any,
      license_upload_file_location: any,
      license_from: any,
      license_to: any,
      invoice_no: any,
      invoice_date: any,
      invoice_amt: any,
      status: any,
      created_by: any,
      assigned_to: any,
      remarks: any,
      region: any,
      created_at: any
    }){
		var einsURL = '/insideSales/' + einsalesid
		var einsData = this.af.object(einsURL).update(einsidesaleslist);

		return einsData;

	}

	//Delete inside sales Opportunity information
	removeInsideSales(){

	}
//END INSIDE SALES

//START USER
	//Create a new user
	createUser(usersObject:{ name: string,
    			 role: string,
    			 title: string,
    			 report: any,
    			 reports_to: string,
    			 email: string,
    			 userid: string,
    			 region: string,
    			 category: string,
                 created_at: Date
	}, default_pwd: string ){
		 secondaryApp.auth().createUserWithEmailAndPassword(usersObject.email, default_pwd)
			.then((data) => {
				//Pushing User data and setting user id with the uid
				usersObject.userid = data.uid;
				var userData = this.af.object('/user/' + data.uid).set(usersObject);

				secondaryApp.auth().signOut();
				//secondaryApp.delete();
				})
      		.catch((error) => {
        		console.log(error);
      		});	

      		let userres = firebase.auth().currentUser;
			console.log("KB1",userres);
     }

    //get single User Profile Info 
	getUser(uid: string){
		var userURLs = '/user/' + String(uid);
		//console.log('fb',userURLs);
		return this.af.object(userURLs);
	}

	//get list of User Profile Info
	getUsers(){
		this.users = this.af.list('/user', {query: {
			orderByChild: 'created_at'
			}});

		return this.users;
	}

	//get users based on manager whom the team reports to
	getUsersByReportsTo(userid: string){
		return this.af.list('/user', {query: {
			orderByChild: 'reports_to',
			equalTo: String(userid)
		}});		
	}

	//get Users based on Inside Sales
	getUsersByInsideSales(){
		return this.af.list('/user', {query: {
			orderByChild: 'role',
			equalTo: String('Inside Sales')
		}});
	}

	//Update a User
	saveUser(userid, userObject:{
		name: string,
        role: string,
        title: string,
        report: string,
        reports_to: string,
        email: string,
        region: string,
        category: string,
        created_at: Date
	}){

		var userURL = '/user/' + userid
		var userlistData = this.af.object(userURL).update(userObject);
		console.log("fbpp",userlistData);

		return userlistData;
	}

	//Delete a User
	deleteUser(uid: string){
		//console.log("fb11",uid);
		var userlist_URL = "/user/" + uid;
		this.af.list(userlist_URL).remove();
	}

//END USER

//START LOGIN & LOGOUT
	//sign in using email and password
	loginUser(email: string, password: string)
	{
		//console.log(email,password);
		return this.fireAuth.signInWithEmailAndPassword(email, password);	
	}

	//Sign out from the app
	logoutUser()
	{
		return this.fireAuth.signOut();
	}	
//END LOGIN AND LOGOUT

}


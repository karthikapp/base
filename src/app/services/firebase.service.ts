import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

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

  users: FirebaseListObservable<any[]>;
  user: any;

  created_at: any;
  fireAuth: any;

  loggedIn: boolean = false;

  constructor(private af: AngularFireDatabase, private router: Router) {
  	this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();
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
		
		if (contactspersonObject != null)
		{
			//console.log('CP Object',contactpersonObject);
			//console.log('CPS Object', contactspersonObject);

			let contactpersonsCount = Object.keys(contactspersonObject).length
			let contactpersonslist = Object.values(contactspersonObject)

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
			let contactpersonlist = Object.values(contactpersonObject)

			for(key1=0; key1 < contactpersonCount; key1++ )
			{
				if(contactpersonlist[key].contact_person_name != ''){
					var addcontactpersonURL = '/accounts/' + company_id + '/contact_persons';
					//console.log ("firebase add cp",contactpersonlist[key1] )
					var addcontactpersonObject = this.af.list(addcontactpersonURL).push(contactpersonlist[key1]);
					var addcontactpersonid = addcontactpersonObject.key;
					var addcontactpersonid_URL1 = '/accounts/' + company_id + '/contact_persons/' + addcontactpersonid;
					var addcontactpersonData1 = this.af.object(addcontactpersonid_URL1).update({'contact_person_id': addcontactpersonid});
				}
			}
		}
		return contactpersonData;
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

		console.log('Add accounts', contactpersonsObject);
		var contactpersonsid_URL = '/accounts/' + companiesid + '/contact_persons'; 
		var contactpersonsData = this.af.list(contactpersonsid_URL).push(contactpersonsObject);
		var contactpersonsid = contactpersonsData.key;
		var contactpersonsid_URL1 = '/accounts/' + companiesid + '/contact_persons/' + contactpersonsid;
		var contactpersonsData1 = this.af.object(contactpersonsid_URL1).update({'contact_person_id': contactpersonsid});

		return companies1;
	}

	//Delete an account along with contact person information
	deleteAccount(companyid){
		var account_URL = "/accounts/" + companyid
		this.af.list(account_URL).remove();
	}
//END ACCOUNT

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

//START Leads and Opportunities
	//LEADS
	getLeads(company_id: string){
		return this.af.list('/leads',{ query: {
			orderByChild : 'company_id',
			equalTo: company_id
		} })
	}

	//OPPORTUNITIES
	getOpportunities(company_id: string){
		return this.af.list('/opportunities',{ query: {
			orderByChild : 'company_id',
			equalTo: company_id
		} })
	}
//END Leads and Opportunities

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

	//Create a new user
	createUser(usersObject:{ name: string,
    			 role: string,
    			 title: string,
    			 report: any,
    			 reports_to: string,
    			 email: string,
    			 userid: string,
                 created_at: Date
	}, default_pwd: string ){
		 this.fireAuth.createUserWithEmailAndPassword(usersObject.email, default_pwd)
			.then((data) => {
				//Pushing User data and setting user id with the uid
				usersObject.userid = data.uid;
				var userData = this.af.object('/user/' + data.uid).set(usersObject);
				})
      		.catch((error) => {
        		console.log(error);
      		});	

      		let userres = firebase.auth().currentUser;
			console.log("KB1",userres);
     }

    //get single User Profile Info 
	getUser(uid: string){
		var userURLs = '/user/' + uid;
		console.log('fb',userURLs);
		return this.af.object(userURLs);

		/*this.user = this.af.list('/user',{ query: {
			orderByChild : 'email',
			equalTo: email
		}})
		return this.user;*/
	}

	//get list of User Profile Info
	getUsers(){
		this.users = this.af.list('/user', {query: {
			orderByChild: 'created_at'
			}});

		return this.users;
	}

	//Update a User
	saveUser(userid, userObject:{
		name: string,
        role: string,
        title: string,
        report: string,
        reports_to: string,
        email: string,
        created_at: Date
	}){
		var userURL = '/user/' + userid
		var userlistData = this.af.object(userURL).update(userObject);

		return userlistData;
	}

	//Delete a User
	deleteUser(uid: string){
		console.log("fb11",uid);
		var userlist_URL = "/user/" + uid;
		this.af.list(userlist_URL).remove();
	}

  }

//END LOGIN AND LOGOUT




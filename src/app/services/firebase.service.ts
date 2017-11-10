import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  accounts: FirebaseListObservable<any[]>;
  contact_persons: FirebaseListObservable<any[]>;
  created_at: any;
  account: FirebaseListObservable<any[]>;
  fireAuth: any;
  oems: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {
  	this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();
   }

   	//Accounts
	getAccounts()
	{
		this.accounts = this.af.list('/accounts',{query:
			{orderByChild: 'created_at'}});
		return this.accounts;
	}

	//Single Account
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
          employee_count: number
          },contactpersonObject
          ){

		var key = 0;
		var companyURL = '/accounts/' + company_id
		 
		var companyData = this.af.object(companyURL).update(companyObject);
		//console.log(Object.keys(contactpersonObject).length, Object.values(contactpersonObject))
		
		let contactpersonCount = Object.keys(contactpersonObject).length
		let contactpersonlist = Object.values(contactpersonObject)

		//console.log(contactpersonlist[0].contact_person_id, contactpersonCount)

		for(key=0; key < contactpersonCount; key++) {
			var contactpersonURL = '/accounts/' + company_id + '/contact_persons/' + contactpersonlist[0].contact_person_id
			//console.log(contactpersonURL)
			var contactpersonData = this.af.object(contactpersonURL).update(contactpersonlist[key])
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
		var contactpersonsid_URL = '/accounts/' + companiesid + '/contact_persons'; 
		var contactpersonsData = this.af.list(contactpersonsid_URL).push(contactpersonsObject);
		var contactpersonsid = contactpersonsData.key;
		var contactpersonsid_URL1 = '/accounts/' + companiesid + '/contact_persons/' + contactpersonsid;
		var contactpersonsData1 = this.af.object(contactpersonsid_URL1).update({'contact_person_id': contactpersonsid});
	
		return contactpersonsData1;
	}

	deleteAccount(companyid){
		var account_URL = "/accounts/" + companyid
		this.af.list(account_URL).remove();
	}

	getOEMs(){
		this.oems = this.af.list('/oems',{query:
			{orderByChild: 'created_at'}});
		return this.oems;
	}

	getOEM(oem_id){
		console.log(oem_id);
		var oemURLs = '/oems/' + oem_id
		return this.af.object(oemURLs);
	}

	saveOEM(oem_id, oemObject: {oem_name: string,
		created_at: Date}){
		var oemURL = '/oems/' + oem_id
		var oemData = this.af.object(oemURL).update(oemObject);

		return oemData;

	}

	addOEM(oemsObject: {oem_name: string,
		oem_id: string,
		created_at: Date}){

	//Pushing oem data and setting oem id with the generated key
		var oemsData = this.af.list('/oems').push(oemsObject);
		var oemid = oemsData.key;
		var oems_URL = '/oems/' + oemid; 
		var oems1 = this.af.object(oems_URL).update({'oem_id': oemid});

		return oems1;

	}


	deleteOEM(oemid: string){
		var OEM_URL = "/oems/" + oemid
		this.af.list(OEM_URL).remove();
	}

//sign in using email and password
	loginUser(email: string, password: string)
	{
		return this.fireAuth.signInWithEmailAndPassword(email, password);
	}

//Sign out from the app
	logoutUser()
	{
		return this.fireAuth.signOut();
	}

}

interface Accounts
{
	$key ?: String,
	value ?: String,

}

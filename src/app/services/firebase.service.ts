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

  constructor(private af: AngularFireDatabase) {
  	this.created_at = firebase.database.ServerValue.TIMESTAMP;
  	this.fireAuth = firebase.auth();

   }

	getAccounts()
	{
		this.accounts = this.af.list('/accounts',{query:
			{orderByChild: 'created_at'}});
		return this.accounts;
	}

	getAccount(company_name){
	
		this.account = this.af.list('/accounts',{query:{orderByChild: 'company_name',
			equalTo: company_name}});
		//console.log(this.account);
		return this.account;
	}

	saveAccount(company_id,customerObject: { company_name: string,
          company_type: string,
          Industry_type: string,
          company_address_line1: string,
          company_address_line2: string,
          employee_count: number
          },contactpersonObject
          ){
		var key =1;

		var URL21 = '/accounts/' + company_id
		 
		this.af.object(URL21).update(customerObject);

		console.log(Object.keys(contactpersonObject).length, Object.values(contactpersonObject))
		
		let key1 = Object.keys(contactpersonObject).length

		for(key=1; key <= key1; key++) {
		var URL22 = '/accounts/' + company_id + '/contact_persons/' + contactpersonObject[key].contact_person_id
		this.af.object(URL22).update(contactpersonObject[key])
		}
	}

	addAccounts(customerObject: { companyname: string,
          companytype: string,
          industrytype: string,
          address1: string,
          address2: string,
          employeecount: number
          },
          contactpersonObject: {
          	contactpersonname: string,
          	title: string,
          	decisionmaker: string,
          	primarycontact: string,
          	category: string
          })
	{

	//console.log("hi");
	console.log(customerObject, contactpersonObject);
	var newKey = this.af.list('/accounts').push(customerObject);
	var newkey1 = newKey.key;
	var URL = '/accounts/' + newkey1; 
	var newKey11 = this.af.object(URL).update({'companyid': newkey1});

	var URL1 = '/accounts/' + newkey1 + '/contact_persons'; 
	var newKey21 = this.af.list(URL1).push(contactpersonObject);
	var newKey22 = newKey21.key;

	var URL2 = '/accounts/' + newkey1 + '/contact_persons/' + newKey22;
	var newKey23 = this.af.object(URL2).update({'contactpersonid': newKey22});
	return newKey23;

		
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

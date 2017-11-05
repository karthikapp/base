import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  accounts: FirebaseListObservable<any[]>;
  contact_persons: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { }

	getAccounts()
	{
		this.accounts = this.af.list('/accounts') as FirebaseListObservable<Accounts[]>;
		return this.accounts;
	}
}

interface Accounts
{
	$key ?: String,
	value ?: String,

}

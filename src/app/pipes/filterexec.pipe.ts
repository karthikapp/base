import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from "../services/firebase.service"

@Pipe({
  name: 'filterexec'
})
export class FilterexecPipe implements PipeTransform {

	users: any[];
	newValue: any = 0;
	oldValue: any;

	constructor(public fb: FirebaseService)
	{
		this.fb.getUsers().subscribe( p => {
					this.users = p
					})
	}

  transform(value: any, oppocategory: any, args?: any): any 
  {


  	if(oppocategory == undefined || oppocategory == '')
  	{
    	oppocategory = 'All';
  	}

	if(oppocategory == 'All')
	{
		//do nothing
		return value;	
	}
	else
	{
		if(value && value.length)
		{
			return value.filter(values => {
				//console.log("this", this.users)
				
					this.oldValue = this.users.filter( q => {
						return (q.category === oppocategory)
					})

					this.newValue = 0
					
					this.oldValue.forEach( k => {
						if(k.userid == values.id)
						{
						  	this.newValue = 1
						}
					})

					if(this.newValue == 1){
						return true
					}
					else{
						return false
					}
					

				})
				
		}
	 	else
		{
			return value;
		}
			
		
	}

	//console.log("users",  this.user)

  	
    
  }

}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any;
  event_name: string;
  event_id: string;

  event: object;
  eventname: string;
  eventid: string;

  created_at: Date;

  modalOptions: any;
  addEventModal_flag: boolean;
  editEventModal_flag: boolean;

  querystring: string;

  //initializing p to one for pagination pipe
  p: number = 1;
  
  constructor(private firebaseservice : FirebaseService, 
    private router: Router) 
  { 
    this.modalOptions = 
    {
      "size": "small",
      "type": "default",
      "closeable": true
  	}
    this.event_name = '';
    this.event_id = '';
    this.created_at = firebaseservice.created_at;
  }

  ngOnInit() 
  {
  	//List of Events
  	return this.firebaseservice.getEvents().subscribe(events => {	
  		      this.events = events;
            //console.log(events);
    })
  }

  //Add a new Event
  on_add_event(){
  	//console.log("add");
    let event = { event_name: this.event_name,
                event_id: this.event_id,
                created_at: this.created_at
            	}
    this.firebaseservice.addEvent(event);
    this.cancelEventModal();
  }

  //Update an Event
  on_edit_event(){
    let eventData = { event_name: this.eventname,
                      created_at: this.created_at
                    }
    this.firebaseservice.saveEvent(this.eventid, eventData)
    this.cancelEventModal();
  }

  //Delete an Event
  on_delete_event(event_id:string){
  	//console.log("delete");
  	this.firebaseservice.deleteEvent(event_id);
  }

//START MODALS
  //Add Event Modal
  addEventModal(): void {
    this.event_name = '';
    this.addEventModal_flag = true;
  }

  //Edit Event Modal
  editEventsModal():void {
    this.editEventModal_flag = true;
  }

  editEventModal(eventid: string){
    //console.log(eventid);
    this.firebaseservice.getEvent(eventid).subscribe(event => {
    this.eventname = event.event_name;
    this.eventid = event.event_id})

    this.editEventsModal();
  }

  //Cancel Event Modal
  cancelEventModal(): void {
    this.addEventModal_flag = false;
    this.editEventModal_flag = false;
  }

  //Type & Size of the Modal
  setType(type: string): void {
    this.modalOptions.type = type;
    this.addEventModal();
    this.editEventsModal();    
  }

  setSize(size: string): void {
    this.modalOptions.size = size;
    this.addEventModal();
    this.editEventsModal();
  }
//END MODALS
}

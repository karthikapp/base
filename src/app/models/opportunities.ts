export class Opportunities {
	approval_authority: string;
	brand: string;
	budget: number;
	company_contact_person_id: string;
	company_contact_person_name: string;
	company_id: string;
	company_name: string;
	competitorslist: Object;
	distributor_id: string;
	distributor_name: string;
	edc: Date;
	edcchangelikst:{
		edc_change_time: string;
	}
	event_id: string;
	event_name: string;
	existing_customer: boolean;
	lead_activities: {
		activity_type: string;
		created_at: Date;
		latitude: string;
		longitude: string;
		phone_call_type: string;
		phonecallDate: Date;
		phonecallremarks: string;
		phonecalltimefrom: string;
		phonecalltimeto: string;
		visitDate: Date;
		visitremarks: string;
		visittimefrom: string;
		visittimeto: string;
	};
	lead_approved_by_manager: string;
	lead_approved_by_presales: string;
	lead_approved_by_presales_date: Date;
	lead_assigned_to: string;
	lead_assigned_to_name: string;
	lead_created_at: Date;
	lead_meeting_remark: string;
	lead_presales_approved_to: string;
	lead_title: string;
	manager_remark: string;
	movetolist: {
		moved_time: string;
		moved_to_stage: string;
	}
	needlist: Object;
	oem_id: string;
	oem_name: string;
	opportunity_assignedto: string;
	opportunity_activities: {
		activity_type: string;
		created_at: Date;
		latitude: string;
		longitude: string;
		phone_call_type: string;
		phonecallDate: Date;
		phonecallremarks: string;
		phonecalltimefrom: string;
		phonecalltimeto: string;
		visitDate: Date;
		visitremarks: string;
		visittimefrom: string;
		visittimeto: string;
	};
	opportunity_created_at: Date;
	opportunity_state: string;
	person_designation: string;
	product_key: string;
	product_name: string;
	quantity: number;
	region: string;
	reports_to: string;
	sourceleadid: string;
	value: number;

}

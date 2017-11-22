export class Accounts {
  company_address_area:string;
  company_address_city:string;
  company_address_line1:string;
  company_address_line2:string;
  company_address_pincode:string;
  company_address_state:string;
  companyid: string;
  companyname: string;
  companytype: string;
  contact_persons: {
	  contact_person_category: string;
	  contact_person_email: string;
	  contact_person_id: string;
	  contact_person_mobile: string;
	  contact_person_name: string;
	  contact_person_phone: string;
	  contact_person_title: string;
	  created_at: Date;
	  Decision_maker: string;
	  Primary_contact: string;
  }
  created_at: Date;
  employee_count: number;
  industrytype: string;
}

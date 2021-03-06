import { Injectable } from '@angular/core';

@Injectable()
export class ReviewquestionService {

	review_questions_ql: any;
	review_answers_ql: any;

  constructor() {
  	this.review_questions_ql = [];
  	this.review_answers_ql = [];
   }

    getQuestions() {
	 return this.review_questions_ql = [
	  	{stage: 'Qualified_lead', questionid: 1, question:'What is the compulsion to invest money?', answers: [
          { answerid: 1, questionid: 1, answer:'Current solution not meeting the requirements', checked: false},
          { answerid: 2, questionid: 1, answer:'Business expansion', checked: false},
          { answerid: 3, questionid: 1, answer:'New initiatives', checked: false},
          { answerid: 4, questionid: 1, answer:'Not happy with the current product', checked: false},
          { answerid: 5, questionid: 1, answer:'Not happy with the current partner', checked: false},
          { answerid: 6, questionid: 1, answer:'Product EOL/EOSL', checked: false},
          { answerid: 7, questionid: 1, answer:'Compliance requirements', checked: false},
          { answerid: 8, questionid: 1, answer:'TCO of current solution is higher', checked: false},
          { answerid: 141, questionid: 1, answer:'Others', checked: false}
          ]},
	  	{stage: 'Qualified_lead', questionid: 2, question:'What is the decision making process?', answers: [
          { answerid: 9, questionid: 2, answer:'Pure commercial', checked: false},
          { answerid: 10, questionid: 2, answer:'Technology weightage more - technical', checked: false},
          { answerid: 11, questionid: 2, answer:'Technical evaluation - POC/Demo', checked: false},
          { answerid: 12, questionid: 2, answer:'Invite multiple quotes - purchase', checked: false},
          { answerid: 142, questionid: 2, answer:'Others', checked: false}
          ]},
	  	{stage: 'Qualified_lead', questionid: 3, question:'Whats the role of the person you met?', answers: [
          { answerid: 13, questionid: 3, answer:'Technology evaluator', checked: false},
          { answerid: 14, questionid: 3, answer:'Recommender', checked: false},
          { answerid: 15, questionid: 3, answer:'Information gathering', checked: false},
          { answerid: 16, questionid: 3, answer:'Purchase', checked: false},
          { answerid: 17, questionid: 3, answer:'Technology weightage more - technical', checked: false},
          { answerid: 18, questionid: 3, answer:'Technical evaluation - POC/Demo', checked: false},
          { answerid: 19, questionid: 3, answer:'Invite multiple quotes - purchase', checked: false},
          { answerid: 143, questionid: 3, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 4, question:'Who is your competition in the opportunity?', answers: [
          { answerid: 20, questionid: 4, answer:'Existing partner', checked: false},
          { answerid: 21, questionid: 4, answer:'Existing OEM', checked: false},
          { answerid: 144, questionid: 4, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 5, question:'What is the position of competition in the deal?', answers: [
          { answerid: 22, questionid: 5, answer:'Customer satisfied', checked: false},
          { answerid: 23, questionid: 5, answer:'Customer unhappy', checked: false},
          { answerid: 24, questionid: 5, answer:'Support issues', checked: false},
          { answerid: 25, questionid: 5, answer:'Wrong solution suggested', checked: false},
          { answerid: 26, questionid: 5, answer:'OEM supporting the partner', checked: false},
          { answerid: 27, questionid: 5, answer:'Technically superior', checked: false},
          { answerid: 28, questionid: 5, answer:'Technically inferior', checked: false},
          { answerid: 29, questionid: 5, answer:'Commercially superior', checked: false},
          { answerid: 30, questionid: 5, answer:'Commercially inferior', checked: false},
          { answerid: 145, questionid: 5, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 6, question:'Is the opportunity locked with the OEM?', answers: [
           { answerid: 31, questionid: 6, answer:'Yes', checked: false},
           { answerid: 32, questionid: 6, answer:'No', checked: false},
           { answerid: 33, questionid: 6, answer:'OEM working with the other partner', checked: false},
           { answerid: 146, questionid: 6, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 7, question:'Has the budgets been allocated for the purchase?', answers: [
          { answerid: 34, questionid: 7, answer:'Yes', checked: false},
          { answerid: 35, questionid: 7, answer:'No', checked: false},
          { answerid: 36, questionid: 7, answer:'No idea', checked: false},
          { answerid: 147, questionid: 7, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 8, question:'If yes, who is the source of this information?', answers: [
          { answerid: 37, questionid: 8, answer:'IT', checked: false},
          { answerid: 38, questionid: 8, answer:'Finance', checked: false},
          { answerid: 39, questionid: 8, answer:'Purchase', checked: false},
          { answerid: 148, questionid: 8, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 9, question:'What is the time-line in which customer planning to go-live?', answers: [
          { answerid: 40, questionid: 9, answer:'Immediate', checked: false},
          { answerid: 41, questionid: 9, answer:'30 days', checked: false},
          { answerid: 42, questionid: 9, answer:'60 days', checked: false},
          { answerid: 43, questionid: 9, answer:'90 days', checked: false},
          { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
          { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
          { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
          { answerid: 149, questionid: 9, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 10, question:'If this is existing customer, how is the payment history?', answers:[
          { answerid: 45, questionid: 10, answer:'Paid on time', checked: false},
          { answerid: 46, questionid: 10, answer:'Received payment after 45 days', checked: false},
          { answerid: 47, questionid: 10, answer:'Received payment > 45 days', checked: false},
          { answerid: 48, questionid: 10, answer:'AR pending', checked: false},
          { answerid: 150, questionid: 10, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 11, question:'If this is new prospect, how is the general payment history?', answers: [
          { answerid: 49, questionid: 11, answer:'Pay on time', checked: false},
          { answerid: 50, questionid: 11, answer:'Pay within 45 days', checked: false},
          { answerid: 51, questionid: 11, answer:'Bad paymasters', checked: false},
          { answerid: 151, questionid: 11, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 12, question:'Have you checked with Disty, OEM or any other reliable source on their payment behaviour?', answers:[
          { answerid: 52, questionid: 12, answer:'Yes', checked: false},
          { answerid: 53, questionid: 12, answer:'No', checked: false},
          { answerid: 152, questionid: 12, answer:'Others', checked: false}]},
	  	{stage: 'Qualified_lead', questionid: 13, question:'What is the next step? When is it planned?', answers: [
              { answerid: 170, questionid: 13, answer:'', checked: false}   
            ]},
	  	{stage: 'Presales_Presentation', questionid: 14, question:'Have you fixed the agenda of the presentation?', answers: [
          { answerid: 54, questionid: 14, answer:'Yes', checked: false},
          { answerid: 55, questionid: 14, answer:'No', checked: false},
          { answerid: 153, questionid: 14, answer:'Others', checked: false}]},
	  	{stage: 'Presales_Presentation', questionid: 15, question:'Has presales had first level meeting with the prospect and is aware of the needs?', answers: [
          { answerid: 56, questionid: 15, answer:'Yes', checked: false},
          { answerid: 57, questionid: 15, answer:'No', checked: false},
          { answerid: 154, questionid: 15, answer:'Others', checked: false}]},
	  	{stage: 'Presales_Presentation', questionid: 16, question:'Whom are you going to present ?', answers:[
          { answerid: 58, questionid: 16, answer:'Technical team', checked: false},
          { answerid: 59, questionid: 16, answer:'Technical and finance team', checked: false},
          { answerid: 60, questionid: 16, answer:'Technical, finance and commercial team', checked: false},
          { answerid: 155, questionid: 16, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 17, question:'Does presales know the expectations from the presentation?', answers:[
          { answerid: 61, questionid: 17, answer:'Yes', checked: false},
          { answerid: 62, questionid: 17, answer:'No', checked: false},
          { answerid: 156, questionid: 17, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 18, question:'Have you shared the agenda with your contact and have concurrence?', answers: [
          { answerid: 63, questionid: 18, answer:'Yes', checked: false},
          { answerid: 64, questionid: 18, answer:'No', checked: false},
          { answerid: 157, questionid: 18, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 19, question:'Are you going to present customized presentation or general technology overview?', answers: [
          { answerid: 65, questionid: 19, answer:'General overview and collect more information', checked: false},
          { answerid: 66, questionid: 19, answer:'We know the need, customized presentation', checked: false},
          { answerid: 67, questionid: 19, answer:'Gain commitment on our understanding, address objections & queries and freeze BOM', checked: false},
          { answerid: 158, questionid: 19, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 20, question:'Do you need similar case-studies, references?', answers: [
          { answerid: 68, questionid: 20, answer:'Yes', checked: false},
          { answerid: 69, questionid: 20, answer:'Not now but later', checked: false},
          { answerid: 159, questionid: 20, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 21, question:'What other resources you need to have maximum impact?', answers: [
          { answerid: 70, questionid: 21, answer:'Presence of senior technical resources', checked: false},
          { answerid: 71, questionid: 21, answer:'Presence of senior sales', checked: false},
          { answerid: 72, questionid: 21, answer:'Presence of management', checked: false},
          { answerid: 73, questionid: 21, answer:'External references', checked: false},
          { answerid: 160, questionid: 21, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 22, question:'Do you need to handover hardcopy of the presentation to the attendees?', answers: [
          { answerid: 74, questionid: 22, answer:'Yes, need fine printed copy', checked: false},
          { answerid: 75, questionid: 22, answer:'Not required now', checked: false},
          { answerid: 161, questionid: 22, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 23, question:'What are the goals of the presales presentation?', answers: [
          { answerid: 76, questionid: 23, answer:'Gathering more information - IT infra, technical challenges, roadmap and future plans', checked: false},
          { answerid: 162, questionid: 23, answer:'Others', checked: false}]},
          {stage: 'Presales_Presentation', questionid: 24, question:'What is the next step? When is it planned?', answers: [
              { answerid: 171, questionid: 24, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 25, question:'Have you frozen on the bill of material?', answers: [
          { answerid: 77, questionid: 25, answer:'Yes', checked: false},
          { answerid: 78, questionid: 25, answer:'No', checked: false},
          { answerid: 163, questionid: 25, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 26, question:'Who has prepared the BOM?', answers:[
          { answerid: 79, questionid: 26, answer:'Our presales', checked: false},
          { answerid: 80, questionid: 26, answer:'OEM', checked: false},
          { answerid: 81, questionid: 26, answer:'Customer technical team', checked: false},
          { answerid: 164, questionid: 26, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 27, question:'What is the approximate Topline?', answers: [
              { answerid: 172, questionid: 27, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 28, question:'What is the approximate GC?', answers: [
              { answerid: 173, questionid: 28, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 29, question:'Has the customers technical team confirmed the BOM meeting the requirements?', answers:[
          { answerid: 82, questionid: 29, answer:'Yes', checked: false},
          { answerid: 83, questionid: 29, answer:'No', checked: false},
          { answerid: 84, questionid: 29, answer:'No, they want to see the POC', checked: false},
          { answerid: 165, questionid: 29, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 30, question:'Has OEM confirmed the BOM?', answers: [
          { answerid: 85, questionid: 30, answer:'Yes', checked: false},
          { answerid: 86, questionid: 30, answer:'No', checked: false},
          { answerid: 166, questionid: 30, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 31, question:'Are decision makers comfortable with the budgetary figures?', answers: [
          { answerid: 87, questionid: 31, answer:'Yes', checked: false},
          { answerid: 88, questionid: 31, answer:'No', checked: false},
          { answerid: 167, questionid: 31, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 32, question:'What is the total SOW for the project', answers: [
          { answerid: 89, questionid: 32, answer:'Supply product only', checked: false},
          { answerid: 90, questionid: 32, answer:'Product + Installation only', checked: false},
          { answerid: 91, questionid: 32, answer:'Product + Installation + Professional Services', checked: false},
          { answerid: 92, questionid: 32, answer:'Product + Installation + Professional Services + Training', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 33, question:'Is BOM prepared keeping customers immediate, short-term and long term plans?', answers: [
          { answerid: 93, questionid: 33, answer:'No, customer keen to meet the immediate and short term', checked: false},
          { answerid: 94, questionid: 33, answer:'Yes, immediate, short and long term requirements are taken care', checked: false},
          { answerid: 168, questionid: 33, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 34, question:'Who is responsible for the technically correct BOM meeting customers requirements?', answers: [
          { answerid: 95, questionid: 34, answer:'Our presales and post sales team', checked: false},
          { answerid: 96, questionid: 34, answer:'Sales', checked: false},
          { answerid: 97, questionid: 34, answer:'OEM', checked: false},
          { answerid: 169, questionid: 34, answer:'Others', checked: false}]},
          {stage: 'Budgetary_Price_Shared', questionid: 35, question:'What is competition expected to quote against your BOM?', answers: [
              { answerid: 174, questionid: 35, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 36, question:'Are they technically superior to you, how?', answers: [
              { answerid: 175, questionid: 36, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 37, question:'Are they commercially economical compare to you?', answers: [
              { answerid: 176, questionid: 37, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 38, question:'What are you doing to take control on the opportunity against competition?', answers: [
              { answerid: 177, questionid: 38, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 39, question:'If the payment terms look risky, are you proposing financial structuring the deal?', answers: [
              { answerid: 178, questionid: 39, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 40, question:'Have you discussed Financing option with the finance/purchase team?', answers: [
              { answerid: 179, questionid: 40, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 41, question:'What is the next step? When is it planned?', answers: [
              { answerid: 180, questionid: 41, answer:'', checked: false}   
            ]},
          {stage: 'POC/Demo', questionid: 42, question:'Have you gathered POC/Demo success criterion and documented?', answers: [
          { answerid: 98, questionid: 42, answer:'Yes', checked: false},
          { answerid: 99, questionid: 42, answer:'No', checked: false}]},
          {stage: 'POC/Demo', questionid: 43, question:'Have you shared pre-requisites with the customer?', answers: [
          { answerid: 100, questionid: 43, answer:'Yes', checked: false},
          { answerid: 101, questionid: 43, answer:'No', checked: false}]},
          {stage: 'POC/Demo', questionid: 44, question:'Do you know the customer team involved in the POC evaluation?', answers:[
          { answerid: 102, questionid: 44, answer:'Yes. Relevant documents are explained and mailed to them.', checked: false},
          { answerid: 103, questionid: 44, answer:'No. Need to find out.', checked: false}]},
          {stage: 'POC/Demo', questionid: 45, question:'Are the outcomes and timelines of the POC/Demo defined, agreed and signed off with the customer?', answers: [
          { answerid: 104, questionid: 45, answer:'Yes', checked: false},
          { answerid: 105, questionid: 45, answer:'No', checked: false}]},
          {stage: 'POC/Demo', questionid: 46, question:'Are resources required to conduct successful POC/Demo planned?', answers: [
          { answerid: 106, questionid: 46, answer:'Yes', checked: false},
          { answerid: 107, questionid: 46, answer:'No', checked: false}]},
          {stage: 'POC/Demo', questionid: 47, question:'What is the next step? When is it planned?', answers: [
              { answerid: 181, questionid: 47, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 48, question:'Is BOM different from the budgetary quote?', answers: [
          { answerid: 108, questionid: 48, answer:'Yes', checked: false},
          { answerid: 109, questionid: 48, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 49, question:'Has customer explained the change in the BOM and taken agreement?', answers: [
              { answerid: 182, questionid: 49, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 50, question:'Is there any point still unaddressed?', answers: [
              { answerid: 183, questionid: 50, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 51, question:'Is OEM informed on change in the BOM?', answers: [
          { answerid: 110, questionid: 51, answer:'Yes', checked: false},
          { answerid: 111, questionid: 51, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 52, question:'Do you have preferential support from OEM?', answers: [
          { answerid: 112, questionid: 52, answer:'Yes', checked: false},
          { answerid: 113, questionid: 52, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 53, question:'Has OEM made joint-call with you?', answers:[
          { answerid: 114, questionid: 53, answer:'Yes', checked: false},
          { answerid: 115, questionid: 53, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 54, question:'What is the new topline of the new BOM?', answers: [
              { answerid: 184, questionid: 54, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 55, question:'What is the new GC of the new BOM?', answers: [
              { answerid: 185, questionid: 55, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 56, question:'Do you want your manager, sales head and the CxO of the company to meet customers team at various levels?', answers: [
          { answerid: 116, questionid: 56, answer:'Yes', checked: false},
          { answerid: 117, questionid: 56, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 57, question:'Do you need organizations help to map OEM completely?', answers: [
          { answerid: 118, questionid: 57, answer:'Yes', checked: false},
          { answerid: 119, questionid: 57, answer:'No', checked: false}]},
          {stage: 'Final_Proposal', questionid: 58, question:'What is the next step? When is it planned?', answers: [
              { answerid: 186, questionid: 58, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 59, question:'Do you know the nego process of customer?', answers: [
              { answerid: 187, questionid: 59, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 60, question:'Have you met people involved in negotiation?', answers: [
              { answerid: 188, questionid: 60, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 61, question:'Do you know the minimum value below which you wont want to do this business?', answers: [
              { answerid: 189, questionid: 61, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 62, question:'Have you prepared and presented the key value proposition of your organization, track record, success stories, reference customers?', answers: [
              { answerid: 190, questionid: 62, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 63, question:'Have you presented critical points that are important to meet your customers challenges?', answers: [
              { answerid: 191, questionid: 63, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 64, question:'Have you compared your proposition vis-a-vis competition and clearly articulated where you provide more value?', answers: [
              { answerid: 192, questionid: 64, answer:'', checked: false}   
            ]},
          {stage: 'Case_won', questionid: 65, question:'What are the real reasons behind the win?', answers: [
          { answerid: 120, questionid: 65, answer:'Technology', checked: false},
          { answerid: 121, questionid: 65, answer:'Prices', checked: false},
          { answerid: 122, questionid: 65, answer:'Raksha track record', checked: false},
          { answerid: 123, questionid: 65, answer:'Strong reference', checked: false},
          { answerid: 124, questionid: 65, answer:'Existing customer', checked: false},
          { answerid: 125, questionid: 65, answer:'Vendor supported', checked: false},
          { answerid: 126, questionid: 65, answer:'Opportunity locking in the earlier stage', checked: false},
          { answerid: 127, questionid: 65, answer:'Solution met technical & business expectations', checked: false},
          { answerid: 128, questionid: 65, answer:'Customer happy with the POC', checked: false},
          { answerid: 129, questionid: 65, answer:'Relationship with the customer', checked: false},
          { answerid: 130, questionid: 65, answer:'Proper decision makers mapping and multi-level engagement', checked: false}]},
          {stage: 'Case_lost', questionid: 66, question:'What are the real reasons behind the loss?', answers: [
          { answerid: 131, questionid: 66, answer:'Late entry', checked: false},
          { answerid: 132, questionid: 66, answer:'High prices', checked: false},
          { answerid: 133, questionid: 66, answer:'Competition existing account', checked: false},
          { answerid: 134, questionid: 66, answer:'Raksha has no reference', checked: false},
          { answerid: 135, questionid: 66, answer:'Vendor did not support', checked: false},
          { answerid: 136, questionid: 66, answer:'Technically unable to meet requirements', checked: false},
          { answerid: 137, questionid: 66, answer:'High prices', checked: false},
          { answerid: 138, questionid: 66, answer:'POC failed', checked: false},
          { answerid: 139, questionid: 66, answer:'Unable to reach decision makers', checked: false},
          { answerid: 140, questionid: 66, answer:'Customer more inclined to competition solution', checked: false}]},
          {stage: 'Qualified_lead', questionid: 67, question: 'Others', answers: [
              { answerid: 193, questionid: 67, answer:'', checked: false}   
            ]},
          {stage: 'Presales_Presentation', questionid: 68, question: 'Others', answers: [
              { answerid: 194, questionid: 68, answer:'', checked: false}   
            ]},
          {stage: 'Budgetary_Price_Shared', questionid: 69, question: 'Others', answers: [
              { answerid: 195, questionid: 69, answer:'', checked: false}   
            ]},
          {stage: 'POC/Demo', questionid: 70, question: 'Others', answers: [
              { answerid: 196, questionid: 70, answer:'', checked: false}   
            ]},
          {stage: 'Final_Proposal', questionid: 71, question: 'Others', answers: [
              { answerid: 197, questionid: 71, answer:'', checked: false}   
            ]},
          {stage: 'Final_Negotiation', questionid: 72, question: 'Others', answers: [
              { answerid: 198, questionid: 72, answer:'', checked: false}   
            ]},
          {stage: 'Case_won', questionid: 73, question: 'Others', answers: [
              { answerid: 199, questionid: 73, answer:'', checked: false}   
            ]},
          {stage: 'Case_lost', questionid: 74, question: 'Others', answers: [
              { answerid: 200, questionid: 74, answer:'', checked: false}   
            ]}
	  ]  
  }
  
  // getAnswers() {
  //  	return this.review_answers_ql = [
  //      // { answerid: 1, questionid: 1, answer:'Current solution not meeting the requirements', checked: false},
  //   // { answerid: 2, questionid: 1, answer:'Business expansion', checked: false},
  //   // { answerid: 3, questionid: 1, answer:'New initiatives', checked: false},
  //   // { answerid: 4, questionid: 1, answer:'Not happy with the current product', checked: false},
  //   // { answerid: 5, questionid: 1, answer:'Not happy with the current partner', checked: false},
  //   // { answerid: 6, questionid: 1, answer:'Product EOL/EOSL', checked: false},
  //   // { answerid: 7, questionid: 1, answer:'Compliance requirements', checked: false},
  //   // { answerid: 8, questionid: 1, answer:'TCO of current solution is higher', checked: false},
  //   // { answerid: 9, questionid: 2, answer:'Pure commercial', checked: false},
  //   // { answerid: 10, questionid: 2, answer:'Technology weightage more - technical', checked: false},
  //   // { answerid: 11, questionid: 2, answer:'Technical evaluation - POC/Demo', checked: false},
  //   // { answerid: 12, questionid: 2, answer:'Invite multiple quotes - purchase', checked: false},
  //   // { answerid: 13, questionid: 3, answer:'Technology evaluator', checked: false},
  //   // { answerid: 14, questionid: 3, answer:'Recommender', checked: false},
  //   // { answerid: 15, questionid: 3, answer:'Information gathering', checked: false},
  //   // { answerid: 16, questionid: 3, answer:'Purchase', checked: false},
  //   // { answerid: 17, questionid: 3, answer:'Technology weightage more - technical', checked: false},
  //   // { answerid: 18, questionid: 3, answer:'Technical evaluation - POC/Demo', checked: false},
  //   // { answerid: 19, questionid: 3, answer:'Invite multiple quotes - purchase', checked: false},
  //   // { answerid: 20, questionid: 4, answer:'Existing partner', checked: false},
  //   // { answerid: 21, questionid: 4, answer:'Existing OEM', checked: false},
  //   // { answerid: 22, questionid: 5, answer:'Customer satisfied', checked: false},
  //   // { answerid: 23, questionid: 5, answer:'Customer unhappy', checked: false},
  //   // { answerid: 24, questionid: 5, answer:'Support issues', checked: false},
  //   // { answerid: 25, questionid: 5, answer:'Wrong solution suggested', checked: false},
  //   // { answerid: 26, questionid: 5, answer:'OEM supporting the partner', checked: false},
  //   // { answerid: 27, questionid: 5, answer:'Technically superior', checked: false},
  //   // { answerid: 28, questionid: 5, answer:'Technically inferior', checked: false},
  //   // { answerid: 29, questionid: 5, answer:'Commercially superior', checked: false},
  //   // { answerid: 30, questionid: 5, answer:'Commercially inferior', checked: false},
  //   // { answerid: 31, questionid: 6, answer:'Yes', checked: false},
  //   // { answerid: 32, questionid: 6, answer:'No', checked: false},
  //   // { answerid: 33, questionid: 6, answer:'OEM working with the other partner', checked: false},
  //   // { answerid: 34, questionid: 7, answer:'Yes', checked: false},
  //   // { answerid: 35, questionid: 7, answer:'No', checked: false},
  //   // { answerid: 36, questionid: 7, answer:'No idea', checked: false},
  //   // { answerid: 37, questionid: 8, answer:'IT', checked: false},
  //   // { answerid: 38, questionid: 8, answer:'Finance', checked: false},
  //   // { answerid: 39, questionid: 8, answer:'Purchase', checked: false},
  //   // { answerid: 40, questionid: 9, answer:'Immediate', checked: false},
  //   // { answerid: 41, questionid: 9, answer:'30 days', checked: false},
  //   // { answerid: 42, questionid: 9, answer:'60 days', checked: false},
  //   // { answerid: 43, questionid: 9, answer:'90 days', checked: false},
  //   // { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
  //   // { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
  //   // { answerid: 44, questionid: 9, answer:'> 90 days', checked: false},
  //   // { answerid: 45, questionid: 10, answer:'Paid on time', checked: false},
  //   // { answerid: 46, questionid: 10, answer:'Received payment after 45 days', checked: false},
  //   // { answerid: 47, questionid: 10, answer:'Received payment > 45 days', checked: false},
  //   // { answerid: 48, questionid: 10, answer:'AR pending', checked: false},
  //   // { answerid: 49, questionid: 11, answer:'Pay on time', checked: false},
  //   // { answerid: 50, questionid: 11, answer:'Pay within 45 days', checked: false},
  //   // { answerid: 51, questionid: 11, answer:'Bad paymasters', checked: false},
  //   // { answerid: 52, questionid: 12, answer:'Yes', checked: false},
  //   // { answerid: 53, questionid: 12, answer:'No', checked: false},
  //   // { answerid: 54, questionid: 14, answer:'Yes', checked: false},
  //   // { answerid: 55, questionid: 14, answer:'No', checked: false},
  //   // { answerid: 56, questionid: 15, answer:'Yes', checked: false},
  //   // { answerid: 57, questionid: 15, answer:'No', checked: false},
  //   // { answerid: 58, questionid: 16, answer:'Technical team', checked: false},
  //   // { answerid: 59, questionid: 16, answer:'Technical and finance team', checked: false},
  //   // { answerid: 60, questionid: 16, answer:'Technical, finance and commercial team', checked: false},
  //   { answerid: 61, questionid: 17, answer:'Yes', checked: false},
  //   { answerid: 62, questionid: 17, answer:'No', checked: false},
  //   { answerid: 63, questionid: 18, answer:'Yes', checked: false},
  //   { answerid: 64, questionid: 18, answer:'No', checked: false},
  //   { answerid: 65, questionid: 19, answer:'General overview and collect more information', checked: false},
  //   { answerid: 66, questionid: 19, answer:'We know the need, customized presentation', checked: false},
  //   { answerid: 67, questionid: 19, answer:'Gain commitment on our understanding, address objections & queries and freeze BOM', checked: false},
  //   { answerid: 68, questionid: 20, answer:'Yes', checked: false},
  //   { answerid: 69, questionid: 20, answer:'Not now but later', checked: false},
  //   { answerid: 70, questionid: 21, answer:'Presence of senior technical resources', checked: false},
  //   { answerid: 71, questionid: 21, answer:'Presence of senior sales', checked: false},
  //   { answerid: 72, questionid: 21, answer:'Presence of management', checked: false},
  //   { answerid: 73, questionid: 21, answer:'External references', checked: false},
  //   { answerid: 74, questionid: 22, answer:'Yes, need fine printed copy', checked: false},
  //   { answerid: 75, questionid: 22, answer:'Not required now', checked: false},
  //   { answerid: 76, questionid: 23, answer:'Gathering more information - IT infra, technical challenges, roadmap and future plans', checked: false},
  //   { answerid: 77, questionid: 25, answer:'Yes', checked: false},
  //   { answerid: 78, questionid: 25, answer:'No', checked: false},
  //   { answerid: 79, questionid: 26, answer:'Our presales', checked: false},
  //   { answerid: 80, questionid: 26, answer:'OEM', checked: false},
  //   { answerid: 81, questionid: 26, answer:'Customer technical team', checked: false},
  //   { answerid: 82, questionid: 29, answer:'Yes', checked: false},
  //   { answerid: 83, questionid: 29, answer:'No', checked: false},
  //   { answerid: 84, questionid: 29, answer:'No, they want to see the POC', checked: false},
  //   { answerid: 85, questionid: 30, answer:'Yes', checked: false},
  //   { answerid: 86, questionid: 30, answer:'No', checked: false},
  //   { answerid: 87, questionid: 31, answer:'Yes', checked: false},
  //   { answerid: 88, questionid: 31, answer:'No', checked: false},
  //   { answerid: 89, questionid: 32, answer:'Supply product only', checked: false},
  //   { answerid: 90, questionid: 32, answer:'Product + Installation only', checked: false},
  //   { answerid: 91, questionid: 32, answer:'Product + Installation + Professional Services', checked: false},
  //   { answerid: 92, questionid: 32, answer:'Product + Installation + Professional Services + Training', checked: false},
  //   { answerid: 93, questionid: 33, answer:'No, customer keen to meet the immediate and short term', checked: false},
  //   { answerid: 94, questionid: 33, answer:'Yes, immediate, short and long term requirements are taken care', checked: false},
  //   { answerid: 95, questionid: 34, answer:'Our presales and post sales team', checked: false},
  //   { answerid: 96, questionid: 34, answer:'Sales', checked: false},
  //   { answerid: 97, questionid: 34, answer:'OEM', checked: false},
  //   { answerid: 98, questionid: 42, answer:'Yes', checked: false},
  //   { answerid: 99, questionid: 42, answer:'No', checked: false},
  //   { answerid: 100, questionid: 43, answer:'Yes', checked: false},
  //   { answerid: 101, questionid: 43, answer:'No', checked: false},
  //   { answerid: 102, questionid: 44, answer:'Yes. Relevant documents are explained and mailed to them.', checked: false},
  //   { answerid: 103, questionid: 44, answer:'No. Need to find out.', checked: false},
  //   { answerid: 104, questionid: 45, answer:'Yes', checked: false},
  //   { answerid: 105, questionid: 45, answer:'No', checked: false},
  //   { answerid: 106, questionid: 46, answer:'Yes', checked: false},
  //   { answerid: 107, questionid: 46, answer:'No', checked: false},
  //   { answerid: 108, questionid: 48, answer:'Yes', checked: false},
  //   { answerid: 109, questionid: 48, answer:'No', checked: false},
  //   { answerid: 110, questionid: 51, answer:'Yes', checked: false},
  //   { answerid: 111, questionid: 51, answer:'No', checked: false},
  //   { answerid: 112, questionid: 52, answer:'Yes', checked: false},
  //   { answerid: 113, questionid: 52, answer:'No', checked: false},
  //   { answerid: 114, questionid: 53, answer:'Yes', checked: false},
  //   { answerid: 115, questionid: 53, answer:'No', checked: false},
  //   { answerid: 116, questionid: 56, answer:'Yes', checked: false},
  //   { answerid: 117, questionid: 56, answer:'No', checked: false},
  //   { answerid: 118, questionid: 57, answer:'Yes', checked: false},
  //   { answerid: 119, questionid: 57, answer:'No', checked: false},
  //   { answerid: 120, questionid: 65, answer:'Technology', checked: false},
  //   { answerid: 121, questionid: 65, answer:'Prices', checked: false},
  //   { answerid: 122, questionid: 65, answer:'Raksha track record', checked: false},
  //   { answerid: 123, questionid: 65, answer:'Strong reference', checked: false},
  //   { answerid: 124, questionid: 65, answer:'Existing customer', checked: false},
  //   { answerid: 125, questionid: 65, answer:'Vendor supported', checked: false},
  //   { answerid: 126, questionid: 65, answer:'Opportunity locking in the earlier stage', checked: false},
  //   { answerid: 127, questionid: 65, answer:'Solution met technical & business expectations', checked: false},
  //   { answerid: 128, questionid: 65, answer:'Customer happy with the POC', checked: false},
  //   { answerid: 129, questionid: 65, answer:'Relationship with the customer', checked: false},
  //   { answerid: 130, questionid: 65, answer:'Proper decision makers mapping and multi-level engagement', checked: false},
  //   { answerid: 131, questionid: 66, answer:'Late entry', checked: false},
  //   { answerid: 132, questionid: 66, answer:'High prices', checked: false},
  //   { answerid: 133, questionid: 66, answer:'Competition existing account', checked: false},
  //   { answerid: 134, questionid: 66, answer:'Raksha has no reference', checked: false},
  //   { answerid: 135, questionid: 66, answer:'Vendor did not support', checked: false},
  //   { answerid: 136, questionid: 66, answer:'Technically unable to meet requirements', checked: false},
  //   { answerid: 137, questionid: 66, answer:'High prices', checked: false},
  //   { answerid: 138, questionid: 66, answer:'POC failed', checked: false},
  //   { answerid: 139, questionid: 66, answer:'Unable to reach decision makers', checked: false},
  //   { answerid: 140, questionid: 66, answer:'Customer more inclined to competition solution', checked: false},
  //   { answerid: 141, questionid: 1, answer:'Others', checked: false},
  //   { answerid: 142, questionid: 2, answer:'Others', checked: false},
  //   { answerid: 143, questionid: 3, answer:'Others', checked: false},
  //   { answerid: 144, questionid: 4, answer:'Others', checked: false},
  //   { answerid: 145, questionid: 5, answer:'Others', checked: false},
  //   { answerid: 146, questionid: 6, answer:'Others', checked: false},
  //   { answerid: 147, questionid: 7, answer:'Others', checked: false},
  //   { answerid: 148, questionid: 8, answer:'Others', checked: false},
  //   { answerid: 149, questionid: 9, answer:'Others', checked: false},
  //   { answerid: 150, questionid: 10, answer:'Others', checked: false},
  //   { answerid: 151, questionid: 11, answer:'Others', checked: false},
  //   { answerid: 152, questionid: 12, answer:'Others', checked: false},
  //   { answerid: 153, questionid: 14, answer:'Others', checked: false},
  //   { answerid: 154, questionid: 15, answer:'Others', checked: false},
  //   { answerid: 155, questionid: 16, answer:'Others', checked: false},
  //   { answerid: 156, questionid: 17, answer:'Others', checked: false},
  //   { answerid: 157, questionid: 18, answer:'Others', checked: false},
  //   { answerid: 158, questionid: 19, answer:'Others', checked: false},
  //   { answerid: 159, questionid: 20, answer:'Others', checked: false},
  //   { answerid: 160, questionid: 21, answer:'Others', checked: false},
  //   { answerid: 161, questionid: 22, answer:'Others', checked: false},
  //   { answerid: 162, questionid: 23, answer:'Others', checked: false},
  //   { answerid: 163, questionid: 25, answer:'Others', checked: false},
  //   { answerid: 164, questionid: 26, answer:'Others', checked: false},
  //   { answerid: 165, questionid: 29, answer:'Others', checked: false},
  //   { answerid: 166, questionid: 30, answer:'Others', checked: false},
  //   { answerid: 167, questionid: 31, answer:'Others', checked: false},
  //   { answerid: 168, questionid: 33, answer:'Others', checked: false},
  //   { answerid: 169, questionid: 34, answer:'Others', checked: false}
  //   ]
  // }

}

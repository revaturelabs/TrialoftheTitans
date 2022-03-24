import { LightningElement, track, wire, api } from 'lwc';
import EDUCATION_OBJECT from '@salesforce/schema/Education__c';
import USER_FIELD from '@salesforce/schema/Education__c.User__c';
import GPA_FIELD from '@salesforce/schema/Education__c.Gpa__C';
import MAJOR_FIELD from '@salesforce/schema/Education__c.Major__c';
import DATE_GRADUATED from '@salesforce/schema/Education__c.DateGraduate__c';
import DEGREE_FIELD from '@salesforce/schema/Education__c.Degree__c';
//import HATICON from '@salesforce/resourceUrl/hat';
//import EDITICON from '@salesforce/resourceUrl/editicon';
export default class Portfolioeducation extends LightningElement {
/*
    hatty = HATICON;
    editiconimplementation = EDITICON;
*/    
    @api recordId;
    @api objectApiName;
    @track modalChecker = false;
    educationObject = EDUCATION_OBJECT;
    userField = USER_FIELD;
    majorField = MAJOR_FIELD;
    degreeField = DEGREE_FIELD;
    gpaField = GPA_FIELD;
    dateGraduateField = DATE_GRADUATED;

    
    modalOpener() 
    {
        this.modalChecker = true;
    }
    modalCloser() 
    {
        this.modalChecker = false;
    }
}
/************************************************************
 * Done by: Mohammed Azad
 * Interacts with the education components:
 * Allows the user to 
 *  - Create an entry that contains their education: 
 *      - Degree
 *      - Date Graduated 
 *      - Degree
 *      - Institution Name
 *      - GPA 
 *      - Major 
 *  - Delete an entry that the user feels is a mistake. 
 * Date: March 24 2022
 ************************************************************/
import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CERTIFICATION_OBJECT from '@salesforce/schema/Certification__c';
import CER_EXAM from '@salesforce/schema/Certification__c.Certification_Exam__c';
import CER_USER from '@salesforce/schema/Certification__c.User__c';
import CER_CANDIDATE from '@salesforce/schema/Certification__c.Candidate__c';
import CER_NAME from '@salesforce/schema/Certification__c.Name';
import VER_SITE from '@salesforce/schema/Certification__c.Verification_Site__c';
import DATE_ISSUED from '@salesforce/schema/Certification__c.Date_Issued__c';
import CER_URL from '@salesforce/schema/Certification__c.Image_URL__c';
import ASSESSOR from '@salesforce/schema/Certification__c.Assessor__c';

import EDUCATION_OBJECT from '@salesforce/schema/Education__c';
import USER_FIELD from '@salesforce/schema/Education__c.User__c';
import EDUCATION_FIELD from '@salesforce/schema/Education__c.Name';
import GPA_FIELD from '@salesforce/schema/Education__c.Gpa__c';
import MAJOR_FIELD from '@salesforce/schema/Education__c.Major__c';
import DATE_GRADUATED from '@salesforce/schema/Education__c.DateGraduate__c';
import DEGREE_FIELD from '@salesforce/schema/Education__c.Degree__c';
import IMAGE_URL from '@salesforce/schema/Education__c.Image_URL__c';
//import LOGO_EDU from '@salesforce/schema/Education__c.Logo__c';


import {refreshApex} from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

//APEX CLASS
import RETURN_EDUCATION from '@salesforce/apex/GetEducationInformation.returnEducationList';
import RETURN_CERTIFICATION from '@salesforce/apex/getCertificationInfo.Certifications';

//import HATICON from '@salesforce/resourceUrl/hat';
//import EDITICON from '@salesforce/resourceUrl/editicon';
export default class Portfolioeducation extends LightningElement 
{
/*
    hatty = HATICON;
    editiconimplementation = EDITICON;
*/    
    @api recordId;
    @api objectApiName;
    @track modalChecker = false;
    educationObject = EDUCATION_OBJECT;
    userField = USER_FIELD;
    educationField = EDUCATION_FIELD;
    majorField = MAJOR_FIELD;
    degreeField = DEGREE_FIELD;
    gpaField = GPA_FIELD;
    dateGraduatedField = DATE_GRADUATED;
    imageUrl=IMAGE_URL;


    @track education;
    @track wireValue;
    @track wireCer;
    @track certification;

    cerObject=CERTIFICATION_OBJECT;
    cerExam=CER_EXAM;
    cerName=CER_NAME;
    verSite=VER_SITE;
    dateIssued=DATE_ISSUED;
    assessor=ASSESSOR;
    cerUrl=CER_URL;
    cerCandidate=CER_CANDIDATE;
    cerUser=CER_USER;


    @wire(RETURN_EDUCATION)
    educationList(value) {
        const {error, data} = value;
        if(data) {this.education = data;}
        else if(error) {console.log(error);}
        console.log(this.education);
        this.wireValue = value;
    }

    @wire(RETURN_CERTIFICATION)
    certificationList(value) {
        const {error, data} = value;
        if(data) {
            console.log('inside certification')
            this.certification = data;
        }
        else if(error) {console.log(error);}
        console.log(this.certification);
        this.wireCer = value;
    }

    
    
    modalOpener() 
    {
        this.modalChecker = true;
    }

    modalOpener1() 
    {
        this.modalChecker1 = true;
    }

    modalCloser() 
    {
        const closeenv = new ShowToastEvent({
            title: "Cancelled",
            message: "You cancelled inputting information.",
            variant: "error"
        });

        this.dispatchEvent(closeenv);
        this.modalChecker = false;
    }

    modalCloser1() 
    {
        const closeenv = new ShowToastEvent({
            title: "Cancelled",
            message: "You cancelled Certification information.",
            variant: "error"
        });

        this.dispatchEvent(closeenv);
        this.modalChecker1 = false;
    }


    handleSuccess() 
    {
        const env = new ShowToastEvent({
            title: "Success",
            message: "Information Received.",
            variant: "success"
        });

        this.dispatchEvent(env);
        refreshApex(this.wireValue);
        this.modalChecker = false;
    }

    handleSuccess1() 
    {
        const env1 = new ShowToastEvent({
            title: "Success",
            message: "Information Received.",
            variant: "success"
        });

        this.dispatchEvent(env1);
        refreshApex(this.wireCer);
        this.modalChecker1 = false;
    }




    handleDelete(event) {
        let eduId = event.currentTarget.dataset.eduvalue;
        console.log(eduId);
        deleteRecord(eduId)
            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Entry Has Been Deleted',
                    variant: 'success'
                })
                
            )
            refreshApex(this.wireValue);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error While Deleting Record',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });

    }


}
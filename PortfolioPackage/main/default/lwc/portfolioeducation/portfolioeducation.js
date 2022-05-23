/****************************************************************************************************
 Author: Mohammed Azad
 Last modified by: Deepika Chandran
 * Allows the user to 
 *  - Create an entry that contains their education: 
 *      - Degree
 *      - Date Graduated 
 *      - Degree
 *      - Institution Name
 *      - GPA 
 *      - Major 
 *  - Delete an entry that the user feels is a mistake. 
 Date Created: 03/24/2022
 Modified Date: 05/23/2022
 Iteration XI
******************************************************************************************************/
//all the impors for the certifications
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

//all the improts for the educations
import EDUCATION_OBJECT from '@salesforce/schema/Education__c';
import USER_FIELD from '@salesforce/schema/Education__c.User__c';
import EDUCATION_FIELD from '@salesforce/schema/Education__c.Name';
import GPA_FIELD from '@salesforce/schema/Education__c.Gpa__c';
import MAJOR_FIELD from '@salesforce/schema/Education__c.Major__c';
import DATE_GRADUATED from '@salesforce/schema/Education__c.DateGraduate__c';
import DEGREE_FIELD from '@salesforce/schema/Education__c.Degree__c';
import IMAGE_URL from '@salesforce/schema/Education__c.Image_URL__c';

//calling the refreshapex and delete record 
import {refreshApex} from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

//APEX CLASS
import RETURN_EDUCATION from '@salesforce/apex/GetEducationInformation.returnEducationList';
import RETURN_CERTIFICATION from '@salesforce/apex/getCertificationInfo.Certifications';

export default class Portfolioeducation extends LightningElement 
{ 
    @api recordId;
    @api objectApiName;
    @track modalChecker = false;
    @track modalChecker1 = false; 
    //declaring variables for education
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
    @track wireCer; 

    //declaring variables for the certifications 
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
            console.log('inside certification');
            this.certification = data;
        }
        else if(error) {console.log(error);}
        console.log(this.certification);
        this.wireCer = value;
    }

    //modalOpener for the educations
    modalOpener() 
    {
        this.modalChecker = true;
    }

    //modal opener for the certification
    modalOpener1() 
    {
        this.modalChecker1 = true;
    }

    //modalCloser for the education
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

    //modalCloser for the certification
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

    //success for education
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

    //success for certification
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
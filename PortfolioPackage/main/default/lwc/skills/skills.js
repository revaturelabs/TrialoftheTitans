import { LightningElement, track, api, wire } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

import retrieveTitans from '@salesforce/apex/TestDataClass.retrieveTitans';
import retrieveCategories from '@salesforce/apex/TestDataClass.retrieveCategories';

import TITAN_OBJECT from '@salesforce/schema/Titan__c';
import NAME_FIELD from '@salesforce/schema/Titan__c.Name';
import CURRICULUM_FIELD from '@salesforce/schema/Titan__c.Curriculum__c';
import CURRICULUM_FIELD_NAME from '@salesforce/schema/Titan__c.Curriculum__r.Name';


import CATEGORY_OBJECT from '@salesforce/schema/Category__c';
import CATEGORY_NAME from '@salesforce/schema/Category__c.Name';

import CUSTOM_SKILL_OBJECT from '@salesforce/schema/Custom_Skill__c';
import CUSTOM_SKILL_NAME from '@salesforce/schema/Custom_Skill__c.Name';
import CUSTOM_SKILL_CATEGORY from '@salesforce/schema/Custom_Skill__c.Category__c';



// import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
// import SOURCE_FIELD from '@salesforce/schema/Account.AccountSource';

// import CNAME_FIELD from '@salesforce/schema/Contact.Name';
// import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
// import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class Skills extends LightningElement {

    @api recordId;
    @api objectAPIName;

    matchCurriculum;
    category;
    skills = [];
    skill;

    objectName = CUSTOM_SKILL_OBJECT;
    nameField = CUSTOM_SKILL_NAME;
    skillcategory = CUSTOM_SKILL_CATEGORY;
    
    categoryObject = CATEGORY_OBJECT;
    categoryName = CATEGORY_NAME;

    // industryField = INDUSTRY_FIELD;
    // sourceField = SOURCE_FIELD;
    // defaultSource = 'Web';

    // cnameField = CNAME_FIELD;
    // phoneField = PHONE_FIELD;
    // emailField = EMAIL_FIELD;

    // @track lstCategories = [];
    // constructor(){
    //     super();
    //     // Imperative Apex call to get the list of Opportunities
    //     retrieveCategories({}).then(response => {
    //         this.lstCategories = response;
    //     }).catch(error => {
    //         console.log('Error: ' +error.body.message);
    //     });
    // }


    handleSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: "Record created.",
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
    }


    @track isModalOpen = false;
    @track isSkillsModalOpen = false;

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen track value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    

    @wire(retrieveTitans)
    titans;

    @wire(retrieveCategories)
    categories
    ({error, data}){
        if(error){
            this.error = error;
        }
        else if(data){
            console.log(data);
            this.category = data;
            //console.log(this.category.Custom_Skills__r);

            //for loop
            for(let i = 0; i<this.category.length; i++){
                if(this.category[i].Custom_Skills__r){
                    for(let j = 0; j<this.category[i].Custom_Skills__r.length; j++){
                        if(j == 10){ break;}
                        //console.log(this.category[i].Custom_Skills__r[j]);
                        this.skill = this.category[i].Custom_Skills__r[j].Name;
                        console.log(this.skill);
                        this.skills.push(this.skill);
                        
                }
                }
                console.log(this.skills);
            }

            // this.skills = this.categorie[1].Custom_Skills__r[0];
            // console.log(this.skills);
            
        }
    };
    
    closeSkillsModal(){
        this.isSkillsModalOpen = false;

    }

    openSkillsModal(event){
        //Create new titan and grab the Curriculum ID of the target and set the new titan curriculum
        //to that specific Curriculum ID
        console.log(event.target.detail);
        this.isSkillsModalOpen = true;

    }

    handleDelete(event) {
        let categoryId = event.currentTarget.value;
        console.log(categoryId);
        deleteRecord(categoryId)
            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Has Been Deleted',
                    variant: 'success'
                })
            )
            // for(let cat in this.lstCategories){
            //         if(this.lstCategories[cat].Id == categoryId){
            //             this.lstCategories.splice(cat, 1);
            //             break;
            //         }
            //     }
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
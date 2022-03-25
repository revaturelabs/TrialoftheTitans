// Author: Gabriel Anton
// Date: 3/22/22
// Description: LWC JS controller that uses apex controller methods to get categories
// provides the data for the LDS record-edit-forms in each corresponding modal.
// There is also a delete record function.



import { LightningElement, track, api, wire } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

import retrieveCategories from '@salesforce/apex/TestDataClass.retrieveCategories';
import setProgress from '@salesforce/apex/TestDataClass.setProgress';

import CATEGORY_OBJECT from '@salesforce/schema/Category__c';
import CATEGORY_NAME from '@salesforce/schema/Category__c.Name';
import CATEGORY_USER from '@salesforce/schema/Category__c.User__c';

import CUSTOM_SKILL_OBJECT from '@salesforce/schema/Custom_Skill__c';
import CUSTOM_SKILL_NAME from '@salesforce/schema/Custom_Skill__c.Name';
import CUSTOM_SKILL_CATEGORY from '@salesforce/schema/Custom_Skill__c.Category__c';
import CUSTOM_SKILL_USER from '@salesforce/schema/Custom_Skill__c.User__c';
import CUSTOM_SKILL_PROGRESS from '@salesforce/schema/Custom_Skill__c.Progress__c';

export default class Skills extends LightningElement {

    @api recordId;
    @api objectAPIName;

    matchCurriculum;
    category;
    skills = [];
    skill;

    @track valueId;
    @track progressId;
    @track progressNumber;
    @track progressNum;
    @track progressName;
    
    @track isModalOpen = false;
    @track isSkillsModalOpen = false;
    //@track isProgressModalOpen = false;

    @track wireRes;

    objectName = CUSTOM_SKILL_OBJECT;
    nameField = CUSTOM_SKILL_NAME;
    skillCategory = CUSTOM_SKILL_CATEGORY;
    skillUser = CUSTOM_SKILL_USER;
    skillProgress = CUSTOM_SKILL_PROGRESS;
    
    categoryObject = CATEGORY_OBJECT;
    categoryName = CATEGORY_NAME;
    categoryUser = CATEGORY_USER;



    //////////////////////// Modal Methods /////////////////////////
    
    handleSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: "Category Created.",
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
        this.isModalOpen = false;
        // this.isSkillsModalOpen = false;
        refreshApex(this.wireRes);
    }

    handleSkillSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: "Skill Created.",
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
        // this.isModalOpen = false;
        this.isSkillsModalOpen = false;
        refreshApex(this.wireRes);
    }

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
    
    closeSkillsModal(){
        this.isSkillsModalOpen = false;

    }

    openSkillsModal(event){
        //Create new titan and grab the Curriculum ID of the target and set the new titan curriculum
        //to that specific Curriculum ID
        //console.log(event.target.detail);
        this.isSkillsModalOpen = true;

    }


    // editProgress(event){
    //     this.isProgressModalOpen = true;
    //     this.valueId = event.currentTarget.value;
    //     this.progressId = event.currentTarget.name;
    //     // this.progressNumber = event.currentTarget.id;
    //     // this.progressNum = Number(String(this.progressNumber).slice(0,2));
    //     // console.log(this.progressNum);
    // }

    // closeProgressModal(){
    //     this.isProgressModalOpen = false;
    // }

    //////////////////////// Modal Methods /////////////////////////




    
    @wire(retrieveCategories)
    categories
    (res){
        
        const {error, data} = res
        if(data){
            console.log(data);
            this.category = data;
            
            this.wireRes = res;
        }
        else if(error){
            console.log(error);
        }
            

            //for loop
            // for(let i = 0; i<this.category.length; i++){
            //     if(this.category[i].Custom_Skills__r){
            //         for(let j = 0; j<this.category[i].Custom_Skills__r.length; j++){
            //             if(j == 10){ break;}
            //             //console.log(this.category[i].Custom_Skills__r[j]);
            //             this.skill = this.category[i].Custom_Skills__r[j].Name;
            //             console.log(this.skill);
            //             this.skills.push(this.skill);
                        
            //     }
            //     }
            //     console.log(this.skills);
            // }

            // this.skills = this.categorie[1].Custom_Skills__r[0];
            // console.log(this.skills);
            
    };
    
    

    handleDelete(event) {
        let categoryId = event.currentTarget.value;
        console.log(categoryId);
        deleteRecord(categoryId)
            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Category Has Been Deleted',
                    variant: 'success'
                })
                
            )
            refreshApex(this.wireRes);
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

        handleDeleteSkill(event) {
            let skillId = event.currentTarget.value;
            console.log(skillId);
            deleteRecord(skillId)
                .then(() => {
                    this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Skill Has Been Deleted',
                        variant: 'success'
                    })
                    
                )
                refreshApex(this.wireRes);
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







////////////////////////////////Mountain's code (progress bar)//////////////////////////////////


// @track i = 0;
// id = 0;
// width = 0;
// endwidth = 100;   //null value will be replaced with default value from database
// count = 0;



// //function animates growth to value input by user
// move() {
//     console.log('move called');
//     console.log(this.endwidth);
//     if (this.i === 0) {
//       this.i = 1;
//       let elem = this.template.querySelector("." + this.progressId);
//       //console.log(this.template.querySelector("." + this.valueId).innerHTML);
//       let elemInnerSpan = this.template.querySelector("." + this.valueId);
//       console.log(elem);
//       console.log(this.valueId);
//       console.log(this.progressId);
//     //   console.log(elemInnerSpan);
//         this.id = setInterval(() => {
//             if (this.width >= this.endwidth) {
//                 clearInterval(this.id);
//                 console.log(this.id)
//                 this.i = 0;
//                 this.width = 0;
//                 console.log('cleared');
//             } else {
//                 this.width++;
//                 elem.style.width = this.width + '%';
//                 elemInnerSpan.innerHTML = this.width;

//             }
//         }, 10);
//     }

    
// }


// updateScore() {
    
//     let inputValue = this.template.querySelector('.scoreInput').value 
//     let validationMessage = this.validateScore(inputValue);
//     switch (validationMessage) {
//         case "Not a number":
//             this.template.querySelector('.scoreInput').value = "";
//             this.template.querySelector('.scoreInput').placeholder = "Enter a number";
//             this.template.querySelector('.scoreInput').classList.add('error');
//             break;
//         case "Invalid Score":
//             this.template.querySelector('.scoreInput').value = "";
//             this.template.querySelector('.scoreInput').placeholder = "Enter a valid score";
//             this.template.querySelector('.scoreInput').classList.add('error');
//             break;
//         case "Valid Score":
//             this.template.querySelector('.scoreInput').classList.remove('error');
//             this.endwidth = inputValue;
//             setProgress({autoNumber: this.progressId, progress: inputValue});
            
//             console.log(this.template.querySelector('.' + this.progressId).className, '********');
//             // this.count++;
//             this.move();
//             this.isProgressModalOpen = false;
//             refreshApex(this.wireRes);
//             break;
//         default:
//             break;

// }

// }

// validateScore(inputValue){

//     if (isNaN(inputValue)) {
//         this.template.querySelector('.scoreInput').value = '0';
//         return "Not a number";
//     }

//     if (inputValue > 100 || inputValue < 0) {
//         this.template.querySelector('.scoreInput').value = '0';
//         this.endwidth = 0;
//         return "Invalid Score";
//     }

//     return "Valid Score";
// }



////////////////////////////////Mountain's code//////////////////////////////////

counter = 0;

// displayBar(count){
//     this.counter = count;
//     let progressElement = this.template.querySelector('.myProgress');
//     console.log(progressElement);
//     this.progressNumber = progressElement.id;
//     //.getAttribute('id');
//     this.progressName = progressElement.title;
//     //.getAttribute('title');
//     this.progressNum = Number(String(this.progressNumber).slice(0,2));
//     console.log(this.progressNum);
//     console.log(this.progressName);
//     //refreshApex(this.wireRes);
//     let progressBar = this.template.querySelector('[id=' + this.counter + ']');
//     console.log(progressBar);
//     progressBar.style.width = this.progressNum + '%';
// }

renderedCallback(){
    //console.log(this.category);
    // for(let i; i<10; i++){
    //     //this.displayBar(i);
    //     this.counter = i;
    //     console.log(this.counter);
    // let progressElement = this.template.querySelector('.myProgress');
    // console.log(progressElement);
    // this.progressNumber = progressElement.id;
    // //.getAttribute('id');
    // this.progressName = progressElement.title;
    // //.getAttribute('title');
    // this.progressNum = Number(String(this.progressNumber).slice(0,2));
    // console.log(this.progressNum);
    // console.log(this.progressName);
    // //refreshApex(this.wireRes);
    // let progressBar = this.template.querySelector('.' + this.progressName);
    // console.log(progressBar);
    //s progressBar.style.width = this.progressNum + '%';
    
    //}

    //refreshApex(this.wireRes);
    
    // console.log(event.currentTarget.id);

    // this.progressNumber = event.currentTarget.id;
    // 
    // this.progressName= event.currentTarget.title;
    // 
    // 
    // let progressBar = this.template.querySelector('.' + this.progressName);
    // console.log(this.template.querySelector('.' + this.progressName));
    // progressBar.style.width = this.progressNum + '%';
    
}

}
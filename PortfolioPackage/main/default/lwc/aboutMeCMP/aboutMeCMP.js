/* Author: Gabriela Conrado
    Description: LWC component that allows you to create an About Me section and edit existing ones. 
    Date Created: 03/21/22
    Modified Date: 03/24/2021
    Iteration XI */

 //Importing Objects and Fields from @salesforce/schema 
 import { LightningElement, track, wire } from 'lwc';
 import ABOUTMERECORD from '@salesforce/schema/About_Me_Record__c';
 import ABOUTME from '@salesforce/schema/About_Me_Record__c.About_Me__c';
 import NAME from '@salesforce/schema/About_Me_Record__c.Name';
 import CREATEABOUTME from '@salesforce/apex/AboutMeCreationController.createAboutMeSection';//Importing method from Apex class.
 import GETABOUTME from '@salesforce/apex/AboutMeCreationController.getAboutMeRecord';//Importing method from Apex class.
 import UPDATEABOUTME from '@salesforce/apex/AboutMeCreationController.updateAboutMeSection'; //Importing method from Apex class.
 import { refreshApex } from '@salesforce/apex'; 
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
 
 export default class AboutMeCMP extends LightningElement {
 //Declaring variables
 @track error;
 @track editbutton =true;
 @track myVal;
 exist;
 error ='';
 @track wirevalue;
 @track aboutMeRecord = {
 
     Name: NAME,
     About_Me__c: ABOUTME 
 };
 
 //Streaming data to the component through wire service
 @wire (GETABOUTME)
 wirevalue(value){
     const {error,data} = value;
         if(data){
                 this.myVal = data;
                 //Verifying if the record exists.
                 if(data.length<1){ 
                     this.exist=false;
                     this.myVal;
                 }
                     else {
                         this.exist=true;
                         this.myVal = data[0].About_Me__c;
                     }
             }
                 else if( error) {
                     this.error=error;
                     
                 }
         this.wirevalue=value;
 }
 
 /*
 initialVal({error,data}) {
    if(data){
         this.myVal = data;
         
         if(data.length<1){ 
             this.exist=false;
             this.myVal;
    
         }
         else {
             this.exist=true;
             this.myVal = data[0].About_Me__c;
             
         }
     }
     else if( error) {
         this.error=error;
         
     }
     
 }*/
 
 
 //@track Portfolio1__cid;
 
 
 
 
 
 //Functions
         handleEditIcon(){
             refreshApex(this.wirevalue);
                 if(this.editbutton==false)
                 {
                     this.editbutton = true;
                 }
                 else
                 {
                     this.editbutton = false;
                 }
         }
 
         handleAboutMeChange(event){
             this.myVal = event.target.value;
         }
 
         handleChange(event) {
             this.myVal= event.target.value;
             refreshApex(this.wirevalue);
         }
          //Handle save button
         handleSaveAboutMe(){
             //Verifing if the record does not exist to call the method from the Apex class that create a new record.
             if(!this.exist)
             {
                 CREATEABOUTME({aboutMeRecInput:this.myVal})//;
                 /* const toastEvent = new ShowToastEvent({
                     title: "Success",
                     message: "Record has been created.",
                     variant: "success"
                 });
 
                 this.dispatchEvent(toastEvent);
                 refreshApex(this.wirevalue);*/
                 .then(() => {
                     this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Success',
                         message: 'Record has been Updated',
                         variant: 'success'
                     })
                     
                 );
                 refreshApex(this.wirevalue);
                 })
                 
 
             }
             else{  //Verifing if the record exists to call the method from the Apex class that update a record.
                     //UPDATEABOUTME({aboutMeRecInput : this.myVal});
                     UPDATEABOUTME({aboutMeRecInput : this.myVal})
                     .then(() => {
                         this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Record has been Updated',
                             variant: 'success'
                         })
                         
                     );
                     refreshApex(this.wirevalue);
                     })
                     .catch(error => {
                         this.dispatchEvent(
                             new ShowToastEvent({
                                 title: 'Error While Updating Record',
                                 message: error.message,
                                 variant: 'error',
                             }),
                         );
                     });
                 
             }
             
         }
     //Handle cancel button
      resetForm(event){
         const fields = this.template.querySelectorAll('lightning-input-rich-text');
         fields.foreach(field=>{
             field.reset();
         });
         const toastEvent = new ShowToastEvent({
             title: "Success",
             message: "Record has been created.",
             variant: "success"
         });
 
         this.dispatchEvent(toastEvent);
         refreshApex(this.wirevalue);
     }
 
 
 }
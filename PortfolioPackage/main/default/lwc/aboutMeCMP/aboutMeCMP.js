/* Author: Gabriela Conrado
    Description: LWC component that allows you to create an About Me section and edit existing ones. 
    Date Created: 03/21/22
    Modified Date: 03/23/2021
     Iteration XI */

import { LightningElement, track, wire } from 'lwc';
import ABOUTMERECORD from '@salesforce/schema/About_Me_Record__c';
import ABOUTME from '@salesforce/schema/About_Me_Record__c.About_Me__c';
import NAME from '@salesforce/schema/About_Me_Record__c.Name';
//import USERID from "@salesforce/User/Id";
import CREATEABOUTME from '@salesforce/apex/AboutMeCreationController.createAboutMeSection';
import GETABOUTME from '@salesforce/apex/AboutMeCreationController.getAboutMeRecord';
import UPDATEABOUTME from '@salesforce/apex/AboutMeCreationController.updateAboutMeSection';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';


export default class AboutMeCMP extends LightningElement {

@track error;
@track editbutton =true;
@track myVal='';
@track myVal1='';
error ='';
@wire (GETABOUTME)
initialVal({error,data}) {
    if(data){
        this.myVal = data;
        
        this.myVal = data[0].About_Me__c;
        
    }
    else if( error) {
        this.error=error;
        
    }
}

@track Portfolio1__cid;
@track aboutMeRecord = {

    Name: NAME,
    About_Me__c: ABOUTME 
};

updateRecordView(recordId) {
    updateRecord({fields: { Id: recordId }});
}



handleEditIcon(){
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
    this.myVal1 = event.target.value;
}

handleChange(event) {
    this.myVal1 = event.target.value;
}

handleSaveAboutMe(){
   /* UPDATEABOUTME({aboutMeRecInput : this.myVal1});
    console.log(this.myVal1);
    this.myVal = this.myVal1;
    console.log(this.myVal); */

   // this.myVal = this.myVal1;
    if(this.myVal='')
   {
  CREATEABOUTME({aboutMeRecInput:this.myVal1});
  this.myVal = this.myVal1;
   }
   else{
    UPDATEABOUTME({aboutMeRecInput : this.myVal1});
    /*refreshApex(this.myVal1);*/
    this.myVal = this.myVal1;
    location.reload();

   }
  
  
 

}

  
       
   

    resetForm(event){
        const fields = this.template.querySelectorAll('lightning-input-rich-text');
        fields.foreach(field=>{
            field.reset();
        });
    }


}
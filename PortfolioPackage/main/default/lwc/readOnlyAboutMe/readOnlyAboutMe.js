import { api, LightningElement, track, wire } from 'lwc';
import getAboutMeRecord from '@salesforce/apex/UserInfoReadOnlyHelper.getAboutMeRecord';

export default class ReadOnlyAboutMe extends LightningElement {
    @api uid;
    @track myVal;
    @track error;
    
    @wire (getAboutMeRecord, {uid: "$uid"})
        wirevalue(value){
             const {error,data} = value;
                 if(data){
                         this.myVal = data;
                         //****Verifying if the record exists.****//
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
 
}
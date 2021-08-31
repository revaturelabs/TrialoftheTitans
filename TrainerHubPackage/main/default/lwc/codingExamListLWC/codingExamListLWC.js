import { LightningElement,track,wire } from 'lwc';
import CodingExamList from '@salesforce/apex/CodingExamListController.CodingExamList'; '@salesforce/apex/CodingExamListController.CodingExamList'

export default class CodingExamListLWC extends LightningElement {


    @track data;
    @track columns = [
   
        { label: 'Test Name', fieldName: 'Name', type: 'text'},
        { label: 'Passed %', fieldName: 'Percent_Passed__c', type: 'double'},
        

    ];
    //wires to the apex class that queries for coding exam list results and binds them to data rendered to data table
    @wire(CodingExamList) fetchCodingExamListData(error,data){
        this.data=data;
    }



}
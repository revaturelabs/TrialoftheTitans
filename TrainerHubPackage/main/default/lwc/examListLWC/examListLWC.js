import { LightningElement, wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import HERO_FIELD from '@salesforce/schema/Hero_Assessment__c.Hero__r.Name';
import EXAM_NAME_FIELD from '@salesforce/schema/Exam_Result__c.Exam__r.Name';
import SCORE_FIELD from '@salesforce/schema/Exam_Result__c.Score__c';
import TOTAL_CORRECT_FIELD from '@salesforce/schema/Exam_Result__c.Total_Correct__c';
import TOTAL_ANSWERS_FIELD from '@salesforce/schema/Exam_Result__c.Total_Answers__c';
import ExamList from '@salesforce/apex/ExamListController.ExamList';
import SearchExamList from '@salesforce/apex/ExamListController.SearchExamList';
//get Exam result data and set the columns of the datatable
const COLUMNS =[
    {label: 'Hero', fieldName: HERO_FIELD.fieldApiName, type: 'text'},
    {label: 'Exam Name', fieldName: EXAM_NAME_FIELD.fieldApiName, type: 'text'},
    {label: 'Score', fieldName: SCORE_FIELD.fieldApiName, type: 'percentage'},
    {label: 'Total Correct', fieldName: TOTAL_CORRECT_FIELD.fieldApiName, type: 'number'},
    {label: 'Total Answers', fieldName: TOTAL_ANSWERS_FIELD.fieldApiName, type: 'number'}
];
const DELAY=300;
export default class ExamListLWC extends LightningElement {
    @track examResult=[];
    @track examList=[];
    columns = COLUMNS;
    cohort='';
    searchValue ='';
    cohortId = '';
    /*@wire(ExamList, {cohort : '$cohort'})
    examList;*/
   @wire(ExamList, {cohort : '$cohort'})
    ExamList(error, data){
        if(data){
            for(let i=0; i<data.length;i++){
                if(data[i].Account__c==null){
                    data[i].hero = "No Hero";
                }else{
                    data[i].hero = data[i].Account__r.Name;
                }
            }
            for(let i=0; i<data.length;i++){
                if(data[i].Exam__c==null){
                    data[i].exam = "No Exam";
                }else{
                    data[i].exam = data[i].Exam__r.Name;
                }
            } 
            this.examList = data;
        }
    }
    @wire(SearchExamList, {searchKey: '$searchValue', cohortId: '$cohortId'})
    SearchExamList(error, data){
        if(data){this.examResult=data;}else if(error){}
    }
    
    
    handleSearchKeyword(event){
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(()=>{
            this.searchValue = searchString;

        }, DELAY);
        if(this.searchValue!==''){
            SearchExamList({searchKey: this.searchValue, cohortId:this.cohortId}).then(result=>{this.examResult=result;}).catch(error=>{this.error=error;});
            //this.dispatchEvent(event);
        }else{
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message
            });
            this.dispatchEvent(event);
        }
    }
}
import { LightningElement, wire } from 'lwc';
import HERO_FIELD from '@salesforce/schema/Hero_Assessment__c.Hero__r.Name';
import EXAM_NAME_FIELD from '@salesforce/schema/Exam_Result__c.Exam__r.Name';
import SCORE_FIELD from '@salesforce/schema/Exam_Result__c.Score__c';
import TOTAL_CORRECT_FIELD from '@salesforce/schema/Exam_Result__c.Total_Correct__c';
import TOTAL_ANSWERS_FIELD from '@salesforce/schema/Exam_Result__c.Total_Answers__c';
import ExamList from '@salesforce/apex/ExamListController.ExamList';
//get Exam result data and set the columns of the datatable
const COLUMNS =[
    {label: 'Hero', fieldName: HERO_FIELD.fieldApiName, type: 'text'},
    {label: 'Exam Name', fieldName: EXAM_NAME_FIELD.fieldApiName, type: 'text'},
    {label: 'Score', fieldName: SCORE_FIELD.fieldApiName, type: 'percentage'},
    {label: 'Total Correct', fieldName: TOTAL_CORRECT_FIELD.fieldApiName, type: 'number'},
    {label: 'Total Answers', fieldName: TOTAL_ANSWERS_FIELD.fieldApiName, type: 'number'}
];
export default class ExamListLWC extends LightningElement {
    columns = COLUMNS;
    cohort = '';
    @wire(ExamList, {cohort : '$cohort'})
    examList;
}
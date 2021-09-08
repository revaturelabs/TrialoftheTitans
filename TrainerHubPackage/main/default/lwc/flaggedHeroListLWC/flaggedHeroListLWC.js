import { LightningElement, wire, track } from 'lwc';
import HERO_FIELD from '@salesforce/schema/Hero_Assessment__c.Hero__r.Name';
import QC_FLAG_NAME_FIELD from '@salesforce/schema/QC_Flag__c.Account__r.Name';
import QC_WEEK_FIELD from '@salesforce/schema/QC_Flag__c.QC_Interview__r.Week__c';
import QC_SCORE_FIELD from '@salesforce/schema/QC_Flag__c.QC_Interview__r.QC_Score__c';
import QC_TYPE_FIELD from '@salesforce/schema/QC_Flag__c.Type__c';
import DESCRIPTION_FIELD from '@salesforce/schema/QC_Flag__c.Description__c';
import HeroList from '@salesforce/apex/FlaggedHeroController.HeroList';
const COLUMNS = [
    {label: 'Hero', fieldName: HERO_FIELD.fieldApiName, type: 'text', initialWidth: 75},
    {label: 'QC Flag Name', fieldName: QC_FLAG_NAME_FIELD.fieldApiName, type: 'text', initialWidth: 130},
    {label: 'QC Week', fieldName: QC_WEEK_FIELD.fieldApiName, type: 'text', initialWidth: 100},
    {label: 'QC Score', fieldName: QC_SCORE_FIELD.fieldApiName, type: 'text', initialWidth: 100},
    {label: 'Type', fieldName: QC_TYPE_FIELD.fieldApiName, type: 'text', initialWidth: 150},
    {label: 'Description', fieldName: DESCRIPTION_FIELD.fieldApiName, type: 'text', initialWidth: 700}
];
export default class FlaggedHeroListLWC extends LightningElement {
    cohort ='';
    columns = COLUMNS;
    @track heroList=[];
    @wire(HeroList, {cohort : '$cohort'})
    HeroList(error, data){
        if(data){
            for(let i=0; i<data.length;i++){
                if(data[i].Account__c==null){
                    data[i].hero = "No Hero";
                }else{
                    data[i].hero = data[i].Account__r.Name;
                }
            }
            for(let i=0; i<data.length;i++){
                if(data[i].QC_Interview__c==null){
                    data[i].week = "No QC Interview";
                }else{
                    data[i].week = data[i].QC_Interview__r.Week__c;
                }
            }
            for(let i=0; i<data.length;i++){
                if(data[i].QC_Interview__c==null){
                    data[i].score = "No QC Interview";
                }else{
                    data[i].score = data[i].QC_Interview__r.QC_Score__c;
                }
            }  
            this.heroList = data;
        }

    }
}
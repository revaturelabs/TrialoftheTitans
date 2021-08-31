import { api, LightningElement } from 'lwc';

export default class QcInterviewQALightning extends LightningElement {
    @api CohortId;
    @api Hero;
    @api CurrentInterview;
    @api Week;
    @api HeroScore;
    @api IncomingDeckList;
    @api QuestionIndex = -1;
    @api QuestionDeck;
    @api QuestionSet;
    @api CurrentQuestion ={'sObjectType' : 'QC_Question__c','Name' : 'Default Question','Question__c' : ''};
    @api HeroAnswer = {'sObjectType' : 'QC_Question_Answer__c','Question__c' : '','Score__c' : '','Answer__c' : ''};
    
    PlusClick(){
        this.HeroAnswer.Score__c = this.HeroAnswer.Score__c + 1;
    }
    
    MinusClick(){
        if(this.HeroAnswer.Score__c > 0){
            this.HeroAnswer.Score__c = this.HeroAnswer.Score__c - 1;
        }
    }

    FinishInterview(){
        this.dispatchEvent(new CustomEvent('UpdateStageEvent',{'StageName' : 'End'}));
    }

    SaveAndNext(){
        this.dispatchEvent(new CustomEvent('UpdateQAListEvent',{'QA' : this.HeroAnswer}));
        this.HeroAnswer.Score__c = 0;
        this.HeroAnswer.Answer__c = null;
        this.QuestionIndex = this.QuestionIndex + 1;
        this.HeroAnswer.Question__c = this.QuestionDeck[this.QuestionIndex][0].Question_Body__c;
    }
}
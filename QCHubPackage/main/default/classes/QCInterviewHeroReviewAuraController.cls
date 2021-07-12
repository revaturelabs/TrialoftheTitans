/////////////////////////////////////////////////////
//
//  Name: QCInterviewHeroReviewAuraController
//  Author: Natalie Clark
//  Description: Apex controller for aura component QCInterviewHeroReview
//
///////////////////////////////////////////////////

public with sharing class QCInterviewHeroReviewAuraController {

        //init to load score for hero in order to finalize in aura component
        @AuraEnabled
        public static QC_Interview__c getInterview(Cohort__c cohort, Account hero){
                String id = cohort.id;
                String id2 = hero.id;
                List<QC_Interview__c> qci = [SELECT Name, Cohort__r.Name, Account__r.Squad__r.Name, Finalized__c, Account__r.Name, QC_Score__c 
                                            FROM QC_Interview__c
                                            WHERE Finalized__c!=true AND Cohort__c=:id AND Account__c=:id2
                                            LIMIT 1];
                return qci[0];
        }
    
        // inserts flags created by aura component
        @AuraEnabled
        public static void setFlags(List<QC_Flag__c> flags){
                insert flags;
        }
    
        //finalizes interview and upserts to update checkbox value
        @AuraEnabled
        public static void setInterview(QC_Interview__c interview){
                interview.Finalized__c = true;
                upsert interview;
        }
    
        //Creates a new QC_Interview__c with the interview's data and associates it's ID with 
        @AuraEnabled
        public static String UploadInterviewData( Id cohortId, Id heroId, String heroName, String week, 
                                                    List<String> qaStrList,
                                                    List<String> qaStrFlags, String fname, String fdesc, String ftype){
    
            System.debug('IN APEX');
            System.debug(qaStrList);
            System.debug(qaStrFlags);
    
            QC_Interview__c newInterview = new QC_Interview__c(Name=heroName+' '+week, Cohort__c=cohortId, Week__c=week,
                                                                    Account__c=heroId);
            insert newInterview;
    
            System.debug('INTERVIEW INSERTED');
    
            List<QC_Question_Answer__c> qaList = new List<QC_Question_Answer__c>();
    
            for (String qaStr : qaStrList){
                    QC_Question_Answer__c newQA = (QC_Question_Answer__c) JSON.deserialize(qaStr, QC_Question_Answer__c.class);
                    System.debug(newQA);
                    newQA.QC_Interview__c = newInterview.Id;
                    qaList.add(newQA);
            }
    
            System.debug('ANSWERS CONVERTED');
            insert qaList;
    
            List<QC_Flag__c> fList = new List<QC_Flag__c>();
            QC_Flag__c newFlag = new QC_Flag__c(
                    Name = fname,
                Description__c = fdesc,
                Type__c = ftype,
                QC_Interview__c = newInterview.Id,
                Account__c = heroId
            );                                          
            fList.add(newFlag);                                            
    /*
            for (String qf : qaStrFlags){
    
                    QC_Flag__c newF = (QC_Flag__c) JSON.deserialize(qf, QC_Flag__c.class);
                    newF.QC_Interview__c = newInterview.Id;
                    fList.add(newF);
            }
    */
            System.debug('FLAGS CONVERTED');
            insert fList;
    
            return newInterview.Id;
        }
    
    }
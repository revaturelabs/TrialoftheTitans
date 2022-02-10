/////////////////////////////////////////////////////////////////////////////////
//
// Name: titanDisplayController
// Author(s): Matthew Lewandowski, Todd Gooch
// Created: 01/13/2022
// Updated: 01/25/2022
// Description: This is all the methods that retrieve the data required for the titan display bar
//
/////////////////////////////////////////////////////////////////////////////////

public with sharing class titanDisplayController {

    @AuraEnabled
    public static Map<Id, List<Titan__c>> getTitanDependencies(){
        List<Titan__c> titans = [SELECT Name, Technology__c, Curriculum__c, First_Exam__c, Number_of_Skills__c, Required_Titan__c FROM Titan__c];

        Map<Id, List<Titan__c>> dependentMap = new Map<Id, List<Titan__c>>();

        for(Titan__c titan: titans) {
            List<Titan__c> dependents = [SELECT Name, Required_Titan__c
                                         FROM Titan__c
                                         WHERE Required_Titan__c =: titan.Id];
            
            dependentMap.put(titan.Id, dependents);
        }
        return dependentMap;
    }

    //This will only work when an Experience cloud user is logged in (when displaying this component in Experience cloud).
    @AuraEnabled
    public static Account getCurrentUser(){
        User user = [SELECT Id, contactId FROM User WHERE Id = :UserInfo.getUserId()];
        Contact contact = [SELECT Id, AccountId FROM Contact WHERE Id = :user.contactId];
        Account userAccount = [SELECT Id, Name, Squad__c, Team__c, Cohort__c, Curriculum__c FROM Account WHERE Id = :contact.AccountId];
        return userAccount;
    }

    @AuraEnabled
    public static List<Titan__c> getTitanById(String identifier) {
        return [SELECT Id, Name, Technology__c, Curriculum__c, First_Exam__c, Number_of_Skills__c, Required_Titan__c 
                FROM Titan__c 
                WHERE Id =: identifier
                LIMIT 1];
    }

    @AuraEnabled
    public static List<Exam_Result__c> getUserExams(String titanId, String userId){
        List<Exam_Result__c> results = [SELECT Id, Account__c, Exam__c, Pass__c FROM Exam_Result__c 
                                        WHERE Pass__c = true AND Exam__r.Titan__c =: titanId];
        return results;
    }

    @AuraEnabled
    public static Integer getNumberOfTitanExams(String titanId){
        Integer exams = [SELECT COUNT() FROM Exam__c WHERE Titan__c =: titanId];
        return exams;
    }
}

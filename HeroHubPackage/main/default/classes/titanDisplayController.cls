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

    public static List<Exam_Result__c> orderExamResults(List<Exam_Result__c> results) {
        List<List<Exam_Result__c>> auxList = new List<List<Exam_Result__c>>();

        while(results.size() > 0) {

            if(results.size() == 1) {
                List<Exam_Result__c> orderedResults = new List<Exam_Result__c>();
                orderedResults.add(results[0]);
                auxList.add(orderedResults);
                System.debug(auxList);
                break;
            }

            System.debug(auxList);
            
            Boolean found = false;
            for(Integer index = 0; index < results.size(); index++) {
                for(Integer nextIndex = 0; nextIndex < results.size(); nextIndex++) {
                    if(results[index].Exam__r.Next_Exam__c == results[nextIndex].Exam__c ) {

                        List<Exam_Result__c> orderedResults = new List<Exam_Result__c>();
                        orderedResults.add(results[index]);
                        orderedResults.add(results[nextIndex]);
                        auxList.add(orderedResults);

                        if(nextIndex > index) {
                            results.remove(nextIndex);
                            results.remove(index);
                        }
                        else {
                            results.remove(index);
                            results.remove(nextIndex);
                        }

                        found = true;
                        break;
        
                    }
                }
                if(found)
                    break;

            }
            
        }

        while(auxList.size() > 1) {

            Boolean found = false;
            for(Integer index = 0; index < auxList.size(); index++) {
                for(Integer nextIndex = 0; nextIndex < auxList.size(); nextIndex++) {
                    if(auxList[index][auxList[index].size()-1].Exam__r.Next_Exam__c == auxList[nextIndex][0].Exam__c ) {

                        for(Exam_Result__c examResult : auxList[nextIndex])
                            auxList[index].add(examResult);

                        auxList.remove(nextIndex);

                        found = true;
                        break;
        
                    }
                }
                if(found)
                    break;

            }

        }

        System.debug(auxList);
        return auxList[0];
    }

    @AuraEnabled
    public static Id getUserNextExam(String titanId, String userId){
        List<Exam_Result__c> results = [SELECT Id, Account__c, Exam__c, Exam__r.Next_Exam__c, Pass__c FROM Exam_Result__c 
                                        WHERE Pass__c = true AND Exam__r.Titan__c =: titanId AND Account__c = :userId];

        List<Exam_Result__c> orderedExamResults = titanDisplayController.orderExamResults(results);
        
        System.debug(orderedExamResults[orderedExamResults.size()-1].Exam__r.Next_Exam__c);
        return orderedExamResults[orderedExamResults.size()-1].Exam__r.Next_Exam__c;
    }
}

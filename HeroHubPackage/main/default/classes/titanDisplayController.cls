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
        // Contains list of semi ordered lists
        List<List<Exam_Result__c>> auxList = new List<List<Exam_Result__c>>();

        // Creates lists with semi ordered exam-results.
        while(results.size() > 0) {

            // When the original list ends up with 1 exam result only, we create another sub-list and add that exam result.
            // Then the while loop breaks.
            if(results.size() == 1) {
                List<Exam_Result__c> orderedResults = new List<Exam_Result__c>();
                orderedResults.add(results[0]);
                auxList.add(orderedResults);
                System.debug(auxList);
                break;
            }

            System.debug(auxList);
            
            Boolean found = false;
            // Loops through results. If we find a exam results object which Next_Exam__c matches Exam__c we create a sub-list with those
            // 2 exam results. Then we remove them from the original list and loop through and we keep creating sub-lists of 2 exam results
            // until the original list's ends up with only 1 exam result.
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

        // Loops through until we get a single list with the ordered exam_results
        while(auxList.size() > 1) {

            // Loops through the list of semi ordered lists. When the Next_Exam__c of the last item of 1 list matches the Exam__c of another
            // list, we combine those 2 list and delete 1 of those lists. We keep looping until we delete all sub-lists and we end up with
            // the ordered lits.
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
        // We return the Next_Exam__c of the last element of the ordered Exam_Results list which represent the next Exam__c the
        // hero needs to take.
        return orderedExamResults[orderedExamResults.size()-1].Exam__r.Next_Exam__c;
    }
}

/////////////////////////////////////////////////////
//
//  Name: AssignProjectController.cls
//  Author: Jonathan Neilan
//  Description: Initial loading of Accounts (for individual heroes) and Cohorts.
//               On Submit button clicked, assign the Project to all chosen Accounts or Cohorts.
//
///////////////////////////////////////////////////
public with sharing class AssignProjectController {
    
    @AuraEnabled
    public static List<Account> getAccounts(){
        try {
            List<Account> listAccs = [SELECT Id,Name FROM Account];
            return listAccs;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }
    
    @AuraEnabled
    public static List<Cohort__c> getCohorts(){
        try {
            List<Cohort__c> listCohs = [SELECT Id,Name FROM Cohort__c];
            return listCohs;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }
    
    @AuraEnabled
    public static void assignProject(String grouping, String[] namesToAssign, String projectIdToAssign){
            Project__c p = [SELECT Id FROM Project__c WHERE Id=:projectIdToAssign];
            if (grouping == 'individual') {
                Account[] accs = [SELECT Name,Project__c FROM Account WHERE Name IN :namesToAssign];
                Account[] accsToUpdate = new Account[] {};
                for (Account a : accs) {
                    a.Project__c = p.Id;
                    accsToUpdate.add(a);
                }
                try{
                update accsToUpdate;
            } catch(Exception e){
                throw new AuraHandledException(e.getMessage());
            }
        }
            else if (grouping == 'cohort') {
                Cohort__c[] cohs = [SELECT Name,Project__c FROM Cohort__c WHERE Name IN :namesToAssign];
                Cohort__c[] cohsToUpdate = new Cohort__c[] {};
                for (Cohort__c c : cohs) {
                    c.Project__c = p.Id;
                    cohsToUpdate.add(c);
                }
                try{
                    update cohsToUpdate;
                }catch(Exception e){
                    throw new AuraHandledException(e.getMessage());
                }
            }
            else {
                //error
            }
        } 
    }


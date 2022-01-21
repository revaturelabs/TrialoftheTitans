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
            
            if (grouping == 'individual') {
                List <Account> accs = [SELECT Id, Name FROM Account WHERE Name IN :namesToAssign];
                List <Project_Review__c> proRev = new List <Project_Review__c>();
                for (Integer i = 0; i < accs.size(); i++) {
                    Project_Review__c p = new Project_Review__c(Name = accs[i].name + ' Project Assignment');
                    p.Project__c = projectIdToAssign;
                    p.Account__c = accs[i].Id;
                    proRev.add(p);
                }
                try{
                update proRev;
            } catch(Exception e){
                throw new AuraHandledException(e.getMessage());
            }
        }
            else if (grouping == 'cohort') {
                List <Cohort__c> cohs = [SELECT Name,Id FROM Cohort__c WHERE Name IN :namesToAssign];
                List <Project_Review__c> proRev = new List <Project_Review__c>();
                for (Integer i = 0; i < cohs.size(); i++) {
                    Project_Review__c p = new Project_Review__c(Name = cohs[i].name + ' Project Assignment');
                    p.Project__c = projectIdToAssign;
                    p.Account__c = cohs[i].Id;
                    proRev.add(p);
                }
                try{
                    update proRev;
                }catch(Exception e){
                    throw new AuraHandledException(e.getMessage());
                }
            }
            else {
                //error
            }
        } 
    }
//Chris Pavur
// public with sharing class ResponsibilitiesController {
//    @AuraEnabled(cacheable=true)
 //  public static List<Account> getSomeAccounts(){
   //   List<Account> responsibilitiesList = new List<Account>();
   //   responsibilitiesList = [SELECT id, name, type, phone, industry FROM Account LIMIT 10];
   //   return responsibilitiesList;
 //public static List<Titan__c> getSomeAccounts(){
   //   List<Titan__c> responsibilitiesList = new List<Titan__c>();
    //  responsibilitiesList = [SELECT  id, Name FROM Titan__c LIMIT 8];
    //  return responsibilitiesList;
  //  }
//}
   //method that returns a list of all responsibilities related to a project
   public with sharing class ResponsibilitiesController{
     
    @AuraEnabled (cacheable=true) 
    public static List<Responsibility__c> getResponsibilities(String projectID){
        String pid = projectID;
        
        //query to get ALL projects related to the logged in user
        List<Responsibility__c> responsibilityList = [
            SELECT Description__c, Project__r.Id 
            FROM Responsibility__c 
        ];
 
 
        System.debug('finished getting the responsibilities list' + responsibilityList.size());
        //List<Responsibility__c> retList = new List<Responsibility__c>();
        
       //  for(Responsibility__c r : responsibilityList){
       //      if(r.Project__r.Id == pid){
       //          retList.add(r);
       //      }
       //  }
        return responsibilityList;
    }
   }
 
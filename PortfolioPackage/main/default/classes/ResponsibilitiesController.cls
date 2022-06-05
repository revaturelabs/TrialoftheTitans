public without sharing class ResponsibilitiesController{

  //method that returns a list of all responsibilities related to a project
  @AuraEnabled (cacheable=true) 
  public static List<Responsibility__c> getResponsibilities(Id projectID) {
    //query to get ALL responsibilities related to the logged in user
    return [SELECT Description__c FROM Responsibility__c
            WHERE Project__r.Id = :projectId];
  }
}
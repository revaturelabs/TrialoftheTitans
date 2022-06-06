public without sharing class ResponsibilitiesController{

  //method that returns a list of all responsibilities related to a project
  @AuraEnabled (cacheable=true) 
  public static List<Responsibility__c> getResponsibilities(Id projectID) {
    //query to get ALL responsibilities related to the logged in user
    return [SELECT Id, Description__c, Project__r.Role__c FROM Responsibility__c
            WHERE Project__r.Id = :projectId];
  }

  @AuraEnabled (cacheable=true) 
  public static Map<String, List<Responsibility__c>> getResponsibilitySkill(ID projectID) {
    List<Skill_Responsibility__c> resSkills =  [SELECT Name, Skill__r.name, Responsibility__r.id 
                                                          FROM Skill_Responsibility__c 
                                                          WHERE Responsibility__r.Project__r.Id= :projectId];
      
      List<Responsibility__c> resList = getResponsibilities(projectId);

      Map<String, List<Responsibility__c>> skillMap = new Map<String, List<Responsibility__c>>();

      for(Skill_Responsibility__c item : resSkills){
          
          String skillName = item.Skill__r.name;
          Responsibility__c rAbilityObj;

          for(Responsibility__c resItem : resList){
              if(resItem.Id == item.Responsibility__r.Id){
                rAbilityObj = resItem;
                break;
              }
          }

          if(!skillMap.containsKey(skillName)){
            skillMap.put(skillName, new List<Responsibility__c>());
              
          }
          skillMap.get(skillName).add(rAbilityObj);
      }

      return skillMap;
  }

  // @AuraEnabled(cacheable=true)
  // public static Map<String, List<Responsibility__c>> getResponsibilitySkill(ID projectId) {
  //     List<Skill_Responsibility__c> resSkills =  [SELECT Name, Skill__r.name, Responsibility__r.id 
  //                                                         FROM Skill_Responsibility__c 
  //                                                         WHERE Responsibility__r.Project__r.Id= :projectId];
      
  //     List<Responsibility__c> resList = getResponsibilities(projectId);

  //     Map<String, List<Responsibility__c>> skillMap = new Map<String, List<Responsibility__c>>();

  //     for(Skill_Responsibility__c item : resSkills){
          
  //         String skillName = item.Skill__r.name;
  //         Responsibility__c rAbilityObj;

  //         for(Responsibility__c resItem : resList){
  //             if(resItem.Id == item.Responsibility__r.id){
  //               rAbilityObj = resItem;
  //               break;
  //             }
  //         }

  //         if(!skillMap.containsKey(skillName)){
  //           skillMap.put(skillName, new List<Responsibility__c>());
              
  //         }
  //         skillMap.get(skillName).add(rAbilityObj);
  //     }

  //     return skillMap;
  // }
}
/* Authors: Adam Baird, Timothy Hinga, Alberto Vergara, Austin McElrone
   Date: 5/18/22
   Description: Controller for d3DonutChart, skillsList, assignmentCard and masteriesTab LWC's
*/
public without sharing class AssignmentController {

    @AuraEnabled(cacheable=true)
    public static String getTitanName(String skill) {
        return [SELECT Titan__r.Name FROM Skill__c WHERE name =: skill][0].Titan__r.Name;
    }

    //Returns all of the completed assignments associated with the currently logged in User's Account, for the given skill
    @AuraEnabled(cacheable=true)
    public static List<Completed_Assignment__c> getCompletedAssignmentsBySkill(String skill) {
        Id uid = UserInfo.getUserId();
        User user = [SELECT Id, contactId FROM User WHERE Id = :uid];
        Contact userCon = [SELECT Id, AccountId FROM Contact WHERE Id = :user.ContactId];
        Account userAcc = [SELECT Id FROM Account WHERE Id = :userCon.AccountId];
        return [SELECT Name, Date_Completed__c, Description__c, Assignment_Type__c FROM Completed_Assignment__c WHERE Account__r.Id =: userAcc.id AND Skill__r.Name =: skill];
    }

    //Returns a skills map of the skills needed for the donut chart
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getCompletedAssignmentsSkillMap() {
        Id uid = UserInfo.getUserId();
        User user = [SELECT Id, contactId FROM User WHERE Id = :uid];
        Contact userCon = [SELECT Id, AccountId FROM Contact WHERE Id = :user.ContactId];
        Account userAcc = [SELECT Id FROM Account WHERE Id = :userCon.AccountId];
        List<Completed_Assignment__c> assignments = [SELECT Skill__r.Name FROM Completed_Assignment__c WHERE Account__r.Id =: userAcc.id];
        Map<String, Integer> skills = new Map<String, Integer>();

        for (Completed_Assignment__c ass : assignments) {
            if (skills.containsKey(ass.Skill__r.Name)) {
                skills.put(ass.Skill__r.Name, skills.get(ass.Skill__r.Name) + 1);
            }
            else {
                skills.put(ass.Skill__r.Name, 1);
            }
        }
        System.debug(skills);
        return skills;


    }

}
public without sharing class UserStoryController {
    @AuraEnabled(cacheable=true)
    public static List<User_Story__c> getUserStories(ID projectId) {
        return [SELECT Name, Description__c, Github__c, Wireframe__c, Video__c 
                FROM User_Story__c WHERE Project__r.Id = :projectId];
    }

    @AuraEnabled(cacheable=true)
    public static Project__c getProjectInfo(ID titanId){
       return [SELECT Name, Id FROM Project__c WHERE Titan__r.Id = :titanId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getProjectSkill(ID projectId) {
        List<User_Story_Skill_Junction__c> storySkills =  [SELECT Name, Custom_Skill__r.name, User_Story__r.name 
                                                           FROM User_Story_Skill_Junction__c 
                                                           WHERE User_Story__r.Project__r.Id= :projectId];

        Map<String, List<String>> skillMap = new Map<String, List<String>>();

        for(User_Story_Skill_Junction__c item : storySkills){
            
            String skillName = item.Custom_Skill__r.name;
            String storyName = item.User_Story__r.name;

            //System.debug(skillName + ' ' + storyName);

            if(!skillMap.containsKey(skillName)){
                skillMap.put(skillName, new List<String>());
                
            }
            skillMap.get(skillName).add(storyName);
        }
    
        //System.debug(skillMap);

        return skillMap;
    }
}
public class getDataForDonut {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getDonutData() {

        List<Skill__c> skillsData = [SELECT Name FROM Skill__c LIMIT 10];
        List<String> names = new List<String>();

        for(Skill__c skill : skillsData) {
            names.add(skill.Name);
        }

        return names;
    }

}
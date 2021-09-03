public class dynamicRowAuraController {
	@AuraEnabled
    public static void saveEquivalency(List<Equivalency__c> equivList){
        Insert equivList;
    }

    @AuraEnabled
    public static List<Equivalency__c> retrieveCurrentEquivalencies(String projectId){
       final List<Equivalency__c> equivalencyList = [SELECT Skill__r.Name, Skill_Equivalency__c FROM Equivalency__c WHERE Project__c =: projectId];
       return equivalencyList;
    }
}
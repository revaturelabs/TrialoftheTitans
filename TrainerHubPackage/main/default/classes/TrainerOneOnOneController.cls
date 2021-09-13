public class TrainerOneOnOneController {
    @AuraEnabled
    public static List<One_on_One__c> getOneOnOneId(String trainerId, String week, String cohortId){
        List<One_on_One__c> oneList = [SELECT Id, Hero__r.Name FROM One_on_One__c WHERE Trainer__c = :trainerId AND Week__c = :week AND Hero__r.Cohort__c = :cohortId];
        return oneList;
    }
}


public class TrainerOneOnOneController {
    @AuraEnabled
    public static string getOneOnOneId(String trainerId){
        try {
        One_on_One__c one = [SELECT Id FROM One_on_One__c WHERE Trainer__c = : trainerId];
        return one.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

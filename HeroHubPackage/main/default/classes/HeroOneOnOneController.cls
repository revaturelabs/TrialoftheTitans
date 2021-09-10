public class HeroOneOnOneController {
    @AuraEnabled
    public static One_on_One__c getOneOnOneId(String heroId, String week){
        One_on_One__c one = [SELECT Id FROM One_on_One__c WHERE Hero__r.Hero__c = :heroId AND Week__c = :week LIMIT 1];
        return one;
    }
}

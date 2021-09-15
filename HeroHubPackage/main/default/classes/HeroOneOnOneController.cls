public class HeroOneOnOneController {
    @AuraEnabled
    public static One_on_One__c getOneOnOneId(String heroId, String week){
        User Hero = [SELECT AccountId FROM User WHERE Id =:heroId LIMIT 1];
        One_on_One__c one = [SELECT Id FROM One_on_One__c WHERE Hero__c =: Hero.AccountId AND Week__c = :week LIMIT 1];
        return one;
    }
}

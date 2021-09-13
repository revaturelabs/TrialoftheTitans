public class HeroOneOnOneController {
    @AuraEnabled
    public static One_on_One__c getOneOnOneId(String heroId, String week){
        User Hero = [SELECT AccountId FROM User WHERE Id = :heroId LIMIT 1];
        One_on_One__c oneOnOne = [SELECT Id FROM One_on_One__c WHERE Heroc = :Hero.AccountId AND Week__c = :week LIMIT 1];
        return oneOnOne;
    }
}

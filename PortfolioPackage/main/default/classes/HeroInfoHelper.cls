/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

public with sharing class HeroInfoHelper {

    /**
     * Returns info for the currently logged in Hero (User)
     */
    @AuraEnabled(cacheable=true)
    public static User getHeroInfo() {
        return [SELECT Name,User__r.MediumPhotoUrl,User__r.Name FROM Job__c][0];
    }
}

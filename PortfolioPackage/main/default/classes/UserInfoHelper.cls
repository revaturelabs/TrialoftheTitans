/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

public with sharing class UserInfoHelper {

    /**
     * Returns info for the currently logged in Hero (User)
     * 
     *      Profile image url, Name, and various data from relevant relationships
     */
    @AuraEnabled(cacheable=true)
    public static User getBasicUserInfo() {
        return [SELECT Id,Name,FullPhotoUrl,Contact.Title FROM User];
    }
}

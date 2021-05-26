/////////////////////////////////////////////////////
//
//  Name: HeroHubController
//  Author: Josh Miccolo
//  Created: 5/23/2021
//  Updated: 5/25/2021
//  Description: Hero Hub Main Page Component Controller
//  sends User context, and team scores.
//  
//
///////////////////////////////////////////////////
public with sharing class HeroHubController {
    
    @AuraEnabled
    // Used to return userInfo to component
    public static UserContextInfo getUserInfo(){
        try {
            
            //user will become userContextInfo in js Controller; 
            //UserContextInfo class builds the javascript object necessary for parsing
            UserContextInfo user = new UserContextInfo(UserInfo.getUserId());
            
            return user; 

        } catch ( Exception e ) {

            system.debug(e);
            throw new AuraHandledException(e.getMessage());
        
        }
    }
    
}
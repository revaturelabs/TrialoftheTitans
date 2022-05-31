public with sharing class EmployerPartnerExperienceSiteHelper {
    @AuraEnabled(cacheable=true)

    public static List<String> getHeroInfo(){
        //BEFORE THIS IS WHERE WE DEFINE OUR SEARCH PARAMETERS 
        List<Account> AccountInfo= new List<Account>();

        //Get our account info
        if(true){
           AccountInfo=[SELECT Curriculum__r.Technology__c, (SELECT Name, Title, MailingCity FROM Contacts) FROM Account WHERE Id IN (SELECT AccountId FROM Contact)];
        }
        else{
             AccountInfo= [SELECT Curriculum__r.Technology__c, (SELECT Name, Title, MailingCity FROM Contacts) FROM Account WHERE Id IN (SELECT AccountId FROM Contact)];
        }
        //We want to get a list of users with hero profile so this grabs allusers who meet that requirement
        List<Contact> myContacts= new List<Contact>();
        for (Account acc : AccountInfo) {
            myContacts.addAll(acc.Contacts);
        }

        List<User> UserInfo= [SELECT ID, Contact.Id FROM User WHERE Profile.Name= 'Hero' AND ContactId IN :myContacts];

        List<String> listOfHeroes = new List<String>();
        for (User u : UserInfo) {
            
        
            for (Account acc : AccountInfo) {
            
            List<Contact> contacts = acc.Contacts;
            /**
            For all users that have a hero
            Create a map  that is converted to a list of JSON string with all values we need
            */
            for (Contact con : contacts) {
                if (u.ContactId==con.Id){
                    Map<String, String> heroMap = new Map<String, String>();
                    heroMap.put('Id',u.Id);
                    heroMap.put('Link','');//Need to get this from portfolio somehow
                    heroMap.put('Name', con.Name);
                    heroMap.put('Title', con.Title);
                    heroMap.put('Location', con.MailingCity);
                    heroMap.put('Technology', acc.Curriculum__r.Technology__c);
                    heroMap.put('Favorite', 'Favorite');
                    heroMap.put('Arete', '56');//NO IMPLEMENTAION
                    listOfHeroes.add(JSON.Serialize(heroMap));
                }
            }
            
            }
        }

        return listOfHeroes;
    }
}
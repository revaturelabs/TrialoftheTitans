public with sharing class EmployerPartnerExperienceSiteHelper {
    @AuraEnabled(cacheable=true)

    public static List<String> getHeroInfo(){
        //BEFORE THIS IS WHERE WE DEFINE OUR SEARCH PARAMETERS 
        List<Account> AccountInfo= new List<Account>();
        if(true){
           AccountInfo=[SELECT Curriculum__r.Technology__c, (SELECT Name, Title, MailingCity FROM Contacts) FROM Account WHERE Id IN (SELECT AccountId FROM Contact)];
        }
        else{
             AccountInfo= [SELECT Curriculum__r.Technology__c, (SELECT Name, Title, MailingCity FROM Contacts) FROM Account WHERE Id IN (SELECT AccountId FROM Contact)];
        }
        
        List<String> listOfHeroes = new List<String>();
        for (Account acc : AccountInfo) {
            
            List<Contact> contacts = acc.Contacts;
            for (Contact con : contacts) {
                Map<String, String> heroMap = new Map<String, String>();
                heroMap.put('Id',acc.Id);
                heroMap.put('Link','Dummy Link');
                heroMap.put('Name', con.Name);
                heroMap.put('Title', con.Title);
                heroMap.put('Location', con.MailingCity);
                heroMap.put('Technology', acc.Curriculum__r.Technology__c);
                heroMap.put('Favorite', 'Favorite');
                heroMap.put('Arete', '56');
                listOfHeroes.add(JSON.Serialize(heroMap));
            }
            
        }

        return listOfHeroes;
    }
}
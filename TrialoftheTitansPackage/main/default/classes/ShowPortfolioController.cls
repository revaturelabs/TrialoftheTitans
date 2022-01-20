public with sharing class ShowPortfolioController {
    
    @AuraEnabled
    public static List<String> GetUserList() {

        List<User> AllUsers = [SELECT Name FROM User];
        List<String> AllStringUsers = new List<String>();
        for(User Users: AllUsers){
            AllStringUsers.add(Users.Name);
        }
        return AllStringUsers;
    }
    @AuraEnabled
    public static List<Equivalency__c> EquivGet(String Hero){
        
        

        List<User> HeroIdList = [SELECT Id, Name FROM User WHERE Name =: Hero LIMIT 1];
        

        
        List<Equivalency__c> Equiv = [SELECT Name,Skill_Equivalency__c, Id FROM Equivalency__c WHERE User__c=:HeroIdList[0].Id];

        return Equiv;
  
    }
    @AuraEnabled
    public static List<Project__c> ProjectGet(String Hero){

        List<User> HeroIdList = [SELECT Id FROM User Where Name =: Hero LIMIT 1];

        List<Project__C> Proj = [SELECT Name, Description__c, Roles_Responsibilities__c, Technologies__c FROM Project__c  WHERE User__c=:HeroIdList[0].Id];
        
        for(Project__c P : Proj){
            P.Description__c = P.Description__c.replaceAll('<[/a-zAZ0-9]*>','');
            P.Roles_Responsibilities__c = P.Roles_Responsibilities__c.replaceAll('<[/a-zAZ0-9]*>','');
            P.Technologies__c = P.Technologies__c.replaceAll('<[/a-zAZ0-9]*>','');
            
        }                                                                                             
                                                                                                        
                                                                                                        
        return Proj;

    }
    @AuraEnabled
    public static List<Education__c> EducationGet(String Hero){

        List<User> HeroIdList = [SELECT Id FROM User Where Name =: Hero LIMIT 1];

        List<Education__C> Ed = [SELECT Name, Major__c, Degree__c, DateGraduate__c FROM Education__c WHERE User__c=:HeroIdList[0].Id];
                                                                                                    
        return Ed;

    }
    @AuraEnabled
    public static List<Certification__c> CertGet(String Hero){

        List<User> HeroIdList = [SELECT Id FROM User Where Name =: Hero LIMIT 1];

        List<Certification__c> Cd = [SELECT Name, Assessor__c, Verification_Site__c, Date_Issued__c FROM Certification__c WHERE User__c=:HeroIdList[0].Id];
                                                                                                    
        return Cd;

    }
    @AuraEnabled
    public static List<Experience__c> ExpGet(String Hero){

        List<User> HeroIdList = [SELECT Id FROM User Where Name =: Hero LIMIT 1];

        List<Experience__c> Exp = [SELECT Position__c,Company__c,Start_Date__c,End_Date__c FROM Experience__c WHERE User__c=:HeroIdList[0].Id];
                                                                                                    
        return Exp;

    }
}
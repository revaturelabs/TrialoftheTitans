public with sharing class portfolioHelper {
    /* I got rid of the hard-coded ID for this method, but this method 
    is not returning or changing anything, and a grep tells me it's not being
    used anywhere. Just leaving it here in case future iterations find a use for it. */
    public static void getSkillMatrix(){
    	Id uid = UserInfo.getUserId();
        
		List<Category__c> skills = [SELECT ID, (SELECT Name FROM Custom_Skills__r)
                                    FROM Category__c];
        
        List<String> skillNames = new List<String>{};                          
        for(Category__c req :skills){
            for(Custom_Skill__c a : req.Custom_Skills__r){               
                skillNames.add(a.Name);
            }
        }        
    }
    
    public static void getEduc(){
        Id uid = UserInfo.getUserId();
        List<Education__c> education = 
            [SELECT Degree__c, DateGraduate__c, Gpa__c, Major__c 
             FROM Education__c
             WHERE User__c = :uid];
        
        List<Map<String,String>> educationMap = new List<Map<String,String>>();
        for(Education__c e : education) {
            educationMap.add(new Map<String, String>{'Degree' => e.Degree__c, 'Major' => e.Major__c, 'GPA' => String.valueof(e.Gpa__c),'Date Graduated' => String.valueof(e.DateGraduate__c)});            
        }
    }
    
    
    public static List<Equivalency__c> getEq(){
        id uid = UserInfo.getUserId();
        
     	List<Equivalency__c> strengths = 
            [SELECT Name, Skill_Equivalency__c 
             FROM Equivalency__c
             WHERE User__c = :uid ORDER BY Skill_Equivalency__c DESC LIMIT 5];
        
        List<Map<String,String>> strengthsMap = new List<Map<String,String>>();
        for(Equivalency__c e : strengths) {
            strengthsMap.add(new Map<String, String>{'EquivalencyName' => e.Name, 'EquivalencyNum' => String.valueof(e.Skill_Equivalency__c)});            
        }        

        return strengths;
    }
}

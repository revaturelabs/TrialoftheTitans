public with sharing class portfolioHelper {
    public portfolioHelper() {

    }
    public static void getSkillMatrix(){
    	id uid = '0058c00000BOwWJAA1';
        
		List<SM_Category__c> skills = [
            SELECT Name,
            (SELECT Name FROM SM_Skills__r)
            FROM SM_Category__c
        ];
        System.debug(skills);
        
        for(SM_Category__c req :skills){
            List<String> skillNames = new List<String>{};
                for(SM_Skill__c a : req.SM_Skills__r){               
                    skillNames.add(a.Name);
                }
            System.debug(skillNames);
        }
        /*
        for(SM_Category__c obA: [select Name, (select Name from SM_Skills__r) from SM_Category__c]){
            System.debug(oba);
            System.debug(oba.SM_Skills__r);
            For(SM_Skill__c b : oba.SM_Skills__r){
                System.debug(b);
                System.debug(b.Name);

            }
                        
		}
		*/
        
    }
    
    public static void getEduc(){
        id uid = '0058c00000BOwWJAA1';
        List<Education__c> education = 
            [SELECT Degree__c, DateGraduate__c, Gpa__c, Major__c 
             FROM Education__c
             WHERE User__c = :uid];
        System.debug(education);
        
        List<Map<String,String>> educationMap = new List<Map<String,String>>();
        for(Education__c e : education) {
            educationMap.add(new Map<String, String>{'Degree' => e.Degree__c, 'Major' => e.Major__c, 'GPA' => String.valueof(e.Gpa__c),'Date Graduated' => String.valueof(e.DateGraduate__c)});            
        }
        System.debug(educationMap);
    }
    
    
    public static void getEq(){
        //id uid = UserInfo.getUserId();
        id uid = '0058c00000BOwWJAA1';
     	List<Equivalency__c> strengths = 
            [SELECT Name, Skill_Equivalency__c 
             FROM Equivalency__c
             WHERE User__c = :uid];
        System.debug(strengths);
        
        List<Map<String,String>> strengthsMap = new List<Map<String,String>>();
        for(Equivalency__c e : strengths) {
            strengthsMap.add(new Map<String, String>{'EquivalencyName' => e.Name, 'EquivalencyNum' => String.valueof(e.Skill_Equivalency__c)});            
        }
        System.debug(strengthsMap);
    }
}

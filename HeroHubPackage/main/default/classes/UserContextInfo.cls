public class UserContextInfo {
    User user;
    Account userAccount;
    Map<String, List<Exam__c>> examList;
    Team_c userTeam;
    Squad_c userSquad;
    Curriculum__c userCurriculum;


    public UserContextInfo( Id userId ){
        userAccount = HeroHubUtilities.getUserAccount( userId );
        userCurriculum = userAccount.Curriculum__c;        
        List<Titan__c> titanList = getTitans( userCurriculum );
        List<Exam__c> examList = getExams(titanList);
        List<Exam_results__c> resultList = getExamResults(userAccount.Id);
        
    }


    private List<Titan__c> getTitans(Id curriculum){

        List<Titan__c> titans = [SELECT Id, Name FROM Titan__c WHERE Curriculum__c = :curriculum];
        
        return titans;
    }

    private Map<String, List<Exam__c>> getExams(List<Titan__c> titanList){
        
        List<Exam__c> examList = [SELECT Id, Titan__c, Name FROM Exam__c WHERE Titan__C IN :titanList];
    
    }

}


Map<String, List<Exam__c>> examMap = new Map<String, List<Exam__c>>();
        
for(Titan__c titan : titanList){
    for(Exam__c exam : examList{ 
        if(exam.Titan__C == titan.Id){
            if(examMap.containsKey(titan.Name)){
                examMap.get(titan.Name).add(exam);
            }
            else{
                List<Exam__c> newList = new List<Exam__c>{exam};
                examMap.put(titan.Name, newList);
            }
        }
    }
}

return examMap;
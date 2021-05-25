public class UserContextInfo {
    
    @auraEnabled public Account acc{get; set;}
    @auraEnabled public Squad__c squad{get; set;}
    @auraEnabled public Team__c team{get; set;}
    @auraEnabled public Map<String, List<ExamList>> userExams {get; set;} 

    public UserContextInfo( Id userId ){
        acc = getUserAccount( userId );
        squad = getSquad( acc.Squad__c );
        team = getTeam( squad.Team__c );
        system.debug(acc.Curriculum__c);
        List<Titan__c> titanList = getTitans( acc.Curriculum__c );
        system.debug(titanList);
        List<Exam__c> examList = getExams( titanList );
        userExams = mapTitansToExams( examList, titanList, acc.Id );
    }

    private Account getUserAccount(Id userId) {

        //Id userContactId = [SELECT Id, ContactId FROM USER WHERE Id = :userId].ContactId;
        //Contact userContact = [SELECT Id, AccountId, Name FROM Contact WHERE Id = :userContactId];
        Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Id = '001S000001NkRuCIAV'];
        return userAccount;
    }

    private Squad__c getSquad(Id squadId){

        Squad__c userSquad = [SELECT Id, Name, Team__c FROM Squad__c WHERE Id = :squadId LIMIT 1];

        return userSquad;

    }

    private Team__c getTeam(Id teamId){

        Team__c userTeam = [SELECT Id, 
                            Name, 
                            Slogan__c, 
                            In_Lead__c, 
                            Primary_Color__c, 
                            Secondary_Color__c 
                            FROM Team__c 
                            WHERE Id = :teamId];

        return userTeam;

    }

    private List<Titan__c> getTitans(Id curriculum){

        List<Titan__c> titans = [SELECT Id, Name FROM Titan__c WHERE Curriculum__c = :curriculum];
        
        system.debug(titans);
        return titans;
    }

    private List<Exam__c> getExams(List<Titan__c> titanList){
        
        List<Exam__c> examList = [SELECT Id, Titan__c, Name FROM Exam__c WHERE Titan__C IN :titanList];
    
        return examList;
    }

    private Map<String, List<ExamList>> mapTitansToExams(List<Exam__c> exams, List<Titan__C> titans, Id accId){
		
        system.debug(titans);
        Map<String, List<ExamList>> examMap = new Map<String, List<ExamList>>();
        
        for( Titan__c titan : titans ) {
            examMap.put(titan.Name, new List<ExamList>());
            
            for(Exam__c exam : exams) {
                examMap.get(titan.Name).add(new ExamList(accId, exam));
            }
        }
        
        system.debug(examMap);
        return examMap;
    }
}
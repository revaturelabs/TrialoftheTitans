public class UserContextInfo {
    
    //account Info
    @auraEnabled public Account acc{get; set;}
    
    //squad Info
    @auraEnabled public Squad__c squad{get; set;}
    
    //Team Info
    @auraEnabled public Team__c team{get; set;}
    
    //Map of Exam Info by Titan and then Exam Name
    @auraEnabled public Map<String, List<ExamList>> userExams {get; set;} 

    //Constructor when given a userId
    public UserContextInfo( Id userId ){

        acc = getUserAccount( userId );
        
        squad = getSquad( acc.Squad__c );
        
        team = getTeam( squad.Team__c );
        
        // Get 
        List<Exam__c> examList = getExamsWithResults(acc.Id);

        userExams = mapTitansToExams( examList );
    }

    private Account getUserAccount(Id userId) {

        // To be added when user is live
        //Id userContactId = [SELECT Id, ContactId FROM USER WHERE Id = :userId].ContactId;
        //Contact userContact = [SELECT Id, AccountId, Name FROM Contact WHERE Id = :userContactId];
        
        //Hard Coded Account for
        Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Name = 'User0'];
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

    private List<Exam__c> getExamsWithResults(Id accId){
        
        List<Exam__c> examList = [SELECT Id, 
                                    Titan__r.Name, 
                                    Name, 
                                    (SELECT Pass__c, 
                                            Total_Answers__c, 
                                            Total_Correct__C 
                                            FROM Exam_Results__r 
                                            WHERE Account__c = :accId 
                                            AND Graded__c = true)
                                    FROM Exam__c];
    
        return examList;
    }

    private Map<String, List<ExamList>> mapTitansToExams(List<Exam__c> exams){
		
        Map<String, List<ExamList>> examMap = new Map<String, List<ExamList>>();
        
        for(Exam__c exam:exams){
            if(examMap.containsKey(exam.Titan__r.Name)){
                examMap.get(exam.Titan__r.Name).add(new ExamList(exam));
            }
            else{
                List<ExamList> newTitanExams = new List<ExamList>{new ExamList(exam)};
                examMap.put(exam.Titan__r.Name, newTitanExams);
            }
        }
        
        system.debug(examMap);
        return examMap;
    }
}
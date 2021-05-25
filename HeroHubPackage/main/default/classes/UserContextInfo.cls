public class UserContextInfo {
    
    public Account acc;
    public Squad__c squad;
    public Team__c team;
    public Map<String, List<ExamList>> userExams; 

    public UserContextInfo( Id userId ){
        acc = getUserAccount( userId );
        squad = getSquad( acc.Squad__c );
        team = getTeam( squad.Id );        
        List<Titan__c> titanList = getTitans( acc.Curriculum__c );
        List<Exam__c> examList = getExams( titanList );
        userExams = mapTitansToExams( examList, titanList, acc.Id);
    }

    private Account getUserAccount(Id userId) {

        Id userContactId = [SELECT Id, ContactId FROM USER WHERE Id = :userId].ContactId;
        Contact userContact = [SELECT Id, AccountId, Name FROM Contact WHERE Id = :userContactId];
        Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Id = :userContact.AccountId];
        return userAccount;
    }

    private Squad__c getSquad(Id squadId){

        Squad__c userSquad = [SELECT Id, Name FROM Squad__c WHERE Id = :squadId LIMIT 1];

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
                            WHERE Id = :teamID];

        return userTeam;

    }

    private List<Titan__c> getTitans(Id curriculum){

        List<Titan__c> titans = [SELECT Id, Name FROM Titan__c WHERE Curriculum__c = :curriculum];
        
        return titans;
    }

    private List<Exam__c> getExams(List<Titan__c> titanList){
        
        List<Exam__c> examList = [SELECT Id, Titan__c, Name FROM Exam__c WHERE Titan__C IN :titanList];
    
        return examList;
    }

    private Map<String, List<ExamList>> mapTitansToExams(List<Exam__c> exams, List<Titan__C> titans, Id accId){

        Map<String, List<ExamList>> examMap = new Map<String, List<ExamList>>();
        
        for( Titan__c titan : titans ) {
            for(Exam__c exam : exams) {
                if(exam.Titan__C == titan.Id){
                    if(examMap.containsKey(titan.Name)){
                        examMap.get(titan.Name).add(new ExamList(accId, exam));
                    }
                    else{
                        List<ExamList> newList = new List<ExamList>{new ExamList(accId, exam)};
                        examMap.put(titan.Name, newList);
                    }
                }
            }
        }

        return examMap;
    }
}
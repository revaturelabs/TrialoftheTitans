/////////////////////////////////////////////////////
//
//  Name: UserContextInfo
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 5/25/2021
//  Description: User Context to be return to JavaScript
//  controller in the PageContainer
// 
//
///////////////////////////////////////////////////

public class UserContextInfo {
    
    //account Info
    @auraEnabled public Account acc{get; set;}
    
    //squad Info
    @auraEnabled public Squad__c squad{get; set;}
    
    //Team Info
    @auraEnabled public Team__c team{get; set;}
    
    //Map of Exam Info by Titan and then Exam Name
    @auraEnabled public Map<String, List<ExamList>> userExams {get; set;} 

    //Constructor
    public UserContextInfo( Id userId ){

        acc = getUserAccount( userId );
        
        squad = getSquad( acc.Squad__c );
        
        team = getTeam( squad.Team__c );

        List<Titan__c> allTitans = getAllTitans();
        
        // Get 
        List<Exam__c> examList = getExamsWithResults(acc.Id);

        userExams = mapTitansToExams( examList, allTitans );
    }

    private Account getUserAccount(Id userId) {
		
        // To be added when user is live
        try{
            //User user = [SELECT Id, contactId FROM User WHERE Id = :userId];
        	//Contact userContact = [SELECT Id, AccountId FROM Contact WHERE Id = :user.ContactId];
        	//Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Id = :userContact.AccountId];
            
            //Hard Coded Account for now
        	Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Name = 'User0'];
			return userAccount;
        }
        catch(Exception e){
           return null;
        }
        

        
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

    @testVisible
    private List<Titan__C> getAllTitans(){

        List<Titan__c> allTitans = [SELECT Id, Name FROM Titan__C];

        return allTitans;
    
    }

    // Returns a list of exams with a nest list of results
    @testVisible
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

    //Maps the Exam Results and other fields to a Titan by Exam Name
    private Map<String, List<ExamList>> mapTitansToExams(List<Exam__c> exams, List<Titan__c> allTitans){
		
        // Custom DataType to mape names, lists, and numbers in one object
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

        // Map titans with no exams after those with exams.
        for(Titan__c titan: allTitans){

            if(examMap.containsKey(titan.Name) != true){

                List<ExamList> newTitanExams = new List<ExamList>();
                examMap.put(titan.Name, newTitanExams);
            
            }
        
        }
        
        return examMap;
    }
}
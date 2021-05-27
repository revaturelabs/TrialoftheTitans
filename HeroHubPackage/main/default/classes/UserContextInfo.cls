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
    @auraEnabled 
    public Account acc{get; set;}
    
    //squad Info
    @auraEnabled 
    public Squad__c squad{get; set;}
    
    //Team Info
    @auraEnabled public Team__c team{get; set;}
    
    //Map of Exam Info by Titan and then Exam Name
    @auraEnabled public Map<String, List<ExamList>> userExams {get; set;} 

    //Constructor
    public UserContextInfo( Id userId ){

        acc = getUserAccount( userId );
        
        system.debug(acc.Squad__c);
        
        squad = getSquad( acc.Squad__c );
        
        team = getTeam( squad.Team__c );

        List<Titan__c> allTitans = getAllTitans();
        
        List<Exam__c> examList = getExamsWithResults( acc.Id );

        Map<String, List<Exam__c>> sortedExams = sortExams( examList, allTitans );
        
        userExams = createExamLists( sortedExams );
    }

    private Account getUserAccount(Id userId) {
		
        // To be added when user is live
        try{
            //User user = [SELECT Id, contactId FROM User WHERE Id = :userId];
        	//Contact userContact = [SELECT Id, AccountId FROM Contact WHERE Id = :user.ContactId];
        	//Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Id = :userContact.AccountId];
            
            //Hard Coded Account for now
        	Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE Name = 'User0'];
            
            system.debug(userAccount);
			return userAccount;
        }
        catch(Exception e){
           return null;
        }
        

        
    }

    private Squad__c getSquad(Id squadId){
        
        system.debug(squadId);

        Squad__c userSquad = [SELECT Id, Name, Team__c FROM Squad__c LIMIT 1];
        
        system.debug(userSquad);

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
        
        List<Exam__c> examsList = [SELECT Id, 
                                    Titan__r.Name, 
                                    Name,
                                    Next_Exam__c,
                                    (SELECT Pass__c, 
                                            Total_Answers__c, 
                                            Total_Correct__C,
                                     		Status__c
                                            FROM Exam_Results__r 
                                            WHERE Account__c = :accId 
                                            )
                                    FROM Exam__c];
    
        return examsList;
    }

    //Maps the Exam Results and other fields to a Titan by Exam Name and sort by prerequisites. 
    private Map<String, List<Exam__c>> sortExams(List<Exam__c> exams, List<Titan__c> allTitans){
		
        // Custom DataType to mape names, lists, and numbers in one object
        Map<String, List<Exam__c>> examMap = new Map<String, List<Exam__C>>();
        
        for(Titan__c titan: allTitans){

            if(examMap.containsKey(titan.Name) != true){

                List<Exam__c> newTitanExams = new List<Exam__c>();
                examMap.put(titan.Name, newTitanExams);
            
            }
        
        }
        
        for(Exam__c exam:exams){
         	examMap.get(exam.Titan__R.Name).add(exam);   
        }
        
        for(String key: examMap.keySet()){
            List<Exam__c> examsToSort = examMap.get(key);
            
            Boolean isSorted = false;
            while(isSorted = false){
                Integer moves = 0;
                Exam__C temp;
                for(Integer i = 0; i < examsToSort.size()-1; i++){
                    if(examsToSort[i].next_Exam__c != examsToSort[i+1].Id){
                      temp = examsToSort[i+1];
                      examsToSort[i+1] = examsToSort[i];
                      examsToSort[i] = examsToSort[i+1];
                      moves++;
                    }
                }
                if(moves == 0){
                    isSorted = true;
                }
            }
        }
        
        
        return examMap;
    }
    
    private Map<String, List<ExamList>> createExamLists(Map<String, List<Exam__c>> titanExams){
        
        Map<String, List<ExamList>> examList = new Map<String, List<ExamList>>();
        
        for( String key: titanExams.keySet()){
            
            examList.put(key, new List<ExamList>());
            List<ExamList> titanExamList = examList.get(key);
            List<Exam__C> exams = titanExams.get(key);
            
            for(Exam__C exam: exams){
                
               titanExamList.add(new ExamList(exam));
                
            }
        }
        
        return examList;
    }
}
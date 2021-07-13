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
    @auraEnabled 
    public Team__c team{get; set;}
    
    //Map of Exam Info by Titan and then Exam Name
    @auraEnabled 
    public Map<String, List<ExamList>> userExams {get; set;} 

    //Constructor
    public UserContextInfo( Id userId ){

        acc = getUserAccount( userId );
        
        system.debug('acc' + acc);
        
        squad = getSquad( acc.Squad__c );
        
        System.debug('squad' + squad);
        
        team = getTeam( squad.Team__c );
        
        System.debug('team' + team);
		
        List<Titan__c> allTitans = getAllTitans();
        
        System.debug('allTitans' + allTitans);
        
        List<Exam__c> examList = getExamsWithResults( acc.Id );
        
        System.debug(examList);

        Map<String, List<Exam__c>> sortedExams = sortExams( examList, allTitans );
        
        System.debug('sortedExams' + sortedExams);
        
        userExams = createExamLists( sortedExams );
        
        System.debug('userExams' + userExams);
    }

   	public static Account getUserAccount(Id userId) {
		
        // To be added when user is live
        try{
            User user = [SELECT Id, contactId FROM User WHERE Id = :userId];
        	Contact userContact = [SELECT Id, AccountId FROM Contact WHERE Id = :user.ContactId];
        	Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c, Team__c, Cohort__c FROM Account WHERE Id = :userContact.AccountId];
            
            //Hard Coded Account for now
        	//Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c, Cohort__c, Team__c FROM Account WHERE Name = 'User0'];
            
            system.debug(userAccount);
			return userAccount;
        }
        catch(Exception e){
           return [SELECT Id, Name, Curriculum__c, Squad__c, Cohort__c, Team__c FROM Account WHERE Name = 'Gladius Maximus'];
        }
        

        
    }

    private Squad__c getSquad(Id squadId){
        
        system.debug(squadId);

        Squad__c userSquad = [SELECT Id, Name, Team__c FROM Squad__c WHERE id = :squadId LIMIT 1];
        
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
                                     		Status__c,
                                            CreatedDate
                                            FROM Exam_Results__r 
                                            WHERE Account__c = :accId 
                                 			ORDER BY Score__c DESC NULLS LAST
                                            )
                                    FROM Exam__c];
    
        return examsList;
    }

    //Maps the Exam Results and other fields to a Titan by Exam Name and sort by prerequisites. 
    private Map<String, List<Exam__c>> sortExams(List<Exam__c> exams, List<Titan__c> allTitans){
		System.debug('In sorting ' + exams + allTitans);
        // Custom DataType to mape names, lists, and numbers in one object
        Map<String, List<Exam__c>> examMap = new Map<String, List<Exam__C>>();
        
        // create all keys
        for(Titan__c titan: allTitans){

            if(examMap.containsKey(titan.Name) != true){

                List<Exam__c> newTitanExams = new List<Exam__c>();
                examMap.put(titan.Name, newTitanExams);
            	System.debug(titan.Name + ' ' +  newTitanExams);
            }
        
        }
        
        // add too key we are populating
        for(Exam__c exam : exams){
         	examMap.get(exam.Titan__R.Name).add(exam);   
        }

        //Sorting algorithm to be added in the future or done with numbers on Exam-Results.
        // Done by James Patton 6/07/2021 baised on insertion sort with first looking at next exam and inserting there without regard for other exams that may have the same next exam
        //   This will cause if a, b, and, c exams have all the same next exam called d in a titan the first exam evaluated in sort will have that has the next exam so could end up as 
        //   a, b, c, d | b, a, c, d | a, d, c, b | b, d, c, a really anything other then d being first
        
        
        for (String key : examMap.keySet()) {
            List<Exam__c> examsToSort = examMap.get(key);
            List<Exam__c> sortedExams = new List<Exam__c>();
            
            //Insertion sort baised on nextExam
            for (Exam__c exam : examsToSort){
                if (sortedExams.size() == 0){
                    sortedExams.add(exam);
                }
                else {
                    boolean spotFound = False;
                    for (Integer sortedExamIndex = 0; sortedExamIndex < sortedExams.size() && spotFound == False; sortedExamIndex++) {
                        if (sortedExams[sortedExamIndex].next_Exam__c == exam.id) {
                            if (sortedExamIndex < sortedExams.size() - 1) {
                                // at end of list so must use .add
                                sortedExams.add(exam);
                            }
                            else{
                                try {
                                	// in the middle so insert at next spot
                                	sortedExams.add(sortedExamIndex + 1, exam);
                                } catch (Exception ex) {
                                    System.debug('Problem here' + sortedExamIndex + sortedExams );
                                }
                            }
                            
                        }
                    }
                    if (spotFound == False){
                        // insert at front or back
                        if (exam.Next_Exam__c == sortedExams[0].Id) {
                            //Insert at front
                            sortedExams.add(0, exam);
                        }
                        else {
                            sortedExams.add(exam);
                        }
                    }
                }
            }
            // set values for map to sorted list
            examMap.put(key, sortedExams);
        }
        
        
        System.debug('End sorting ' + examMap);
        return examMap;
    }
    
    // Creates a custom class object to prepare exams to be mapped to titans. 
    private Map<String, List<ExamList>> createExamLists(Map<String, List<Exam__c>> titanExams){
        //System.debug('In cereateExam List createExamLists');
        Map<String, List<ExamList>> examList = new Map<String, List<ExamList>>();
        //System.debug('In cereateExam examList1 ' + examList);
        for( String key: titanExams.keySet()){
            //System.debug('In cereateExam List key' + key);
            examList.put(key, new List<ExamList>());
            List<ExamList> titanExamList = examList.get(key);
            //System.debug('In cereateExam titanExamList1 ' + titanExamList);
            List<Exam__C> exams = titanExams.get(key);
            //System.debug('In cereateExam exams' + exams);
            for(Exam__C exam: exams){
                //system.debug('In cereateExam exam ' + exam);
               titanExamList.add(new ExamList(exam));
                //system.debug('In cereateExam titanExamList2' + titanExamList);
            }
        }
        //system.debug('In cereateExam List + examList' + examList);
        return examList;
    }
}
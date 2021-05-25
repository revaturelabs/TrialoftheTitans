public class ExamList {
    @auraEnabled public String name{get;set;}
    @auraEnabled public List<Exam_Result__c> pastResults{get;set;}
    @auraEnabled public List<Exam_Result__c> currentResults{get;set;}
    @auraEnabled public Boolean isPassed{get;set;}
    @auraEnabled public Decimal highScore{get;set;}
	
    public ExamList( Id AccId, Exam__c exam ) {

        name = exam.Name;
        currentResults = getCurrentResults( accId, exam.Id );
        pastResults = getPastResults( accId, exam.Id );
        isPassed = currentResults[0].Pass__C;
        //highScore = currentResults[0].Total_Correct__c/currentResults[0].Total_Answers__c;
        highScore = .80;

    }

    private List<Exam_Result__c> getCurrentResults( Id accId, Id examId ){
        List<Exam_Result__c> results = [SELECT Pass__c, 
                                        Total_Answers__c, 
                                        Total_Correct__C 
                                        FROM Exam_Result__c 
                                        WHERE Graded__C = true AND Account__c = :accId 
                                        ORDER BY Total_Correct__c ];    
        
        return results;
    }

    private List<Exam_Result__c> getPastResults(Id accId, Id examId){

        List<Exam_Result__c> results = [SELECT Pass__c, 
                                        Total_Answers__c, 
                                        Total_Correct__C 
                                        FROM Exam_Result__c 
                                        WHERE Graded__C = true AND Account__c = :accId 
                                        AND CreatedDate < THIS_WEEK 
                                        ORDER BY Total_Correct__c  ];
        return results;
    }
}
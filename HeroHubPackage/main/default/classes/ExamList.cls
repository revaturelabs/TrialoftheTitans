public class ExamList {
    public String name;
    public List<Exam_Result__c> pastResults;
    public List<Exam_Result__c> currentResults;
    public Boolean isPassed;
    public Decimal highScore;

    public ExamList( Id AccId, Exam__c exam ) {

        name = exam.Name;
        currentResults = getCurrentResults( accId, exam.Id );
        pastResults = getPastResults( accId, exam.Id );
        isPassed = currentResults[0].Pass__C;
        highScore = currentResults[0].Total_Correct__c/currentResults[0].Total_Answers__c;

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

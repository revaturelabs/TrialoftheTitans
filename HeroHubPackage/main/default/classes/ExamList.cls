/////////////////////////////////////////////////////
//
//  Name: ExamList
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 5/25/2021
//  Description: Custom Class to build the Exam Results
//  conducive to parsing in JavaScript
// 
//
///////////////////////////////////////////////////
public class ExamList {

    //Exam Name
    @auraEnabled public String name{get;set;}
    
    //Next Exam
    @auraEnabled public Id nextExam{get;set;}
    
    //Assigned Exam
    @auraEnabled public Boolean assigned{get; set;}

    //Past Exam Results
    @auraEnabled public List<Exam_Result__c> pastResults{get;set;}
    
    //All exam results
    @auraEnabled public List<Exam_Result__c> currentResults{get;set;}

    @auraEnabled public Boolean isPassed{get;set;}
    @auraEnabled public Decimal highScore{get;set;}
	
    public ExamList( Exam__c exam ) {
        System.debug(exam.name);
        name = exam.Name;
        nextExam = exam.Next_Exam__c;
        system.debug('FROM EXAMLISt' + exam.Exam_Results__r);
        currentResults = exam.Exam_Results__r;
        pastResults = getPastResults( currentResults );
        isPassed = currentResults[0].Pass__C;
        // If no answers highScore is null
        if(currentResults[0].Total_Answers__c != 0){
                
        	highScore = currentResults[0].Total_Correct__c/currentResults[0].Total_Answers__c;
            highScore = highScore.setScale(2);
            
        }
        else{
                
            highScore = null;
            
        }
        
        if(currentResults[0].Status__c == 'Assigned' || currentResults[0].Status__c == 'Completed'){
            assigned = true;
        }
        else{
            assigned = false;
        }
    }

    private List<Exam_Result__c> getPastResults(List<Exam_Result__c> results){
        
        //Use CreateDate to return past results older than the past business week
        List<Exam_Result__c> oldResults = [SELECT Pass__c, 
                                        Total_Answers__c, 
                                        Total_Correct__C,
                                        CreatedDate 
                                        FROM Exam_Result__c 
                                        WHERE Graded__C = true 
                                        AND Id IN :results 
                                        AND CreatedDate < THIS_WEEK 
                                        ORDER BY Total_Correct__c ];
        
        return oldResults;
        
    }
}
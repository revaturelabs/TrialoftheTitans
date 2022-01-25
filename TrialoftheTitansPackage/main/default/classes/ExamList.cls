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

    //Did they pass the exam based on high score?
    @auraEnabled public Boolean isPassed{get;set;}

    @auraEnabled public Decimal highScore{get;set;}
	
    public ExamList( Exam__c exam ) {
        System.debug('In exam List');
        name = exam.Name;
        nextExam = exam.Next_Exam__c;
        currentResults = exam.Exam_Results__r;
        System.debug('In exam list after currentResults' + currentResults);
        pastResults = getPastResults( currentResults );
		System.debug('In exam list after pastResults' + pastResults);
        // check for if there is any current results if not don't set them up
        if (currentResults.size() > 0){
            if(currentResults[0] != null){
                System.debug('In exam List middle');
                isPassed = currentResults[0].Pass__C;
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
            else{
                isPassed = false;
                highScore = null;
                assigned = false;
            }
        }
        System.debug('In exam List end');
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
                                        ORDER BY Score__c DESC NULLS LAST];
        
        return oldResults;
        
    }
}
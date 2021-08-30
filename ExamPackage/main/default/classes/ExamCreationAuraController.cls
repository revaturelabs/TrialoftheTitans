////////////////////////////////////////////////////
//
// Name: Exam Creation Aura Controller
// Author: Danny Tran, Phong Nguyen
// Created: 2021-05-25
// Updated: 2021-05-30
// Description: Controller that handles requests
//              from Exam Creation Component.
//
////////////////////////////////////////////////////
public class ExamCreationAuraController {
    
    // Custom class that matches with Object from Javascript
    public class QuestionPoolWrapper{
        
        // the id of the question pool
        @AuraEnabled
        public Id poolId {get; set;}
        
        // the number of questions from the pool the user want to pull
        @AuraEnabled
        public Integer quantity {get; set;}
        
        // the poolName and the poolQuestionAmount are for displaying
        @AuraEnabled
        public String poolName {get; set;}
        @AuraEnabled
        public Double poolQuestionAmount {get; set;}
        
        public QuestionPoolWrapper(Id i, String n, Decimal a){
            poolId = i;
            quantity = 0;
            poolName = n;
            poolQuestionAmount = a;
        }
    }
    
    // Description: get question pools, called on init
    // Parameters: searchKeyword is a string for the searchbar, can be null or not.
    @AuraEnabled(cacheable=true)
    public static Map<Integer, List<QuestionPoolWrapper>> GetQuestionPool(String searchKeyword){
        
        // determine if key is null or not
        String searchkey= String.isBlank (searchKeyword) ? '%%' : '%'+searchKeyword+'%';
        
        // map keep question pools in value, and key are pages.
        Map<Integer, List<QuestionPoolWrapper>> qpm = new Map<Integer, List<QuestionPoolWrapper>>();
        
        List<QuestionPoolWrapper> qpw = new List<QuestionPoolWrapper>();
        Integer counter = 1;
        Integer pageNumber = 1;
        
        // put question pools into map with query for all pools that matches the search
        for(Question_Pool__c qp: [SELECT Id, Name, Number_Of_Questions__c FROM Question_Pool__c WHERE Name LIKE : searchkey]){
            qpw.add(new QuestionPoolWrapper(qp.Id, qp.Name, qp.Number_Of_Questions__c));
            if(counter == 10){
                qpm.put(pageNumber, qpw);
                pageNumber++;
                qpw = new List<QuestionPoolWrapper>();
            }
            counter++;
        }
        
        // incase we getting no pool
        if(!qpw.isEmpty()){
            qpm.put(pageNumber, qpw);
        }
        
        return qpm;
    }
    
    // Description: get all Exam questions of a particular pool
    // Parameters: poolId to query with.
    @AuraEnabled(cacheable=true)
    public static List<Exam_Question__c> GetExamQuestions(Id poolId){
        
        List<Exam_Question__c> eql  = new List<Exam_Question__c>();
        
        // query for all relevant information in Exam Questions from Question assignments
        // using child to parent relation query
        for(Question_Assignment__c qp: [SELECT Id, Question_Pool__c, 
                                        Exam_Question__r.Name, Exam_Question__r.Correct_Answer_S__c, Exam_Question__r.Question_Text__c, Exam_Question__r.Options__c
                                  		FROM Question_Assignment__c 
                                        WHERE Question_Pool__c = :poolId]){
                                            
			// put the questions in to the list
            eql.add(new Exam_Question__c(Name = qp.Exam_Question__r.Name, 
                                         Correct_Answer_s__c = qp.Exam_Question__r.Correct_Answer_S__c,
                                         Question_Text__c = qp.Exam_Question__r.Question_Text__c,
                                         Options__c = qp.Exam_Question__r.Options__c
                                        )
                   );
        }
        return eql;
    }
    
    // Description: creating the exam assignment with all the pools and their number of questions
    // Parameters: examId : of the exam that was created.
    // 			   poolAndNumber : the poolId and the number of question to pull from that pool
    @AuraEnabled(cacheable=true)
    public static void CreateExamAssignment(String examId, Map<Id, Integer> poolAndNumber){
        List<Exam_Pool_Assignment__c> eal = new List<Exam_Pool_Assignment__c>();
        for(String key: poolAndNumber.keyset()){
            eal.add(new Exam_Pool_Assignment__c(Exam__c = examId, Question_Pool__c = key, Number_to_pull__c = poolAndNumber.get(key)));
        }
        insert eal;
    }
}
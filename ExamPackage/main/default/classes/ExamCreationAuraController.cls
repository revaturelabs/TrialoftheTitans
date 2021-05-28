public class ExamCreationAuraController {
    
    public class QuestionPoolWrapper{
        @AuraEnabled
        public Id poolId {get; set;}
        @AuraEnabled
        public Integer quantity {get; set;}
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
    @AuraEnabled
    public static Map<Integer, List<QuestionPoolWrapper>> getQuestionPool(String searchKeyword){
        // Searchkey is null
        String searchkey= String.isBlank (searchKeyword) ? '%%' : '%'+searchKeyword+'%';
        
        Map<Integer,List<QuestionPoolWrapper>> qpm = new Map<Integer, List<QuestionPoolWrapper>>();
        List<QuestionPoolWrapper> qpw = new List<QuestionPoolWrapper>();
        Integer counter = 1;
        Integer pageNumber = 1;
        for(Question_Pool__c qp: [SELECT Id, Name, Number_Of_Questions__c FROM Question_Pool__c WHERE Name LIKE : searchkey]){
            qpw.add(new QuestionPoolWrapper(qp.Id, qp.Name, qp.Number_Of_Questions__c));
            if(counter == 10){
                qpm.put(pageNumber, qpw);
                pageNumber++;
                qpw = new List<QuestionPoolWrapper>();
            }
            counter++;
        }
        if(!qpw.isEmpty()){
            qpm.put(pageNumber, qpw);
        }
        return qpm;
    }
    
    @AuraEnabled
    public static List<Exam_Question__c> getExamQuestions(Id poolId){
        List<Exam_Question__c> eql  = new List<Exam_Question__c>();
        for(Question_Assignment__c qp: [SELECT Id, Question_Pool__c, 
                                        Exam_Question__r.Name, Exam_Question__r.Correct_Answer_S__c, Exam_Question__r.Question_Text__c, Exam_Question__r.Options__c
                                  		FROM Question_Assignment__c 
                                        WHERE Question_Pool__c = :poolId]){
            eql.add(new Exam_Question__c(Name = qp.Exam_Question__r.Name, 
                                         Correct_Answer_s__c = qp.Exam_Question__r.Correct_Answer_S__c,
                                         Question_Text__c = qp.Exam_Question__r.Question_Text__c,
                                         Options__c = qp.Exam_Question__r.Options__c
                                        )
                   );
        }
        return eql;
    }
    
    @AuraEnabled
    public static void createExamAssignment(String examId, Map<Id, Integer> poolAndNumber){
        List<Exam_Pool_Assignment__c> eal = new List<Exam_Pool_Assignment__c>();
        for(String key: poolAndNumber.keyset()){
            eal.add(new Exam_Pool_Assignment__c(Exam__c = examId, Question_Pool__c = key, Number_to_pull__c = poolAndNumber.get(key)));
        }
        insert eal;
    }
}
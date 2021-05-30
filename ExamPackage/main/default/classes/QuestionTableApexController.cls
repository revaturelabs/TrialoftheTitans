public class QuestionTableApexController {
    //=============================================Adding Question to Pool================================   
    @AuraEnabled
    public static Integer addQues2Pool(List <Question_Pool__c> pools, List <Exam_Question__c> questions){
		Integer count=0;
        // Exatracting Ids from pools and question list
        Set<ID> poolIds=new Set <ID> () ;
        Set<ID> questionIds=new Set <ID> () ;
        for (Exam_Question__c question: questions){
            //System.debug('***questions '+ question.Id + question.Name); 
            questionIds.add(question.Id);
        } 
        for (Question_Pool__c pool: pools){    
            poolIds.add(pool.Id);
        } 
        List <Question_Assignment__c> newRecs = new List <Question_Assignment__c> ();
        
        for(ID poolId: poolIds ){
            for(ID questionId: questionIds ){
                //System.debug('***questionId '+questionId);
                //System.debug('***poolId '+poolId);
                newRecs.add(new Question_Assignment__c(Exam_Question__c=questionId,Question_Pool__c=poolId));
                count++;
            }
        }
        //Allow paritally sucess to avoid duplication in the records
        Database.insert(newRecs,false);
        //System.debug('***newRecs '+newRecs); 
        return count;
    }
    
    
    //=================================================Get Question List================================    
    @AuraEnabled
    public static List <TableRow> GetQues(String searchKeyword,Integer pageSize, Integer pageNumber){
        
        // Wrapper instantiate
        List <TableRow> RowList = new List <TableRow> ();
        TableRow tr;
        
        //convert offset                                             
        Integer offset = (pageNumber - 1) * pageSize;
        
        // Searchkey is null
        String searchkey= String.isBlank (searchKeyword) ? '%%' : '%'+searchKeyword+'%';
        List<Exam_Question__c> s = new List <Exam_Question__c>();
        s = [SELECT Name,Question_Text__c,Question_Type__c FROM Exam_Question__c WHERE Name LIKE : searchkey LIMIT :pageSize OFFSET :offset];
        For(Exam_Question__c q : s)
        {         
            tr = new TableRow();
            tr.ques.add(q);
            RowList.add(tr);
        }
        return RowList;
    }
    public class TableRow{
        @AuraEnabled public List <Exam_Question__c> ques {get;set;}
        public TableRow(){
            ques= new List<Exam_Question__c>();
        }
    }
    
    //=======================================================Get Pool List================================
    @AuraEnabled
    public static List <TableRow2> GetPool(){
        
        // Wrapper instantiate
        List <TableRow2> RowList = new List <TableRow2> ();
        TableRow2 tr;
        //String searchkey= String.isBlank (searchKeyword) ? '%%' : '%'+searchKeyword+'%';
        List<Question_Pool__c> s = new List <Question_Pool__c>();
        s = [SELECT Id,Name FROM Question_Pool__c];
        For(Question_Pool__c q : s)
        {         
            tr = new TableRow2();
            tr.assignedQues.add(q);
            RowList.add(tr);
        }
        return RowList;
    }
    public class TableRow2{
        @AuraEnabled public List <Question_Pool__c> assignedQues {get;set;}
        public TableRow2(){
            assignedQues= new List<Question_Pool__c>();
        }
    }
    
    
}
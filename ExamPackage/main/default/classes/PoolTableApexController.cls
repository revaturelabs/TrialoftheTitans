public class PoolTableApexController { 
    //=================================================Get Question List================================    
    @AuraEnabled
    public static List <TableRow> GetQues(String searchKeyword,Integer pageSize, Integer pageNumber, List <Question_Pool__c> pools){
        // Wrapper instantiate
        List <TableRow> RowList = new List <TableRow> ();
        TableRow tr;
        System.debug(pools);
        
        if(pools==null){
            return RowList;
        }
        // Extracting Ids from pools
        Set<ID> poolIds=new Set <ID> () ;
        for (Question_Pool__c pool: pools){    
            poolIds.add(pool.Id);
        } 
        
        
        //convert offset                                             
        Integer offset = (pageNumber - 1) * pageSize;
        
        // Searchkey is null
        String searchkey= String.isBlank (searchKeyword) ? '%%' : '%'+searchKeyword+'%';
        List<Question_Assignment__c> s = new List <Question_Assignment__c>();
        s = [SELECT Id,Exam_Question__r.Question_Type__c, 
             Exam_Question__r.Name, 
             Exam_Question__r.Question_Text__c
             FROM Question_Assignment__c 
             WHERE Question_Pool__c IN: poolIds
             AND  Exam_Question__r.Name LIKE : searchkey 
             LIMIT :pageSize OFFSET :offset];
        For(Question_Assignment__c q : s)
        {         
            tr = new TableRow();
            tr.Id				= q.Exam_Question__c;
            tr.Name 			= q.Exam_Question__r.Name;
            tr.Question_Text	= q.Exam_Question__r.Question_Text__c;
            tr.Question_Type	= q.Exam_Question__r.Question_Type__c;
            RowList.add(tr);
        }
        return RowList;
    }
    public class TableRow{
        @AuraEnabled public String Id	 			     {get;set;}
        @AuraEnabled public String Name 			     {get;set;}
        @AuraEnabled public String Question_Text	     {get;set;}
        @AuraEnabled public String Question_Type	     {get;set;}
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
    
    //=============================================Delete Question from Pool================================   
    @AuraEnabled
    public static Integer deleteQuesPool(List <Question_Pool__c> pools, List <Exam_Question__c> questions){
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
        List <Question_Assignment__c> delRecs = new List <Question_Assignment__c> ();        
        List <Question_Assignment__c> quesRecs = [SELECT Exam_Question__c FROM Question_Assignment__c WHERE Question_Pool__c IN: poolIds];
        
        
        for(Question_Assignment__c q: quesRecs){
            for (Id quesId : questionIds){
                if(q.Exam_Question__c==quesId){
                    delRecs.add(q);
                }
            } 	
        }
        //Allow paritally sucess to avoid duplication in the records
        Database.delete(delRecs,false); 
        return 0;
    }
    
}
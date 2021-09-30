@isTest
public class ExportQuestionPoolTest {
    @isTest static void QuestionPoolTest(){
        Exam__c exam = new Exam__c();
        exam.Name='Exam Test';
        insert exam;
        
        Question_Pool__c questionPool = new Question_Pool__c ();
        questionPool.name = 'Question Pool Test';
       // questionPool.Question_Pool_Exam__c = exam.id;
        insert questionPool;
        
     
      //    system.debug(questionPool);
        Exam_Question__c MCquestion = new Exam_Question__c();
        MCquestion.Name = 'MC Question';
		MCquestion.Question_Type__c='Multiple Choice';
        MCquestion.Question_Text__c='What is Apex?';
        MCquestion.Options__c ='programming language||scripting language||foreign language';
        MCquestion.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        MCquestion.Missing_Word__c = FALSE;
        insert MCquestion; 
        
        Question_Assignment__c MCquestionAssignment = new Question_Assignment__c();
        MCquestionAssignment.Exam_Question__c = MCquestion.id;
        MCquestionAssignment.question_pool__c = questionPool.id;
        insert MCquestionAssignment;
        system.debug(MCquestionAssignment);
        
	    Exam_Question__c MCMWquestion = new Exam_Question__c();
        MCMWquestion.Name = 'MCMW Question';
		MCMWquestion.Question_Type__c='Multiple Choice';
        MCMWquestion.Question_Text__c='Apex is a _____ language';
        MCMWquestion.Options__c ='programming||scripting||foreign';
        MCMWquestion.Correct_Answer_s__c = 'programming';
        //question.Answer_Explanation__c = '';
        MCMWquestion.Missing_Word__c = TRUE;
        insert MCMWquestion; 
        
        Question_Assignment__c MCMWquestionAssignment = new Question_Assignment__c();
        MCMWquestionAssignment.Exam_Question__c = MCMWquestion.id;
        MCMWquestionAssignment.question_pool__c = questionPool.id;
        insert MCMWquestionAssignment;
        
        
        Exam_Question__c MCMWMAquestion = new Exam_Question__c();
        MCMWMAquestion.Name = 'MCMWMA Question';
		MCMWMAquestion.Question_Type__c='Multiple Choice - multiple answers';
        MCMWMAquestion.Question_Text__c='Apex is a _____ language';
        MCMWMAquestion.Options__c ='programming||scripting||foreign||strongly-typed';
        MCMWMAquestion.Correct_Answer_s__c = 'programming||strongly-typed';
        MCMWMAquestion.Answer_Explanation__c = '||||||explanation';
        MCMWMAquestion.Missing_Word__c = TRUE;
        insert MCMWMAquestion;  
        
        Question_Assignment__c MCMWMAquestionAssignment = new Question_Assignment__c();
        MCMWMAquestionAssignment.Exam_Question__c = MCMWMAquestion.id;
        MCMWMAquestionAssignment.question_pool__c = questionPool.id;
        insert MCMWMAquestionAssignment;
        //system.debug(MCquestionAssignment);
        
        
        Exam_Question__c MCMAquestion = new Exam_Question__c();
        MCMAquestion.Name = 'MCMA Question';
		MCMAquestion.Question_Type__c='Multiple Choice - multiple answers';
        MCMAquestion.Question_Text__c='Apex is what type of language?';
        MCMAquestion.Options__c ='programming||scripting||foreign||strongly-typed';
        MCMAquestion.Correct_Answer_s__c = 'programming||strongly-typed';
        //question.Answer_Explanation__c = '';
        MCMAquestion.Missing_Word__c = FALSE;
        insert MCMAquestion;
        
        Question_Assignment__c MCMAquestionAssignment = new Question_Assignment__c();
        MCMAquestionAssignment.Exam_Question__c = MCMAquestion.id;
        MCMAquestionAssignment.question_pool__c = questionPool.id;
        insert MCMAquestionAssignment;
        
        Exam_Question__c TFquestion = new Exam_Question__c();
        TFquestion.Name = 'TF Question';
		TFquestion.Question_Type__c='True-false';
        TFquestion.Question_Text__c='Apex is a programming language';
        TFquestion.Correct_Answer_s__c = 'True';
        TFquestion.Missing_Word__c = FALSE;
        insert TFquestion;
        
        Question_Assignment__c TFquestionAssignment = new Question_Assignment__c();
       	TFquestionAssignment.Exam_Question__c = TFquestion.id;
        TFquestionAssignment.question_pool__c = questionPool.id;
		insert TFquestionAssignment;   
        
        
        Exam_Question__c TFMWquestion = new Exam_Question__c();
        TFMWquestion.Name = 'TFMW Question';
		TFMWquestion.Question_Type__c='True-false';
        TFMWquestion.Question_Text__c='Apex is a _____ language';
       // question.Options__c ='programming||scripting||foreign';
        TFMWquestion.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        TFMWquestion.Missing_Word__c = TRUE;
        insert TFMWquestion; 
        
        Question_Assignment__c TFMWquestionAssignment = new Question_Assignment__c();
        TFMWquestionAssignment.Exam_Question__c = TFMWquestion.id;
        TFMWquestionAssignment.question_pool__c = questionPool.id;
        insert TFMWquestionAssignment;
		
        Exam_Question__c Essayquestion = new Exam_Question__c();
        Essayquestion.Name = 'Essay Question';
		Essayquestion.Question_Type__c='Essay';
        Essayquestion.Question_Text__c='Write an Essay';
        //question.Options__c ='';
        //question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        Essayquestion.Missing_Word__c = FALSE;
        insert Essayquestion;
        
        Question_Assignment__c EssayquestionAssignment = new Question_Assignment__c();
        EssayquestionAssignment.Exam_Question__c = Essayquestion.id;
        EssayquestionAssignment.question_pool__c = questionPool.id;
        insert EssayquestionAssignment;
        
        Exam_Question__c EssayMWquestion = new Exam_Question__c();
        EssayMWquestion.Name = 'EssayMW Question';
		EssayMWquestion.Question_Type__c='Essay';
        EssayMWquestion.Question_Text__c='Write an _____ Essay';
        //question.Options__c ='';
        //question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        EssayMWquestion.Missing_Word__c = TRUE;
        insert EssayMWquestion; 
         
        Question_Assignment__c EssayMWquestionAssignment = new Question_Assignment__c();
        EssayMWquestionAssignment.Exam_Question__c = EssayMWquestion.id;
        EssayMWquestionAssignment.question_pool__c = questionPool.id;
        insert EssayMWquestionAssignment;
        
        Exam_Question__c SAquestion = new Exam_Question__c();
        SAquestion.Name = 'SA Question';
		SAquestion.Question_Type__c='Short answer';
        SAquestion.Question_Text__c='Apex is:';
        //question.Options__c ='';
        SAquestion.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        SAquestion.Missing_Word__c = FALSE;
        insert SAquestion;  
        
        Question_Assignment__c SAquestionAssignment = new Question_Assignment__c();
        SAquestionAssignment.Exam_Question__c = SAquestion.id;
        SAquestionAssignment.question_pool__c = questionPool.id;
        insert SAquestionAssignment;
        
        Exam_Question__c SAMWquestion = new Exam_Question__c();
        SAMWquestion.Name = 'SAMW Question';
		SAMWquestion.Question_Type__c='Short answer';
        SAMWquestion.Question_Text__c='Apex is _____:';
        //question.Options__c ='';
        SAMWquestion.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        SAMWquestion.Missing_Word__c = TRUE;
        insert SAMWquestion; 
        
        Question_Assignment__c SAMWquestionAssignment = new Question_Assignment__c();
        SAMWquestionAssignment.Exam_Question__c = SAMWquestion.id;
        SAMWquestionAssignment.question_pool__c = questionPool.id;
        insert SAMWquestionAssignment;
        
        Exam_Question__c Matchingquestion = new Exam_Question__c();
        Matchingquestion.Name = 'Matching Question';
		Matchingquestion.Question_Type__c='Matching';
        Matchingquestion.Question_Text__c='Match the Following:';
        Matchingquestion.Options__c ='AJAX||HTML||CSS';
        Matchingquestion.Correct_Answer_s__c = 'Asynchronous Javascript and XML||Markup Language||Cascading Stylesheet';
        //question.Answer_Explanation__c = '';
        Matchingquestion.Missing_Word__c = FALSE;
        insert Matchingquestion; 
        
        Question_Assignment__c MatchingquestionAssignment = new Question_Assignment__c();
        MatchingquestionAssignment.Exam_Question__c = Matchingquestion.id;
        MatchingquestionAssignment.question_pool__c = questionPool.id;
        insert MatchingquestionAssignment;
        
        Exam_Question__c MatchingMWquestion = new Exam_Question__c();
        MatchingMWquestion.Name = 'MatchingMW Question';
		MatchingMWquestion.Question_Type__c='Matching';
        MatchingMWquestion.Question_Text__c='Match the Following _____ :';
        MatchingMWquestion.Options__c ='AJAX||HTML||CSS';
        MatchingMWquestion.Correct_Answer_s__c = 'Asynchronous Javascript and XML||Markup Language||Cascading Stylesheet';
        //question.Answer_Explanation__c = '';
        MatchingMWquestion.Missing_Word__c = TRUE;
        insert MatchingMWquestion; 
        
        Question_Assignment__c MatchingMWquestionAssignment = new Question_Assignment__c();
        MatchingMWquestionAssignment.Exam_Question__c = MatchingMWquestion.id;
        MatchingMWquestionAssignment.question_pool__c = questionPool.id;
        insert MatchingMWquestionAssignment;
        
        Exam_Question__c Numericalquestion = new Exam_Question__c();
        Numericalquestion.Name = 'Numerical Question';
		Numericalquestion.Question_Type__c='Numerical';
        Numericalquestion.Question_Text__c='SOQL Queries:';
        Numericalquestion.Correct_Answer_s__c = '200';
        Numericalquestion.Missing_Word__c = FALSE;
        insert Numericalquestion;   
        
        Question_Assignment__c NumericalquestionAssignment = new Question_Assignment__c();
        NumericalquestionAssignment.Exam_Question__c = Numericalquestion.id;
        NumericalquestionAssignment.question_pool__c = questionPool.id;
        insert NumericalquestionAssignment;
        
        Exam_Question__c NumericalMWquestion = new Exam_Question__c();
        NumericalMWquestion.Name = 'NumericalMW Question';
		NumericalMWquestion.Question_Type__c='Numerical';
        NumericalMWquestion.Question_Text__c='SOQL Queries_____:';
        NumericalMWquestion.Correct_Answer_s__c = '200';
        NumericalMWquestion.Missing_Word__c = TRUE;
        insert NumericalMWquestion; 
        
        Question_Assignment__c NumericalMWquestionAssignment = new Question_Assignment__c();
        NumericalMWquestionAssignment.Exam_Question__c = NumericalMWquestion.id;
        NumericalMWquestionAssignment.question_pool__c = questionPool.id;
        insert NumericalMWquestionAssignment;
        
        ApexPages.StandardController sc = new ApexPages.StandardController(questionPool);
        PageReference pageRef = new pageReference('/apex/ExportQuestionPool/'+ questionPool.id);
       	pageRef.getParameters().put('id', questionPool.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionPoolController controller = new ExportQuestionPoolController (sc);
		system.debug(controller.allFormattedQuestionsString);
       
        System.assertEquals(14, controller.allFormattedQuestions.size());
    }
   
    

}
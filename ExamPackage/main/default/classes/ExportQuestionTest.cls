@isTest
public class ExportQuestionTest {
    //Multiple Choice Question Test 
    @isTest
    static void formatMC(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'MC Question';
		question.Question_Type__c='Multiple Choice';
        question.Question_Text__c='What is Apex?';
        question.Options__c ='programming language||scripting language||foreign language';
        question.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
       
       // controller.currentQuestionId=question.id;
        String testRes = controller.formatMultipleChoiceQuestion(question);
        system.debug(testRes);
        System.assertEquals('::MC Question::What is Apex?{=programming language~scripting language~foreign language}', testRes);
    }
	@isTest
    static void formatMCMW(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'MCMW Question';
		question.Question_Type__c='Multiple Choice';
        question.Question_Text__c='Apex is a _____ language';
        question.Options__c ='programming||scripting||foreign';
        question.Correct_Answer_s__c = 'programming';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);

        System.assertEquals('::MCMW Question::Apex is a {=programming~scripting~foreign} language', controller.formattedQuestion);
    }
    @isTest
    static void formatMCMA(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'MCMA Question';
		question.Question_Type__c='Multiple Choice - multiple answers';
        question.Question_Text__c='Apex is what type of language?';
        question.Options__c ='programming||scripting||foreign||strongly-typed';
        question.Correct_Answer_s__c = 'programming||strongly-typed';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug('MCMA: '+ controller.formattedQuestion);
        System.assertEquals('::MCMA Question::Apex is what type of language?{~%50%programming~%50%strongly-typed~%-100%programming~%-100%scripting~%-100%foreign~%-100%strongly-typed}', controller.formattedQuestion);
    }
@isTest
    static void formatMCMWMA(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'MCMWMA Question';
		question.Question_Type__c='Multiple Choice - multiple answers';
        question.Question_Text__c='Apex is a _____ language';
        question.Options__c ='programming||scripting||foreign||strongly-typed';
        question.Correct_Answer_s__c = 'programming||strongly-typed';
        question.Answer_Explanation__c = 'explanation';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug('MCMWMA: '+ controller.formattedQuestion);
        System.assertEquals('::MCMWMA Question::Apex is a {~%50%programming~%50%strongly-typed~%-100%programming~%-100%scripting~%-100%foreign~%-100%strongly-typed#explanation} language', controller.formattedQuestion);
    }
    @isTest
    static void formatTF(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'TF Question';
		question.Question_Type__c='True-false';
        question.Question_Text__c='Apex is a programming language';
        //question.Options__c ='';
        question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);

        System.assertEquals('::TF Question::Apex is a programming language{True}', controller.formattedQuestion);
    }
    @isTest
    static void formatTFMW(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'TFMW Question';
		question.Question_Type__c='True-false';
        question.Question_Text__c='Apex is a _____ language';
       // question.Options__c ='programming||scripting||foreign';
        question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
        System.assertEquals('::TFMW Question::Apex is a {True} language', controller.formattedQuestion);
    }
    @isTest
    static void formatEssay(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'Essay Question';
		question.Question_Type__c='Essay';
        question.Question_Text__c='Write an Essay';
        //question.Options__c ='';
        //question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);

        System.assertEquals('::Essay Question::Write an Essay{}', controller.formattedQuestion);
    }
     @isTest
    static void formatMWEssay(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'EssayMW Question';
		question.Question_Type__c='Essay';
        question.Question_Text__c='Write an _____ Essay';
        //question.Options__c ='';
        //question.Correct_Answer_s__c = 'True';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
        System.assertEquals('::EssayMW Question::Write an {} Essay', controller.formattedQuestion);
    }
	@isTest
    static void formatShortAnswer(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'SA Question';
		question.Question_Type__c='Short answer';
        question.Question_Text__c='Apex is:';
        //question.Options__c ='';
        question.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
        System.assertEquals('::SA Question::Apex is:{=programming language}', controller.formattedQuestion);
    } 
    	@isTest
    static void formatMWShortAnswer(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'SAMW Question';
		question.Question_Type__c='Short answer';
        question.Question_Text__c='Apex is _____:';
        //question.Options__c ='';
        question.Correct_Answer_s__c = 'programming language';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
        System.assertEquals('::SAMW Question::Apex is {=programming language}:', controller.formattedQuestion);
    }
   	@isTest
    static void formatMatching(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'Matching Question';
		question.Question_Type__c='Matching';
        question.Question_Text__c='Match the Following:';
        question.Options__c ='AJAX||HTML||CSS';
        question.Correct_Answer_s__c = 'Asynchronous Javascript and XML||Markup Language||Cascading Stylesheet';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
       
        System.assertEquals('::Matching Question::Match the Following:{=AJAX->Asynchronous Javascript and XML=HTML->Markup Language=CSS->Cascading Stylesheet}', controller.formattedQuestion);
    } 
     @isTest
    static void formatMWMatching(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'MatchingMW Question';
		question.Question_Type__c='Matching';
        question.Question_Text__c='Match the Following _____ :';
        question.Options__c ='AJAX||HTML||CSS';
        question.Correct_Answer_s__c = 'Asynchronous Javascript and XML||Markup Language||Cascading Stylesheet';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
       
        System.assertEquals('::MatchingMW Question::Match the Following {=AJAX->Asynchronous Javascript and XML=HTML->Markup Language=CSS->Cascading Stylesheet} :', controller.formattedQuestion);
    } 
      @isTest
    static void formatNumerical(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'Numerical Question';
		question.Question_Type__c='Numerical';
        question.Question_Text__c='SOQL Queries:';
       // question.Options__c ='';
        question.Correct_Answer_s__c = '200';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = FALSE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
       
        System.assertEquals('::Numerical Question::SOQL Queries:{#200:0}', controller.formattedQuestion);
    } 
     @isTest
    static void formatMWNumerical(){
	    Exam_Question__c question = new Exam_Question__c();
        question.Name = 'NumericalMW Question';
		question.Question_Type__c='Numerical';
        question.Question_Text__c='SOQL Queries_____:';
       // question.Options__c ='';
        question.Correct_Answer_s__c = '200';
        //question.Answer_Explanation__c = '';
        question.Missing_Word__c = TRUE;
        insert question;        
		
		ApexPages.StandardController sc = new ApexPages.StandardController(question);
        PageReference pageRef = new pageReference('/apex/ExportQuestions/'+ question.id);
       	pageRef.getParameters().put('id', question.id);
        Test.setCurrentPage(pageRef);
        ExportQuestionsController controller = new ExportQuestionsController (sc);
		system.debug(controller.formattedQuestion);
       
        System.assertEquals('::NumericalMW Question::SOQL Queries{#200:0}:', controller.formattedQuestion);
    } 

}
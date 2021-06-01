////////////////////////////////////////////////////
//
// Name: Trial of the Titans - GIFT Import
//					 			Apex Controller Test
// Author: David J. Sellinger
// Created: 2021-05-28
// Updated: 2021-05-31
// Description: Test for the Server-side controller for 
//              for parsing questions listed in GIFT 
//              format and inserting them into the 
//              database.
//
////////////////////////////////////////////////////

@IsTest
public class AuraGIFTImportControllerTest {

    @IsTest
    static void TestNegative() {
        AuraGIFTImportController.HandleInit();
        List<ExamQuestion> questionList = new List<ExamQuestion>();
        questionList.add(new ExamQuestion('','Empty Title Test',''));
        questionList.add(new ExamQuestion('','Empty Title Test',''));
        AuraGIFTImportController.ImportFile(questionList, '\n');
    }

    @IsTest
    static void TestPositive() {
        // Test Init
        Titan__c newTitan = new Titan__c(Name='Apex', Technology__c='Salesforce');
        insert newTitan;
        Id titan = newTitan.Id;
        Map<String,List<Map<String,String>>> initialValueMap = AuraGIFTImportController.HandleInit();
        System.debug(initialValueMap);

        // Test data
        List<ExamQuestion> questionList = new List<ExamQuestion>();
        ExamQuestion eq1 = new ExamQuestion();
        eq1.qTitle = 'Empty Title Test';
        questionList.add(eq1);
        questionList.add(new ExamQuestion('','Empty Title TestEmpty Title TestEmpty Title TestEmpty Title TestEmpty Title TestEmpty',''));
        questionList.add(new ExamQuestion('E1','Essay Test',''));
        questionList.add(new ExamQuestion('E2','Essay _____ Test',''));
        questionList.add(new ExamQuestion('N1','Numerical Test','#1'));
        questionList.add(new ExamQuestion('N2','Numerical _____ Test','#2#1'));
        questionList.add(new ExamQuestion('N3','Numerical Test','#=1#1=2'));
        questionList.add(new ExamQuestion('N4','Numerical _____ Test','#=1=2#2'));
        questionList.add(new ExamQuestion('Ma1','Matching Test','=Matching -> Test1=Matching -> Test#1'));
        questionList.add(new ExamQuestion('Ma2','Matching _____ Test','=Matching -> Test#1=Matching -> Test2'));
        questionList.add(new ExamQuestion('Ma3','Matching _____ Test','=Matching -> Test1=Matching -> Test2'));
        questionList.add(new ExamQuestion('MCMA1','MCMA Test','~%33%Mult#Yoo ~%33%Choice#With ~%33%Multi ~Answer'));
        questionList.add(new ExamQuestion('MCMA2','MCMA _____ Test',' ~%33%Mult ~%33%Choice#With ~%33%Multi ~Answer'));
        questionList.add(new ExamQuestion('MCMA3','MCMA _____ Test',' ~%33%Mult ~%33%Choice ~%33%Multi ~Answer'));
        questionList.add(new ExamQuestion('MC1','MC Test','=Mult#Test ~Choice ~Question#Test'));
        questionList.add(new ExamQuestion('MC2','MC _____ Test','~Choice#Test =Mult#Test ~Question'));
        questionList.add(new ExamQuestion('MC3','MC _____ Test','~Choice =Mult ~Question'));
        questionList.add(new ExamQuestion('MC4','MC _____ Test','=Mult ~Choice ~Question'));
        questionList.add(new ExamQuestion('SA1','SA Test','=Short =Answer#Test'));
        questionList.add(new ExamQuestion('SA2','SA _____ Test','=Short#Answer =Test'));
        questionList.add(new ExamQuestion('SA3','SA _____ Test','=Short =Test'));
        questionList.add(new ExamQuestion('SA4','SA Test','Test#One Word'));
        questionList.add(new ExamQuestion('SA5','SA Test','Ts#O'));
        questionList.add(new ExamQuestion('TF1','TF Test','T'));
        questionList.add(new ExamQuestion('TF2','TF Test','F'));
        questionList.add(new ExamQuestion('TF3','TF Test','True'));
        questionList.add(new ExamQuestion('TF4','TF Test','False#Hullo'));
        questionList.add(new ExamQuestion('TF5','TF _____ Test','T'));
        questionList.add(new ExamQuestion('TF6','TF _____ Test','F'));
        questionList.add(new ExamQuestion('TF7','TF _____ Test','True'));
        questionList.add(new ExamQuestion('TF8','TF _____ Test','False'));

        List<Integer> success1 = AuraGIFTImportController.ImportFile(questionList, titan);
        List<Integer> eSuccess1 = new List<Integer>{31,0};
        System.assertEquals(eSuccess1, success1);
        System.debug(eSuccess1);
        System.debug(success1);
        System.debug(eSuccess1 == success1);
        List<Integer> success2 = AuraGIFTImportController.ImportFile(questionList, titan);
        List<Integer> eSuccess2 = new List<Integer>{0,31};
        System.assertEquals(eSuccess2, success2);
        System.debug(eSuccess2);
        System.debug(success2);
        System.debug(eSuccess2 == success2);
    }
}